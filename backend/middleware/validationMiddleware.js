const Joi = require('joi');

const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
    }
    next();
};

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .pattern(/[A-Z]/, 'uppercase letter')
        .pattern(/[a-z]/, 'lowercase letter')
        .pattern(/[0-9]/, 'number')
        .pattern(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'special character')
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.pattern.name': 'Password must contain at least one {#name}'
        }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({ 'any.only': 'Passwords do not match' }),
    phone: Joi.string().required(),
    clientType: Joi.string().valid('individual', 'business', 'startup').required(),
    companyName: Joi.string().allow('', null),
    country: Joi.string().required(),
    communicationMethod: Joi.string().valid('email', 'phone', 'both').required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const eventSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date().required(),
    location: Joi.string().required(),
    capacity: Joi.number().integer().min(1).required(),
});

module.exports = {
    validateRequest,
    registerSchema,
    loginSchema,
    eventSchema,
};
