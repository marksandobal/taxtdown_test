import { Credit } from "../../domain/Credit";
import { CreditRepository } from "../../domain/CreditRepository";

export class CreditGetAll {
  constructor(private creditRepository: CreditRepository) {}

  async run(): Promise<Credit[]> {
    return this.creditRepository.getAll();
  }
}
