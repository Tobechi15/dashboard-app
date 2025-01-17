import React, { useState, useEffect, useRef } from 'react';
import { ClipboardDocumentIcon, ClipboardDocumentCheckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const CryptoPayment = ({ user }) => {
    const [usdAmount, setUsdAmount] = useState(2);
    const [cryptoAmount, setCryptoAmount] = useState(0);
    const [walletAddress, setWalletAddress] = useState('');
    const [walletAddressIMG, setwalletAddressIMG] = useState('');
    const [transactionStatus, setTransactionStatus] = useState('pending');
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30 * 60);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isTransactionCanceled, setIsTransactionCanceled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isAddressCopied, setIsAddressCopied] = useState(false);
    const [isAmountCopied, setIsAmountCopied] = useState(false); // Track if amount is copied
    const pollingIntervalRef = useRef(null);
    const paymentStartTimeRef = useRef(null);

    // Check for pending transaction on page load
    useEffect(() => {
        const checkPendingTransaction = async () => {
            const email = user?.email;

            try {
                const response = await axios.get(`https://dashboard-app-uzy6.onrender.com:5000/api/check-pending-transaction/${email}`);
                const { walletAddress, walletAddressImg, expectedCryptoAmount, startTime, message } = response.data;

                if (message === 'You have an existing pending transaction.') {
                    // Calculate the remaining time based on the original start time
                    const currentTime = Math.floor(Date.now() / 1000);
                    const timeElapsed = currentTime - startTime;
                    const countdownDuration = 30 * 60;
                    const remainingTime = Math.max(countdownDuration - timeElapsed, 0);

                    setTimeLeft(remainingTime);
                    setWalletAddress(walletAddress);
                    setwalletAddressIMG(walletAddressImg);
                    setCryptoAmount(expectedCryptoAmount);
                    setTransactionStatus('pending');
                    setIsSecondModalOpen(true); // Open the second modal if a pending transaction exists
                }
            } catch (error) {
                console.error('Error checking pending transaction:', error);
                setIsErrorModalOpen(true);
            }
        };

        checkPendingTransaction();
    }, [user]);

    const handleCancelTransaction = async () => {
        try {
            const response = await axios.post('https://dashboard-app-uzy6.onrender.com:5000/api/cancel-transaction', {
                walletAddress,
                userEmail: user?.email,
            });

            if (response.data.status === 'canceled') {
                setTimeLeft(30 * 60);
                setIsTransactionCanceled(true);
                setTransactionStatus('canceled');
                setIsSecondModalOpen(false);
            }
        } catch (error) {
            console.error('Error canceling transaction:', error);
            setErrorMessage('Failed to cancel transaction. Please try again later.');
            setIsErrorModalOpen(true);
        }
    };

    // Countdown timer
    useEffect(() => {
        if (timeLeft <= 0) {
            // Cancel the transaction directly here
            const cancelTransaction = async () => {
                try {
                    const response = await axios.post('https://dashboard-app-uzy6.onrender.com:5000/api/cancel-transaction', {
                        walletAddress,
                        userEmail: user?.email,
                    });

                    if (response.data.status === 'canceled') {
                        setTransactionStatus('canceled');
                        setIsSecondModalOpen(false);
                    }
                } catch (error) {
                    console.error('Error canceling transaction:', error);
                    setIsErrorModalOpen(true);
                }
            };

            cancelTransaction();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, walletAddress, user]);

    // Polling for payment confirmation
    useEffect(() => {
        if (walletAddress && transactionStatus === 'pending' && !isTransactionCanceled) {
            const pollForPayment = async () => {
                try {
                    if (transactionStatus === 'canceled' || transactionStatus === 'timeout') {
                        clearInterval(pollingIntervalRef.current); // Stop polling if transaction is canceled or timed out
                        return;
                    }
    
                    const response = await axios.get(`https://dashboard-app-uzy6.onrender.com:5000/api/check-payment/${walletAddress}/${cryptoAmount}`);
                    if (response.data.status === 'confirmed') {
                        setTransactionStatus('confirmed');
                        clearInterval(pollingIntervalRef.current);
                        setIsSuccessModalOpen(true);
                    }
                } catch (error) {
                    console.error('Error checking payment status:', error);
                }
            };
    
            // Start polling every 5 seconds
            pollingIntervalRef.current = setInterval(pollForPayment, 5000);
    
            // Timer to check if the payment confirmation time has expired
            const currentTime = Math.floor(Date.now() / 1000);
            const paymentStartTime = paymentStartTimeRef.current;
    
            if (paymentStartTime && currentTime - paymentStartTime >= 30 * 60) {
                setTransactionStatus('timeout');
                clearInterval(pollingIntervalRef.current);
                setErrorMessage('Payment confirmation time expired. Please try again.');
                setIsErrorModalOpen(true);
            }
    
            // Clean up the interval when component unmounts or dependencies change
            return () => clearInterval(pollingIntervalRef.current);
        }
    }, [walletAddress, cryptoAmount, transactionStatus, isTransactionCanceled]);
    


    const handlePayment = async () => {
        setIsPaymentProcessing(true);
        paymentStartTimeRef.current = Math.floor(Date.now() / 1000);
        const email = user?.email;

        try {
            // Request payment details from backend
            const response = await axios.post('https://dashboard-app-uzy6.onrender.com:5000/api/payment', { amount: usdAmount, userEmail: email });
            const { walletAddress, walletAddressIMG, expectedCryptoAmount } = response.data;

            // Set values received from backend
            setWalletAddress(walletAddress);
            setwalletAddressIMG(walletAddressIMG)
            setCryptoAmount(expectedCryptoAmount);
            setTransactionStatus('pending');
            setIsSecondModalOpen(true);
        } catch (error) {
            console.error('Error processing payment:', error);
            setErrorMessage('Failed to process payment. Please try again later.');
            setIsErrorModalOpen(true);
        }

        setIsPaymentProcessing(false);
    };


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text).then(() => {
            if (type === 'address') {
                setIsAddressCopied(true);
                setTimeout(() => setIsAddressCopied(false), 2000);
            } else if (type === 'amount') {
                setIsAmountCopied(true);
                setTimeout(() => setIsAmountCopied(false), 2000);
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-center mt-[-106px] mb-[-40px] h-screen">
            {/* First Modal: Input USD amount */}
            {!isSecondModalOpen && !isSuccessModalOpen && !isErrorModalOpen && (
                <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Pay with USDT (TRC20)</h2>
                    <label className="block mb-4">
                        <span className="text-gray-700">Enter USD Amount ($10,000 - $100,000):</span>
                        <input
                            type="number"
                            className="w-full p-2 mt-2 border border-gray-300 rounded"
                            min="1"
                            max="100000"
                            step="500"
                            value={usdAmount}
                            onChange={(e) => setUsdAmount(Number(e.target.value))}
                        />
                    </label>
                    <button
                        className={`mt-6 w-full p-2 text-white ${isPaymentProcessing ? 'bg-gray-500' : 'bg-blue-600'} rounded hover:bg-blue-700`}
                        onClick={handlePayment}
                        disabled={isPaymentProcessing}
                    >
                        {isPaymentProcessing ? 'Processing...' : 'Pay Now'}
                    </button>
                </div>
            )}

            {/* Second Modal: Wallet address, amount, and timer */}
            {isSecondModalOpen && !isSuccessModalOpen && !isErrorModalOpen && (
                <div className="w-full max-w-md p-8 bg-white mt-32 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Send Your Payment</h2>
                    <p className="text-lg text-gray-600 mb-2 text-center">Please send <strong>{cryptoAmount} USDT(TRC20)</strong> to the address below:</p>
                    <p className='text-md text-red-500 mb-6 text-center'>ensure You send usdt <strong>TRC20</strong> token</p>

                    {/* Amount Copy Card */}
                    <div className="flex items-center justify-between mb-4 bg-gray-100 rounded p-3">
                        <span className="font-semibold text-gray-800">{cryptoAmount} USDT</span>
                        <button
                            className="text-gray-500 hover:text-gray-800"
                            onClick={() => handleCopy(cryptoAmount, 'amount')}
                        >
                            {isAmountCopied ? (
                                <ClipboardDocumentCheckIcon className="h-5 w-5" />
                            ) : (
                                <ClipboardDocumentIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    {/* Wallet Address Copy Card */}
                    <div className="flex items-center justify-between mb-6 bg-gray-100 rounded p-3">
                        <span className="text-gray-800 break-all">{walletAddress}</span>
                        <button
                            className="text-gray-500 hover:text-gray-800"
                            onClick={() => handleCopy(walletAddress, 'address')}
                        >
                            {isAddressCopied ? (
                                <ClipboardDocumentCheckIcon className="h-5 w-5" />
                            ) : (
                                <ClipboardDocumentIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    <div className="flex items-center justify-center mb-6">
                        <img className='h-48 w-48' src={`/${walletAddressIMG}`} alt='qr code'/>
                    </div>

                    <div className="text-center text-gray-500 mb-6">
                        Time left to complete payment: <span className="font-semibold">{formatTime(timeLeft)}</span>
                    </div>

                    <div className="flex justify-between">
                        <button
                            className="w-6/12 mr-2 p-2 text-white bg-red-600 rounded hover:bg-red-700"
                            onClick={handleCancelTransaction}
                        >
                            Cancel Transaction
                        </button>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {isSuccessModalOpen && (
                <div className="w-full max-w-md p-6 bg-white rounded shadow-md flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-bold mb-2 text-green-600 text-center">Payment Successful!</h2>
                    <CheckCircleIcon color='green' className='h-40'></CheckCircleIcon>
                    <p className="text-lg text-gray-600 mb-2 text-center"><strong>{cryptoAmount} USDT(TRC20)</strong> Successfully paid</p>
                </div>
            )}

            {/* Error Modal */}
            {isErrorModalOpen && (
                <div className="w-full max-w-md p-6 bg-red-100 rounded shadow-md">
                    <h2 className="text-3xl font-bold mb-6 text-red-600">Error!</h2>
                    <p className="text-red-800">{errorMessage}</p>
                    <button
                        className="mt-4 w-full p-2 text-white bg-red-600 rounded hover:bg-red-700"
                        onClick={() => setIsErrorModalOpen(false)}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default CryptoPayment;
