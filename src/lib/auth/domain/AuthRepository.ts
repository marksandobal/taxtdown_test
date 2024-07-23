import { User } from "../../User/domain/User";

export interface AuthRepository {
  findByEmail(email: string): Promise<User | null>;
}
