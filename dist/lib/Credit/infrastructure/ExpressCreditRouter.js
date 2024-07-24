"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const ValidateRequest_1 = require("../../Shared/infrastructure/ValidateRequest");
const ExpressCreditController_1 = require("./ExpressCreditController");
const PassportUse_1 = require("../../auth/infrastructure/PassportUse");
const controller = new ExpressCreditController_1.ExpressCreditController();
const creditRouter = (0, express_1.Router)();
creditRouter.get("/credits", PassportUse_1.default.authenticate("jwt", { session: false }), controller.getAll);
creditRouter.get("/credits/:id", (0, express_validator_1.query)("id").isInt().notEmpty().withMessage("Id must be an integer"), ValidateRequest_1.default, PassportUse_1.default.authenticate("jwt", { session: false }), controller.getById);
creditRouter.post("/credits", [
    (0, express_validator_1.body)("name").isString().notEmpty().withMessage("Name must be a string"),
    (0, express_validator_1.body)("amount").isInt().notEmpty().withMessage("Amount must be an integer"),
    (0, express_validator_1.body)("active").isBoolean().notEmpty().withMessage("Active must be a boolean"),
], ValidateRequest_1.default, PassportUse_1.default.authenticate("jwt", { session: false }), controller.create);
exports.default = creditRouter;
