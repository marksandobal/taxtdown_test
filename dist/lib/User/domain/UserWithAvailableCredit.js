"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWithAvailableCredit = void 0;
class UserWithAvailableCredit {
    constructor(user, creditId, availableCreditId, credit, amount, preAprovedAmount) {
        this.user = user;
        this.creditId = creditId;
        this.availableCreditId = availableCreditId;
        this.credit = credit;
        this.amount = amount;
        this.preAprovedAmount = preAprovedAmount;
    }
    mapToFormat() {
        return {
            id: this.user.id,
            name: this.user.name,
            lastName: this.user.lastName,
            email: this.user.email,
            credit: {
                id: this.creditId,
                credit: this.credit,
                amount: this.amount,
                preAprovedAmount: this.preAprovedAmount,
                availableCreditId: this.availableCreditId,
            }
        };
    }
}
exports.UserWithAvailableCredit = UserWithAvailableCredit;
