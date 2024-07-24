"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ExpressAuthController_1 = require("./ExpressAuthController");
const ValidateRequest_1 = require("../../Shared/infrastructure/ValidateRequest");
const authRouter = (0, express_1.Router)();
const controller = new ExpressAuthController_1.ExpressAuthController();
authRouter.post('/login', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email is required'),
    (0, express_validator_1.body)('password').isString().withMessage('Password is required'),
], ValidateRequest_1.default, controller.login);
exports.default = authRouter;
