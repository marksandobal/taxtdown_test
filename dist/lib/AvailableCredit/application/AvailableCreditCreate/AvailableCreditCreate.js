"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableCreditCreate = void 0;
const AvailableCredit_1 = require("../../domain/AvailableCredit");
const RequestedCreditError_1 = require("../../domain/RequestedCreditError");
class AvailableCreditCreate {
    constructor(repository) {
        this.repository = repository;
    }
    async run(amount, creditId, userId) {
        const availableCredit = new AvailableCredit_1.AvailableCredit(0, amount, creditId, userId, new Date(), new Date());
        const availableCreditExist = await this.repository.findByAvailableByCreditIdAndUserId(availableCredit.creditId, availableCredit.userId);
        if (availableCreditExist) {
            throw new RequestedCreditError_1.RequestedCreditError("This credit is already available");
        }
        await this.repository.create(availableCredit);
    }
}
exports.AvailableCreditCreate = AvailableCreditCreate;
