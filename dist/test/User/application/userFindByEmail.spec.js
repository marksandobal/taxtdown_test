"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_jest_1 = require("@golevelup/ts-jest");
const User_1 = require("../../../lib/User/domain/User");
const UserFindByEmail_1 = require("../../../lib/User/application/UserFindByEmail/UserFindByEmail");
const UserId_1 = require("../../../lib/User/domain/UserId");
const UserEmail_1 = require("../../../lib/User/domain/UserEmail");
const UserNotFoundError_1 = require("../../../lib/User/domain/UserNotFoundError");
describe('UserFindByEmail', () => {
    let repositoryMock;
    let userCase;
    const user = new User_1.User(new UserId_1.UserId(1), 'John', 'Doe', new UserEmail_1.UserEmail('john.doe@example.com'), 'password', new Date(), new Date());
    beforeEach(() => {
        repositoryMock = (0, ts_jest_1.createMock)();
        userCase = new UserFindByEmail_1.UserFindByEmail(repositoryMock);
    });
    it('should be instance of User', async () => {
        repositoryMock.findByEmail.mockResolvedValue(user);
        const userCaseResult = await userCase.run('john.doe@example.com');
        expect(userCaseResult).toBeDefined();
        expect(userCaseResult).toBeInstanceOf(User_1.User);
    });
    it('return user', async () => {
        repositoryMock.findByEmail.mockResolvedValue(user);
        const userCaseResult = await userCase.run('john.doe@example.com');
        expect(userCaseResult).toBe(user);
    });
    it('throw UserNotFoundError if user not found', async () => {
        repositoryMock.findByEmail.mockResolvedValue(null);
        await expect(userCase.run('john.doe@example.com')).rejects.toThrow(UserNotFoundError_1.UserNotFoundError);
    });
});
