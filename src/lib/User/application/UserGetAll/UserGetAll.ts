import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class UserGetAll {
  constructor(private repository: UserRepository) {
    console.log("====================");
    console.log("Deberia pasar por aqui UserGetAll Class");
    console.log("====================");
  }

  async run(): Promise<User[]> {
    console.log("====================");
    console.log("Deberia pasar por aqui UserGetAll Class");
    console.log("====================");
    return this.repository.getAll();
  }
}
