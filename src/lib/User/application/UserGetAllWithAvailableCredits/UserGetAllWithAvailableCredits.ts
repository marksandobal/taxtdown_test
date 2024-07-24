import { UserRepository } from "../../domain/UserRepository";
import { UserWithAvailableCredit } from "../../domain/UserWithAvailableCredit";

export class UserGetAllWithAvailableCredits {
  constructor(private repository: UserRepository) {}

  async run(orderDirection: string = 'ASC'): Promise<UserWithAvailableCredit[]> {
    return this.repository.getAllWithAvailableCredits(orderDirection);
  }
}
