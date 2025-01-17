const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    walletAddress: {
        type: String,
        required: true
    },
    walletAddressImg: {
        type: String,
        required: true
    },
    amount: { // USD amount
        type: Number,
        required: true
    },
    expectedCryptoAmount: { // USDT equivalent
        type: Number,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'canceled'],
        default: 'pending'
    },
    startTime: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);
