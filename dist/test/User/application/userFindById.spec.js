"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_jest_1 = require("@golevelup/ts-jest");
const UserFindById_1 = require("../../../lib/User/application/UserFindById/UserFindById");
const User_1 = require("../../../lib/User/domain/User");
const UserId_1 = require("../../../lib/User/domain/UserId");
const UserEmail_1 = require("../../../lib/User/domain/UserEmail");
const UserNotFoundError_1 = require("../../../lib/User/domain/UserNotFoundError");
describe('UserFindById', () => {
    let repositoryMock;
    let userCase;
    const user = new User_1.User(new UserId_1.UserId(1), 'John', 'Doe', new UserEmail_1.UserEmail('john.doe@example.com'), 'password', new Date(), new Date());
    beforeEach(() => {
        repositoryMock = (0, ts_jest_1.createMock)();
        userCase = new UserFindById_1.UserFindById(repositoryMock);
    });
    it('should be instance of User', async () => {
        repositoryMock.findById.mockResolvedValue(user);
        const useCaseResult = await userCase.run(user.id);
        expect(useCaseResult).toBeInstanceOf(User_1.User);
    });
    it('should find a user by id', async () => {
        repositoryMock.findById.mockResolvedValue(user);
        const useCaseResult = await userCase.run(user.id);
        expect(useCaseResult).toBe(user);
    });
    it('should throw an error if user is not found', async () => {
        repositoryMock.findById.mockResolvedValue(null);
        await expect(userCase.run(user.id)).rejects.toThrow(UserNotFoundError_1.UserNotFoundError);
    });
});
