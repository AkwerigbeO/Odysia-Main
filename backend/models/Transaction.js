const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'NGN' // or USD
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    payer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    type: {
        type: String,
        enum: ['milestone_payment', 'refund', 'bonus', 'adjustment'],
        required: true
    },
    description: String,
    reference: String // Payment gateway reference
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);
