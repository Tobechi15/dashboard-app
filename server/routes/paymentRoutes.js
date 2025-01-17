const express = require('express');
const router = express.Router();
const axios = require('axios');
const rateLimit = require('axios-rate-limit');
const Transaction = require('../models/transactin');

// API rate limiter: 1 request per second
const tronApiKey = process.env.TRONSCAN_API_KEY;
const tronApiBaseUrl = 'https://apilist.tronscanapi.com/api/transfer/trc20';

// Limit to 1 request per second
const http = rateLimit(axios.create(), { maxRPS: 1 });

// Keep track of API call counts
let dailyApiCallCount = 0;
const MAX_DAILY_CALLS = 100000;

const walletAddresses = [
    { address: "TXuBCeXhiCjJbZdH8wHqW3Fw9YyBoX1cPu", qr: "qr-TXuBCeXhiCjJbZdH8wHqW3Fw9YyBoX1cPu.png" },// Replace with actual wallet address
    // { address: "0x2345bcde6789fgha0123jklm4567nopq8901rstu", qr: "https://example.com/qr2.png" },
    // { address: "0x3456cdef7890ghab1234klmn5678opqr9012stuv", qr: "https://example.com/qr3.png" },
    // { address: "0x4567defg8901habc2345lmno6789pqrs0123uvwx", qr: "https://example.com/qr4.png" }
];

// Function to randomly select a wallet address
function getRandomWalletAddress() {
    const randomIndex = Math.floor(Math.random() * walletAddresses.length);
    return walletAddresses[randomIndex];
}

// Reset the API call count every 24 hours
setInterval(() => {
    dailyApiCallCount = 0;
}, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

// Function to check if we are within the API daily call limit
const canMakeApiCall = () => {
    return dailyApiCallCount < MAX_DAILY_CALLS;
};

// Route to check for pending transactions for a specific user
router.get('/check-pending-transaction/:userEmail', async (req, res) => {
    const { userEmail } = req.params;

    try {
        const existingTransaction = await Transaction.findOne({ userEmail, status: 'pending' });

        if (existingTransaction) {
            return res.json({
                walletAddress: existingTransaction.walletAddress,
                walletAddressImg: existingTransaction.walletAddressImg,
                expectedCryptoAmount: existingTransaction.expectedCryptoAmount,
                startTime: existingTransaction.startTime,
                message: 'You have an existing pending transaction.',
            });
        } else {
            return res.json({ message: 'No pending transaction found.' });
        }
    } catch (error) {
        console.error('Error checking pending transaction:', error);
        return res.status(500).json({ error: 'Failed to check pending transaction.' });
    }
});

// Route to cancel a pending transaction
router.post('/cancel-transaction', async (req, res) => {
    const { walletAddress, userEmail } = req.body; // Expect wallet address and user email for identification

    try {
        const transaction = await Transaction.findOne({ walletAddress, userEmail, status: 'pending' });

        if (!transaction) {
            return res.status(404).json({ error: 'No pending transaction found for this wallet.' });
        }

        // Update transaction status to "canceled"
        transaction.status = 'canceled';
        await transaction.save();

        return res.json({ status: 'canceled', message: 'Transaction has been canceled.' });
    } catch (error) {
        console.error('Error canceling transaction:', error);
        res.status(500).json({ error: 'Failed to cancel transaction' });
    }
});

// Route for initiating a payment
router.post('/payment', async (req, res) => {
    const { amount, userEmail } = req.body;
    // Replace with actual wallet address logic

    try {
        // Fetch the current USDT conversion rate from the CoinGecko API
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd');
        const conversionRate = response.data.tether.usd;

        // Calculate the expected crypto amount in USDT
        const expectedCryptoAmount = (amount / conversionRate).toFixed(4); // To 6 decimal places for USDT precision

        const walletAddress = getRandomWalletAddress().address;
        const walletAddressIMG = getRandomWalletAddress().qr;

        // Get the current timestamp for the start time
        const startTime = Math.floor(Date.now() / 1000);

        // Create a new transaction in MongoDB with both USD and crypto amount
        const transaction = new Transaction({
            walletAddress: walletAddress,
            walletAddressImg: walletAddressIMG,
            amount: amount, // Store the USD amount
            expectedCryptoAmount: expectedCryptoAmount, // Store the equivalent crypto amount
            userEmail: userEmail,
            status: 'pending',
            startTime: startTime
        });

        await transaction.save();

        // Respond with the wallet address and expected crypto amount
        return res.json({
            walletAddress: walletAddress,
            walletAddressIMG: walletAddressIMG,
            expectedCryptoAmount: expectedCryptoAmount, // Send the calculated crypto amount
        });
    } catch (error) {
        console.error('Error creating transaction:', error);
        return res.status(500).json({ error: 'Failed to create transaction' });
    }
});

// Route for checking the status of the payment
router.get('/check-payment/:walletAddress/:cryptoAmount', async (req, res) => {
    const { walletAddress, cryptoAmount } = req.params;
    console.log(walletAddress, cryptoAmount);

    // Check if we can make an API call
    if (!canMakeApiCall()) {
        return res.status(429).json({ error: 'API call limit exceeded for today.' });
    }

    try {
        // Increment the API call counter
        dailyApiCallCount += 1;

        // Fetch pending transaction from your database
        const pendingTransaction = await Transaction.findOne({ walletAddress, expectedCryptoAmount: cryptoAmount, status: 'pending' });
        console.log(pendingTransaction);

        if (!pendingTransaction) {
            return res.status(404).json({ error: 'No pending transaction found for this wallet.' });
        }

        const currentTime = Date.now();
        const transactionCreationTime = new Date(pendingTransaction.createdAt).getTime();
        const timeElapsed = (currentTime - transactionCreationTime) / 1000; // Convert to seconds

        // If more than 30 minutes (1800 seconds) have passed, update the transaction status to 'canceled'
        if (timeElapsed > 1800) {
            pendingTransaction.status = 'canceled';
            await pendingTransaction.save();
            return res.status(410).json({ status: 'canceled', message: 'Transaction has been canceled due to expiration.' });
        }

        // Define token ID (e.g., for USDT or another TRC20 token)
        const tokenId = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // Replace with actual token ID as needed

        // Call TRONSCAN API to fetch TRC20 transactions for the wallet address
        const response = await http.get(`${tronApiBaseUrl}?address=${walletAddress}&trc20Id=${tokenId}&direction=0&reverse=true`, {
            headers: {
                'TRON-PRO-API-KEY': tronApiKey
            }
        });

        const transactions = response.data.data;

        // Log each transaction's amount in USDT (or equivalent TRC20 token)
        transactions.forEach(tx => {
            const amountInUSDT = tx.amount ? parseFloat(tx.amount) / Math.pow(10, tx.decimals) : 0; // Adjust decimals
            console.log(`Transaction amount in USDT: ${amountInUSDT}`);
        });

        // Filter transactions that match the wallet address and have the correct token ID, amount, and timestamp
        const usdtTransactions = transactions.filter(tx =>
            tx.contract_ret === 'SUCCESS' &&
            tx.to === walletAddress &&
            tx.id === tokenId &&
            parseFloat(tx.amount) >= parseFloat(cryptoAmount) * Math.pow(10, tx.decimals) && // Check amount in smallest unit
            new Date(tx.block_timestamp).getTime() > transactionCreationTime
        );

        if (usdtTransactions.length > 0) {
            // Transaction found, store it in MongoDB and mark it as confirmed
            pendingTransaction.txHash = usdtTransactions[0].hash;
            pendingTransaction.status = 'confirmed';
            await pendingTransaction.save();

            return res.json({ status: 'confirmed', txHash: usdtTransactions[0].hash });
        } else {
            return res.json({ status: 'pending' });
        }
    } catch (error) {
        console.error('Error checking payment:', error);
        res.status(500).json({ error: 'Error checking payment' });
    }
});
// Adjust path to your Transaction model

// Route for fetching user portfolio data
router.get('/portfolio/:userEmail', async (req, res) => {
    try {
        // Get the signed-in user from the request (assuming user authentication middleware is in place)
        const { userEmail } = req.params; // Use appropriate middleware to populate `req.user`

        if (!userEmail) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        // Fetch all confirmed transactions related to the user
        const confirmedTransactions = await Transaction.find({ userEmail: userEmail, status: 'confirmed' });

        // Calculate the total balance
        const totalBalance = confirmedTransactions.reduce((total, tx) => {
            const amount = parseFloat(tx.expectedCryptoAmount || 0); // Adjust the field name for amount
            return total + amount;
        }, 0);

        // Respond with transaction details and total balance
        return res.json({
            totalBalance,
            transactions: confirmedTransactions,
        });
    } catch (error) {
        console.error('Error fetching portfolio data:', error);
        res.status(500).json({ error: 'Error fetching portfolio data' });
    }
});

module.exports = router;
