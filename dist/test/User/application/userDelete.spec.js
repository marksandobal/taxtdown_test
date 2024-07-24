"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_jest_1 = require("@golevelup/ts-jest");
const UserDelete_1 = require("../../../lib/User/application/UserDelete/UserDelete");
const User_1 = require("../../../lib/User/domain/User");
const UserId_1 = require("../../../lib/User/domain/UserId");
const UserEmail_1 = require("../../../lib/User/domain/UserEmail");
const UserNotFoundError_1 = require("../../../lib/User/domain/UserNotFoundError");
describe('UserDelete', () => {
    let repositoryMock;
    let userCase;
    const user = new User_1.User(new UserId_1.UserId(1), 'John', 'Doe', new UserEmail_1.UserEmail('john.doe@example.com'), 'password', new Date(), new Date());
    beforeEach(() => {
        repositoryMock = (0, ts_jest_1.createMock)();
        jest.spyOn(repositoryMock, 'delete').mockResolvedValue();
        userCase = new UserDelete_1.UserDelete(repositoryMock);
    });
    it('should delete a user', async () => {
        await userCase.run(user.id);
        expect(repositoryMock.delete).toHaveBeenCalledWith(user.id);
    });
    it('error if user is not found', async () => {
        repositoryMock.delete.mockRejectedValue(new UserNotFoundError_1.UserNotFoundError());
        await expect(userCase.run(1)).rejects.toThrow(UserNotFoundError_1.UserNotFoundError);
    });
});
