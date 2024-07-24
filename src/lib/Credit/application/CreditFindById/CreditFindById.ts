import { Credit } from "../../domain/Credit";
import { CreditRepository } from "../../domain/CreditRepository";
import { CreditNotFoundError } from "../../domain/CreditNotFoundError";

export class CreditFindById {
  constructor(private creditRepository: CreditRepository) {}

  async run(id: number): Promise<Credit> {
    const credit = await this.creditRepository.findById(id)
    if (!credit) throw new CreditNotFoundError()

    return credit
  }
}
