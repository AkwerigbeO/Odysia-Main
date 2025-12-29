const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe,
    forgotPassword,
    resetPassword,
    completeExpertSignup
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const {
    validateRequest,
    registerSchema,
    loginSchema,
} = require('../middleware/validationMiddleware');

router.post('/register', validateRequest(registerSchema), registerUser);
router.post('/login', validateRequest(loginSchema), loginUser);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.post('/expert-setup', completeExpertSignup);

module.exports = router;
