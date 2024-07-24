"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../../lib/User/domain/User");
const UserId_1 = require("../../../lib/User/domain/UserId");
const UserEmail_1 = require("../../../lib/User/domain/UserEmail");
describe('User', () => {
    it('should create a user', () => {
        const user = new User_1.User(new UserId_1.UserId(1), 'name', 'lastname', new UserEmail_1.UserEmail('test@test.com'), 'test', new Date(), new Date());
        expect(user).toBeDefined();
    });
    it('should throw an error if invalid email', () => {
        expect(() => new User_1.User(new UserId_1.UserId(1), 'name', 'lastname', new UserEmail_1.UserEmail('testtest.com'), 'test', new Date(), new Date())).toThrow(Error);
    });
});
