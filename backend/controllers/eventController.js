const Event = require('../models/Event');
const Registration = require('../models/Registration');

// @desc    Register user for an event
// @route   POST /api/events/:id/register
// @access  Private
const registerForEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            res.status(404);
            throw new Error('Event not found');
        }

        // Check if already registered
        const existingRegistration = await Registration.findOne({
            event: req.params.id,
            user: req.user.id,
        });

        if (existingRegistration) {
            res.status(400);
            throw new Error('Already registered for this event');
        }

        // Check capacity
        const registrationCount = await Registration.countDocuments({
            event: req.params.id,
        });
        if (registrationCount >= event.capacity) {
            res.status(400);
            throw new Error('Event is at full capacity');
        }

        const registration = await Registration.create({
            event: req.params.id,
            user: req.user.id,
        });

        res.status(201).json(registration);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res, next) => {
    try {
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;

        const total = await Event.countDocuments();
        const events = await Event.find().skip(startIndex).limit(limit);

        // Pagination result
        const pagination = {};

        if (startIndex + limit < total) {
            pagination.next = {
                page: page + 1,
                limit,
            };
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit,
            };
        }

        res.json({
            success: true,
            count: events.length,
            pagination,
            data: events,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            res.json(event);
        } else {
            res.status(404);
            throw new Error('Event not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res, next) => {
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
        next(error);
    }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res, next) => {
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
            res.status(404);
            throw new Error('Event not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            await event.deleteOne();
            res.json({ message: 'Event removed' });
        } else {
            res.status(404);
            throw new Error('Event not found');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerForEvent,
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
};
