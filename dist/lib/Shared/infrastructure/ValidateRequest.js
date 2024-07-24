"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(err => {
                const error = err;
                return { message: error.msg, field: error.path };
            }) });
    }
    next();
};
exports.default = validateRequest;
