import { UserRepository } from "../../domain/UserRepository";
import { UserNotFoundError } from "../../domain/UserNotFoundError";

export class UserDelete {
  constructor(private repository: UserRepository) {}

  async run(id: number): Promise<void> {
    const user = await this.repository.findById(id);
    if (!user) throw new UserNotFoundError();

    await this.repository.delete(id);
  }
}
