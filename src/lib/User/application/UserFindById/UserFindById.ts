import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { UserNotFoundError } from "../../domain/UserNotFoundError";

export class UserFindById {
  constructor(private repository: UserRepository) {}

  async run(id: number): Promise<User> {
    const user = await this.repository.findById(id);
    if (!user) throw new UserNotFoundError();
  
    return user;
  }
}
