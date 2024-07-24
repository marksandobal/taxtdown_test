"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, lastName, email, password, createdAt, updatedAt) {
        this.id = id.value;
        this.name = name;
        this.lastName = lastName;
        this.email = email.value;
        this.password = password || '';
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
    mapToPrimitive() {
        return {
            id: this.id,
            name: this.name,
            lastName: this.lastName,
            email: this.email,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
exports.User = User;
