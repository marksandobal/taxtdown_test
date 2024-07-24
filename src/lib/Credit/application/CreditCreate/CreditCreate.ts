import { Credit } from "../../domain/Credit";
import { CreditRepository } from "../../domain/CreditRepository";

export class CreditCreate {
  constructor(private creditRepository: CreditRepository) {}

  async run(
    id: number,
    name: string,
    amount: number,
    active: boolean
  ): Promise<void> {
    const credit = new Credit(id, name, amount, active, new Date(), new Date())
    await this.creditRepository.create(credit)
  }
}
