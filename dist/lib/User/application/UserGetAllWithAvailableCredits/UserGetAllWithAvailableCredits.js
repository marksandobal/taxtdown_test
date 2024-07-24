"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetAllWithAvailableCredits = void 0;
class UserGetAllWithAvailableCredits {
    constructor(repository) {
        this.repository = repository;
    }
    async run(orderDirection = 'ASC') {
        return this.repository.getAllWithAvailableCredits(orderDirection);
    }
}
exports.UserGetAllWithAvailableCredits = UserGetAllWithAvailableCredits;
