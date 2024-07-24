"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_jest_1 = require("@golevelup/ts-jest");
const UserGetAll_1 = require("../../../lib/User/application/UserGetAll/UserGetAll");
const User_1 = require("../../../lib/User/domain/User");
const UserId_1 = require("../../../lib/User/domain/UserId");
const UserEmail_1 = require("../../../lib/User/domain/UserEmail");
describe('UserGetAll', () => {
    let repositoryMock;
    let userCase;
    const userObject = new User_1.User(new UserId_1.UserId(1), 'John', 'Doe', new UserEmail_1.UserEmail('john.doe@example.com'), 'password', new Date(), new Date());
    beforeEach(async () => {
        repositoryMock = (0, ts_jest_1.createMock)();
        userCase = new UserGetAll_1.UserGetAll(repositoryMock);
    });
    it('should be instance of User', async () => {
        repositoryMock.getAll.mockResolvedValue(Promise.resolve([userObject]));
        const userCaseResult = await userCase.run();
        expect(userCaseResult).toBeDefined();
        expect(userCaseResult).toBeInstanceOf(Array);
        expect(userCaseResult[0]).toBeInstanceOf(User_1.User);
    });
    it('return an array of users', async () => {
        repositoryMock.getAll.mockResolvedValue(Promise.resolve([userObject]));
        const userCaseResult = await userCase.run();
        expect(userCaseResult).toHaveLength(1);
        expect(userCaseResult[0].id).toBe(1);
        expect(userCaseResult[0].name).toBe('John');
        expect(userCaseResult[0].lastName).toBe('Doe');
        expect(userCaseResult[0].email).toBe('john.doe@example.com');
    });
});
