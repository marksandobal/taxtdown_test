"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmail = void 0;
class UserEmail {
    constructor(value) {
        this.value = value;
        this.ensureIsValid();
    }
    ensureIsValid() {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!this.value) {
            throw new Error('Invalid email');
        }
        if (!regex.test(this.value)) {
            throw new Error('Invalid email');
        }
    }
}
exports.UserEmail = UserEmail;
