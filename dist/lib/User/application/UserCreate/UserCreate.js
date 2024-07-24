"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreate = void 0;
const User_1 = require("../../domain/User");
const UserEmail_1 = require("../../domain/UserEmail");
const UserId_1 = require("../../domain/UserId");
class UserCreate {
    constructor(repository) {
        this.repository = repository;
    }
    async run(id = 0, name, lastName, email, password, createdAt, updatedAt) {
        const user = new User_1.User(new UserId_1.UserId(id), name, lastName, new UserEmail_1.UserEmail(email), password, createdAt, updatedAt);
        return this.repository.create(user);
    }
}
exports.UserCreate = UserCreate;
