"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ExpressAvailableCreditController_1 = require("./ExpressAvailableCreditController");
const ValidateRequest_1 = require("../../Shared/infrastructure/ValidateRequest");
const PassportUse_1 = require("../../auth/infrastructure/PassportUse");
const controller = new ExpressAvailableCreditController_1.ExpressAvailableCreditController();
const router = (0, express_1.Router)();
router.get("/available-credits", PassportUse_1.default.authenticate("jwt", { session: false }), controller.getAll);
router.post("/available-credits", PassportUse_1.default.authenticate("jwt", { session: false }), [
    (0, express_validator_1.body)("amount").isNumeric().notEmpty(),
    (0, express_validator_1.body)("creditId").isNumeric().notEmpty(),
    (0, express_validator_1.body)("userId").isNumeric().notEmpty()
], ValidateRequest_1.default, controller.create);
exports.default = router;
