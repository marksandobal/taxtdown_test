import { User } from './User';
import { UserWithAvailableCredit } from './UserWithAvailableCredit';

export interface UserRepository {
  getAll(): Promise<User[]>;
  getAllWithAvailableCredits(orderDirection: string): Promise<UserWithAvailableCredit[]>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(id: number): Promise<void>;
}
