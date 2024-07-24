"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFindByEmail = void 0;
const UserNotFoundError_1 = require("../../domain/UserNotFoundError");
class UserFindByEmail {
    constructor(repository) {
        this.repository = repository;
    }
    async run(email) {
        const user = await this.repository.findByEmail(email);
        if (!user) {
            throw new UserNotFoundError_1.UserNotFoundError();
        }
        return user;
    }
}
exports.UserFindByEmail = UserFindByEmail;
