const { body, validationResult } = require('express-validator');
const registerValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('age').notEmpty().withMessage('Age is required'),
    body('gender').notEmpty().withMessage('Gender is required'),
    body('password').isLength({ min: 5 }).withMessage('Password must be of 5 character lengthy'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }

];

const loginValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('password').isLength({ min: 5 }).withMessage('Password must be of 5 character lengthy'),
    (req, res,next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        next();
    }
];

module.exports = { loginValidator, registerValidator };