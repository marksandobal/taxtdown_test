"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditGetAll = void 0;
class CreditGetAll {
    constructor(creditRepository) {
        this.creditRepository = creditRepository;
    }
    async run() {
        return this.creditRepository.getAll();
    }
}
exports.CreditGetAll = CreditGetAll;
