"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_jest_1 = require("@golevelup/ts-jest");
const AvailableCreditCreate_1 = require("../../../lib/AvailableCredit/application/AvailableCreditCreate/AvailableCreditCreate");
const AvailableCredit_1 = require("../../../lib/AvailableCredit/domain/AvailableCredit");
describe('AvailableCreditCreate', () => {
    let repositoryMock;
    let useCase;
    const availableCredit = new AvailableCredit_1.AvailableCredit(1, 100000, 1, 1, new Date(), new Date());
    beforeEach(() => {
        repositoryMock = (0, ts_jest_1.createMock)();
        jest.spyOn(repositoryMock, 'create').mockResolvedValue();
        useCase = new AvailableCreditCreate_1.AvailableCreditCreate(repositoryMock);
    });
    it('should create a new available credit', async () => {
        repositoryMock.findByAvailableByCreditIdAndUserId.mockResolvedValue(null);
        await useCase.run(availableCredit.amount, availableCredit.creditId, availableCredit.userId);
        expect(repositoryMock.create).toHaveBeenCalled();
    });
    it('should throw an error if the available credit already exists', async () => {
        repositoryMock.findByAvailableByCreditIdAndUserId.mockResolvedValue(availableCredit);
        await expect(useCase.run(availableCredit.amount, availableCredit.creditId, availableCredit.userId)).rejects.toThrow();
    });
});
