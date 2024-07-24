"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserEmail_1 = require("../../../lib/User/domain/UserEmail");
describe('UserEmail', () => {
    it('should throw an error if invalid email', () => {
        expect(() => new UserEmail_1.UserEmail('testtest.com')).toThrow(Error);
    });
    it('should throw an error if invalid email', () => {
        expect(() => new UserEmail_1.UserEmail('')).toThrow(Error);
    });
    it('should create a valid email', () => {
        const email = new UserEmail_1.UserEmail('test@test.com');
        expect(email).toBeInstanceOf(UserEmail_1.UserEmail);
    });
});
