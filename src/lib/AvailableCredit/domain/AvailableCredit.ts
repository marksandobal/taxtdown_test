export class AvailableCredit {
  id: number;
  amount: number;
  creditId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    amount: number,
    creditId: number,
    userId: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.amount = amount;
    this.creditId = creditId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
