"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDelete = void 0;
const UserNotFoundError_1 = require("../../domain/UserNotFoundError");
class UserDelete {
    constructor(repository) {
        this.repository = repository;
    }
    async run(id) {
        const user = await this.repository.findById(id);
        if (!user)
            throw new UserNotFoundError_1.UserNotFoundError();
        await this.repository.delete(id);
    }
}
exports.UserDelete = UserDelete;
