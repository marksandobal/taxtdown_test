"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditFindById = void 0;
const CreditNotFoundError_1 = require("../../domain/CreditNotFoundError");
class CreditFindById {
    constructor(creditRepository) {
        this.creditRepository = creditRepository;
    }
    async run(id) {
        const credit = await this.creditRepository.findById(id);
        if (!credit)
            throw new CreditNotFoundError_1.CreditNotFoundError();
        return credit;
    }
}
exports.CreditFindById = CreditFindById;
