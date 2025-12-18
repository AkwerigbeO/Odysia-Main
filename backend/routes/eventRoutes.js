const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Registration = require('../models/Registration');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST /api/events/:id/register
// @desc    Register user for an event
// @access  Private
router.post('/:id/register', protect, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if already registered
        const existingRegistration = await Registration.findOne({
            event: req.params.id,
            user: req.user.id,
        });

        if (existingRegistration) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        // Check capacity
        const registrationCount = await Registration.countDocuments({ event: req.params.id });
        if (registrationCount >= event.capacity) {
            return res.status(400).json({ message: 'Event is at full capacity' });
        }

        const registration = await Registration.create({
            event: req.params.id,
            user: req.user.id,
        });

        res.status(201).json(registration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/events/:id
// @desc    Get event by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/events
// @desc    Create new event
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const { title, description, date, location, capacity } = req.body;
        const event = await Event.create({
            user: req.user.id,
            title,
            description,
            date,
            location,
            capacity,
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route   PUT /api/events/:id
// @desc    Update event
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            event.title = req.body.title || event.title;
            event.description = req.body.description || event.description;
            event.date = req.body.date || event.date;
            event.location = req.body.location || event.location;
            event.capacity = req.body.capacity || event.capacity;

            const updatedEvent = await event.save();
            res.json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route   DELETE /api/events/:id
// @desc    Delete event
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            await event.deleteOne();
            res.json({ message: 'Event removed' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
