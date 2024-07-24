"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableCreditGetAll = void 0;
class AvailableCreditGetAll {
    constructor(repository) {
        this.repository = repository;
    }
    async run() {
        return this.repository.getAll();
    }
}
exports.AvailableCreditGetAll = AvailableCreditGetAll;
