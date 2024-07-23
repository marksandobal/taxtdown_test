import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { UserNotFoundError } from "../../domain/UserNotFoundError";

export class UserFindByEmail {
  constructor(private repository: UserRepository) {}

  async run(email: string): Promise<User | null> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }
}
