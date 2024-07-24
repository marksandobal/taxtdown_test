import { AvailableCreditRepository } from "../../domain/AvailableCreditRepository";
import { AvailableCreditWithUserAndCredit } from "../../domain/availableCreditWithUser";

export class AvailableCreditGetAll {
  constructor(private repository: AvailableCreditRepository) {}

  async run(): Promise<AvailableCreditWithUserAndCredit[]> {
    return this.repository.getAll();
  }
}
