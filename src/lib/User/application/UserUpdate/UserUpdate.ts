import { User } from "../../domain/User";
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserRepository } from "../../domain/UserRepository";
import { UserNotFoundError } from "../../domain/UserNotFoundError";

export class UserUpdate {
  constructor(private repository: UserRepository) {}

  async run(
    id: number,
    name: string,
    lastName: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
  ): Promise<void> {
    const user = new User(
      new UserId(id),
      name,
      lastName,
      new UserEmail(email),
      password,
      createdAt,
      updatedAt);
    const userExist = await this.repository.findById(user.id);
    if (!userExist) {
      throw new UserNotFoundError("User not found");
    }
    return this.repository.update(user);
  }
}
