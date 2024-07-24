"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credit = void 0;
class Credit {
    constructor(id, name, amount, active, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.active = active;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}
exports.Credit = Credit;
