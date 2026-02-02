const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // limit each IP to 500 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
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

    // Rate limiting
    app.use('/api', limiter);

    // CORS
    const corsOptions = {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        optionsSuccessStatus: 200,
        credentials: true,
    };
    app.use(cors(corsOptions));
};

module.exports = setupSecurity;
