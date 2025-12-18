const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    date: {
        type: Date,
        required: [true, 'Please add a date'],
    },
    location: {
        type: String,
        required: [true, 'Please add a location'],
    },
    capacity: {
        type: Number,
        required: [true, 'Please add capacity'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Event', eventSchema);
