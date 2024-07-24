import { AvailableCredit } from "./AvailableCredit";
import { User } from "../../User/domain/User";
import { Credit } from "../../Credit/domain/Credit";

export class AvailableCreditWithUserAndCredit {
  id: number;
  user: User;
  credit: Credit;
  pre_aproved_amount: number;

  constructor(
   id: number,
   user: User,
   credit: Credit,
   pre_aproved_amount: number
  ) {
    this.id = id;
    this.user = user;
    this.credit = credit;
    this.pre_aproved_amount = pre_aproved_amount;
  }
}
