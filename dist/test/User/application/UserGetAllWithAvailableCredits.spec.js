"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_jest_1 = require("@golevelup/ts-jest");
const UserGetAllWithAvailableCredits_1 = require("../../../lib/User/application/UserGetAllWithAvailableCredits/UserGetAllWithAvailableCredits");
const UserId_1 = require("../../../lib/User/domain/UserId");
const UserEmail_1 = require("../../../lib/User/domain/UserEmail");
const User_1 = require("../../../lib/User/domain/User");
const UserWithAvailableCredit_1 = require("../../../lib/User/domain/UserWithAvailableCredit");
describe('UserGetAllWithAvailableCredits', () => {
    let repositoryMock;
    let useCase;
    const userWithAvailableCredit = new UserWithAvailableCredit_1.UserWithAvailableCredit(new User_1.User(new UserId_1.UserId(1), 'John', 'Doe', new UserEmail_1.UserEmail('john.doe@example.com'), null, null, null), 1, 1, 'Credito de verano', 1000, 100);
    beforeEach(() => {
        repositoryMock = (0, ts_jest_1.createMock)();
        useCase = new UserGetAllWithAvailableCredits_1.UserGetAllWithAvailableCredits(repositoryMock);
    });
    it('return all users with their available credits', async () => {
        repositoryMock.getAllWithAvailableCredits.mockResolvedValue([userWithAvailableCredit]);
        const userCaseResult = await useCase.run();
        expect(userCaseResult).toHaveLength(1);
        expect(userCaseResult).toEqual([userWithAvailableCredit]);
    });
});
