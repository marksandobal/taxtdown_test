import { User } from "./User";

export class UserWithAvailableCredit {
  user: User;
  creditId: number;
  availableCreditId: number;
  credit: string;
  amount: number;
  preAprovedAmount: number;

  constructor(
    user: User,
    creditId: number,
    availableCreditId: number,
    credit: string,
    amount: number,
    preAprovedAmount: number
  ) {
    this.user = user;
    this.creditId = creditId;
    this.availableCreditId = availableCreditId;
    this.credit = credit;
    this.amount = amount;
    this.preAprovedAmount = preAprovedAmount;
  }

  public mapToFormat() {
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
    }
  }
}
