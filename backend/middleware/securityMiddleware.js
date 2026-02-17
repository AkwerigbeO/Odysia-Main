const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');

// Global rate limiter: 500 req / 15 min per IP
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Login limiter: 10 req / 15 min per IP — slows credential brute-force
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many login attempts from this IP, please try again after 15 minutes'
});

// Registration limiter: 5 req / 1 hour per IP — prevents bulk fake accounts
const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: 'Too many registration attempts from this IP, please try again after 1 hour'
});

// Forgot-password limiter: 3 req / 1 hour per IP — prevents email flooding
const forgotPasswordLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: 'Too many password reset requests from this IP, please try again after 1 hour'
});

// Setup security middleware
const setupSecurity = (app) => {
    // Set security headers
    app.use(helmet());

    // Prevent XSS attacks
    app.use(xss());

    // Prevent http param pollution
    app.use(hpp());

    // Sanitize data
    app.use(mongoSanitize());

    // Global rate limiting
    app.use('/api', globalLimiter);

    // CORS
    if (!process.env.CLIENT_URL) {
        console.warn(
            'WARNING: CLIENT_URL is not set. CORS is falling back to http://localhost:3000. ' +
            'This must be set in production.'
        );
    }

    const corsOptions = {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        optionsSuccessStatus: 200,
        credentials: true,
    };
    app.use(cors(corsOptions));
};

module.exports = { setupSecurity, loginLimiter, registerLimiter, forgotPasswordLimiter };
