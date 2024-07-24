"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetAll = void 0;
class UserGetAll {
    constructor(repository) {
        this.repository = repository;
    }
    async run() {
        return this.repository.getAll();
    }
}
exports.UserGetAll = UserGetAll;
