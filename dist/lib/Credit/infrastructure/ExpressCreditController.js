"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressCreditController = void 0;
const ServiceContainer_1 = require("../../Shared/infrastructure/ServiceContainer");
const CreditNotFoundError_1 = require("../domain/CreditNotFoundError");
class ExpressCreditController {
    async getAll(req, res, next) {
        try {
            const credits = await ServiceContainer_1.ServiceContainer.credit.getAll.run();
            return res.json(credits).status(200);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        const { id } = req.params;
        try {
            const credit = await ServiceContainer_1.ServiceContainer.credit.findById.run(Number(id));
            return res.json(credit).status(200);
        }
        catch (error) {
            if (error instanceof CreditNotFoundError_1.CreditNotFoundError) {
                return res.status(404).json({ message: 'Credit not found' });
            }
            next(error);
        }
    }
    async create(req, res, next) {
        const { name, amount, active } = req.body;
        try {
            await ServiceContainer_1.ServiceContainer.credit.create.run(0, name, amount, active);
            return res.json({ message: 'Credit created' }).status(201);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ExpressCreditController = ExpressCreditController;
