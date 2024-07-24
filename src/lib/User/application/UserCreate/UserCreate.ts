import { User } from "../../domain/User";
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserRepository } from "../../domain/UserRepository";

export class UserCreate {
  constructor(private repository: UserRepository) {}

  async run(
    id: number = 0,
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
      updatedAt
    );

    return this.repository.create(user);
  }
}
