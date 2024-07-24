"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressAvailableCreditController = void 0;
const ServiceContainer_1 = require("../../Shared/infrastructure/ServiceContainer");
const RequestedCreditError_1 = require("../domain/RequestedCreditError");
class ExpressAvailableCreditController {
    async getAll(req, res, next) {
        try {
            const availableCredits = await ServiceContainer_1.ServiceContainer.availableCredit.getAll.run();
            res.json(availableCredits).status(200);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        const { amount, creditId, userId } = req.body;
        try {
            await ServiceContainer_1.ServiceContainer.availableCredit.create.run(amount, creditId, userId);
            res.json({ message: "Available credit created" }).status(201);
        }
        catch (error) {
            if (error instanceof RequestedCreditError_1.RequestedCreditError) {
                res.status(400).json({ message: error.message });
            }
            else {
                next(error);
            }
        }
    }
}
exports.ExpressAvailableCreditController = ExpressAvailableCreditController;
