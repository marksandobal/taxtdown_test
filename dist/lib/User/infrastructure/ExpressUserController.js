"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressUserController = void 0;
const ServiceContainer_1 = require("../../Shared/infrastructure/ServiceContainer");
const UserNotFoundError_1 = require("../../User/domain/UserNotFoundError");
const encryp_1 = require("../../Shared/infrastructure/encryp");
class ExpressUserController {
    async getAllWithAvailableCredits(req, res, next) {
        const { orderDirection } = req.query;
        try {
            const users = await ServiceContainer_1.ServiceContainer.user.getAllWithAvailableCredits.run(orderDirection);
            const formatUsers = users.map(user => user.mapToFormat());
            return res.json(formatUsers).status(200);
        }
        catch (error) {
            next(error);
        }
    }
    async getAll(req, res, next) {
        try {
            const users = await ServiceContainer_1.ServiceContainer.user.getAll.run();
            const usersPrimitive = users.map(user => user.mapToPrimitive());
            return res.json(usersPrimitive).status(200);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        const { id } = req.params;
        try {
            const user = await ServiceContainer_1.ServiceContainer.user.findById.run(Number(id));
            return res.json(user.mapToPrimitive()).status(200);
        }
        catch (error) {
            if (error instanceof UserNotFoundError_1.UserNotFoundError) {
                return res.status(404).json({ message: 'User not found' });
            }
            next(error);
        }
    }
    async create(req, res, next) {
        const { name, lastName, email, password, createdAt, updatedAt } = req.body;
        try {
            const passwordHash = await encryp_1.Encrypt.hash(password);
            const user = await ServiceContainer_1.ServiceContainer.user.create.run(0, name, lastName, email, passwordHash, new Date(createdAt), new Date(updatedAt));
            return res.json(user).status(201);
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        const { id } = req.params;
        const { name, lastName, email, password, createdAt, updatedAt } = req.body;
        try {
            const user = await ServiceContainer_1.ServiceContainer.user.update.run(Number(id), name, lastName, email, password, new Date(createdAt), new Date(updatedAt));
            return res.json(user).status(200);
        }
        catch (error) {
            if (error instanceof UserNotFoundError_1.UserNotFoundError) {
                return res.status(404).json({ message: 'User not found' });
            }
            next(error);
        }
    }
    async delete(req, res, next) {
        const { id } = req.params;
        try {
            await ServiceContainer_1.ServiceContainer.user.delete.run(Number(id));
            return res.status(204).json({ message: 'User deleted' });
        }
        catch (error) {
            if (error instanceof UserNotFoundError_1.UserNotFoundError) {
                return res.status(404).json({ message: 'User not found' });
            }
            next(error);
        }
    }
}
exports.ExpressUserController = ExpressUserController;
