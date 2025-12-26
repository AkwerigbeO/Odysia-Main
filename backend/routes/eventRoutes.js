const express = require('express');
const router = express.Router();
const {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
} = require('../controllers/eventController');
const { protect, admin } = require('../middleware/authMiddleware');
const {
    validateRequest,
    eventSchema,
} = require('../middleware/validationMiddleware');

router
    .route('/')
    .get(getEvents)
    .post(protect, admin, validateRequest(eventSchema), createEvent);

router
    .route('/:id')
    .get(getEventById)
    .put(protect, admin, validateRequest(eventSchema), updateEvent)
    .delete(protect, admin, deleteEvent);

router.post('/:id/register', protect, registerForEvent);

module.exports = router;
