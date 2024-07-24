"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCreate = void 0;
const Credit_1 = require("../../domain/Credit");
class CreditCreate {
    constructor(creditRepository) {
        this.creditRepository = creditRepository;
    }
    async run(id, name, amount, active) {
        const credit = new Credit_1.Credit(id, name, amount, active, new Date(), new Date());
        await this.creditRepository.create(credit);
    }
}
exports.CreditCreate = CreditCreate;
