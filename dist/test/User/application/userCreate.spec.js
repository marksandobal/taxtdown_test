"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_jest_1 = require("@golevelup/ts-jest");
const User_1 = require("../../../lib/User/domain/User");
const UserId_1 = require("../../../lib/User/domain/UserId");
const UserEmail_1 = require("../../../lib/User/domain/UserEmail");
const UserCreate_1 = require("../../../lib/User/application/UserCreate/UserCreate");
describe('UserCreate', () => {
    let repositoryMock;
    let userCase;
    const user = new User_1.User(new UserId_1.UserId(1), 'John', 'Doe', new UserEmail_1.UserEmail('john.doe@example.com'), 'password', new Date(), new Date());
    beforeEach(() => {
        repositoryMock = (0, ts_jest_1.createMock)();
        jest.spyOn(repositoryMock, 'create').mockImplementation(() => Promise.resolve());
        userCase = new UserCreate_1.UserCreate(repositoryMock);
    });
    it('should create a valid user', async () => {
        await userCase.run(user.id, user.name, user.lastName, user.email, user.password, user.createdAt, user.updatedAt);
        expect(repositoryMock.create).toHaveBeenCalled();
    });
    it('error if email is invalid value', async () => {
        await expect(userCase.run(user.id, user.name, user.lastName, 'user.email', user.password, user.createdAt, user.updatedAt)).rejects.toThrow(Error);
    });
});
