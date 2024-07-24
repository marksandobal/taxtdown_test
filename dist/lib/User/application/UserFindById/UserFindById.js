"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFindById = void 0;
const UserNotFoundError_1 = require("../../domain/UserNotFoundError");
class UserFindById {
    constructor(repository) {
        this.repository = repository;
    }
    async run(id) {
        const user = await this.repository.findById(id);
        if (!user)
            throw new UserNotFoundError_1.UserNotFoundError();
        return user;
    }
}
exports.UserFindById = UserFindById;
