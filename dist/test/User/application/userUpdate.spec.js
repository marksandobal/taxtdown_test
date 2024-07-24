"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_jest_1 = require("@golevelup/ts-jest");
const UserUpdate_1 = require("../../../lib/User/application/UserUpdate/UserUpdate");
const User_1 = require("../../../lib/User/domain/User");
const UserId_1 = require("../../../lib/User/domain/UserId");
const UserEmail_1 = require("../../../lib/User/domain/UserEmail");
const UserNotFoundError_1 = require("../../../lib/User/domain/UserNotFoundError");
describe('UserUpdate', () => {
    let repositoryMock;
    let userCase;
    const user = new User_1.User(new UserId_1.UserId(1), 'John', 'Doe', new UserEmail_1.UserEmail('john.doe@example.com'), 'password', new Date(), new Date());
    beforeEach(() => {
        repositoryMock = (0, ts_jest_1.createMock)();
        jest.spyOn(repositoryMock, 'update').mockImplementation(() => Promise.resolve());
        userCase = new UserUpdate_1.UserUpdate(repositoryMock);
    });
    it('should update a user', async () => {
        await userCase.run(user.id, user.name, user.lastName, user.email, user.password, user.createdAt, user.updatedAt);
        expect(repositoryMock.update).toHaveBeenCalledWith(user);
    });
    it('error if email is invalid value', async () => {
        await expect(userCase.run(user.id, user.name, user.lastName, 'user.email', user.password, user.createdAt, user.updatedAt)).rejects.toThrow(Error);
    });
    it('error if user not found', async () => {
        repositoryMock.findById.mockResolvedValue(null);
        await expect(userCase.run(user.id, user.name, user.lastName, 'john.doe@example.com', user.password, user.createdAt, user.updatedAt)).rejects.toThrow(UserNotFoundError_1.UserNotFoundError);
    });
});
