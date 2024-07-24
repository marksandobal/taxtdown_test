import { AvailableCreditRepository } from "../../domain/AvailableCreditRepository";
import { AvailableCredit } from "../../domain/AvailableCredit";

export class AvailableCreditGetAll {
  constructor(private repository: AvailableCreditRepository) {}

  async run(): Promise<AvailableCredit[]> {
    return this.repository.getAll();
  }
}
