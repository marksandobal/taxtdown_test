import { AvailableCredit } from "../../domain/AvailableCredit";
import { AvailableCreditRepository } from "../../domain/AvailableCreditRepository";
import { RequestedCreditError } from "../../domain/RequestedCreditError";

export class AvailableCreditCreate {
  constructor(private repository: AvailableCreditRepository) {}

  async run(
    amount: number,
    creditId: number,
    userId: number,

  ): Promise<void> {
    const availableCredit = new AvailableCredit(
      0,
      amount,
      creditId,
      userId,
      new Date(),
      new Date()
    );

    const availableCreditExist = await this.repository.findByAvailableByCreditIdAndUserId(
      availableCredit.creditId,
      availableCredit.userId
    );

    if (availableCreditExist) {
      throw new RequestedCreditError("This credit is already available");
    }

    await this.repository.create(availableCredit);
  }
}
