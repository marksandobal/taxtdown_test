"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdate = void 0;
const User_1 = require("../../domain/User");
const UserEmail_1 = require("../../domain/UserEmail");
const UserId_1 = require("../../domain/UserId");
const UserNotFoundError_1 = require("../../domain/UserNotFoundError");
class UserUpdate {
    constructor(repository) {
        this.repository = repository;
    }
    async run(id, name, lastName, email, password, createdAt, updatedAt) {
        const user = new User_1.User(new UserId_1.UserId(id), name, lastName, new UserEmail_1.UserEmail(email), password, createdAt, updatedAt);
        const userExist = await this.repository.findById(user.id);
        if (!userExist)
            throw new UserNotFoundError_1.UserNotFoundError("User not found");
        return this.repository.update(user);
    }
}
exports.UserUpdate = UserUpdate;
