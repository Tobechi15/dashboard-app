const axios = require('axios');

const TRONSCAN_API_KEY = 'b14f23d5-07cb-4492-9b51-eb258800dec4';  // Your API key
const walletAddress = 'TXuBCeXhiCjJbZdH8wHqW3Fw9YyBoX1cPu';  // Provided wallet address
const tokenId = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
const interval = 60000;  // Poll every 60 seconds

async function fetchUSDTTransactions() {
    try {
        const response = await axios.get(`https://apilist.tronscanapi.com/api/transfer/trc20?address=${walletAddress}&trc20Id=${tokenId}&direction=0&reverse=true`, {
            headers: {
                'TRONSCAN-API-KEY': TRONSCAN_API_KEY,  // Add the API key to the headers
            }
        });

        const transactions = response.data.data;

        console.log(response.data);

        // Log each transaction's amount in USDT
        transactions.forEach(tx => {
            const amountInUSDT = tx.amount
                ? parseFloat(tx.amount) / Math.pow(10, tx.decimals)  // Convert from smallest unit based on decimals
                : 0;
            console.log(`Transaction amount in USDT: ${amountInUSDT}`);
        });
        
    } catch (error) {
        console.error('Error fetching USDT transactions:', error);
    }
}

// Set up polling interval
setInterval(fetchUSDTTransactions, interval);

// Start polling immediately
fetchUSDTTransactions();
