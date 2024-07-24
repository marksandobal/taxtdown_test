"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableCredit = void 0;
class AvailableCredit {
    constructor(id, amount, creditId, userId, createdAt, updatedAt) {
        this.id = id;
        this.amount = amount;
        this.creditId = creditId;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.AvailableCredit = AvailableCredit;
