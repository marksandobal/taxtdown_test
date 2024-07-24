"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const ValidateRequest_1 = require("../../Shared/infrastructure/ValidateRequest");
const ExpressUserController_1 = require("./ExpressUserController");
const PassportUse_1 = require("../../auth/infrastructure/PassportUse");
const controller = new ExpressUserController_1.ExpressUserController();
const userRouter = (0, express_1.Router)();
userRouter.get("/users/available-credits", [
    (0, express_validator_1.query)('orderDirection').isIn(['ASC', 'DESC']).optional()
], ValidateRequest_1.default, PassportUse_1.default.authenticate('jwt', { session: false }), controller.getAllWithAvailableCredits);
userRouter.get("/users", PassportUse_1.default.authenticate('jwt', { session: false }), controller.getAll);
userRouter.get("/users/:id", PassportUse_1.default.authenticate('jwt', { session: false }), controller.getById);
userRouter.post("/users", [
    (0, express_validator_1.body)('name').isString().notEmpty(),
    (0, express_validator_1.body)('lastName').isString().notEmpty(),
    (0, express_validator_1.body)('email').isEmail().notEmpty(),
    (0, express_validator_1.body)('password').isString().notEmpty()
], ValidateRequest_1.default, controller.create);
userRouter.put("/users/:id", PassportUse_1.default.authenticate('jwt', { session: false }), controller.update);
userRouter.delete("/users/:id", PassportUse_1.default.authenticate('jwt', { session: false }), controller.delete);
exports.default = userRouter;
