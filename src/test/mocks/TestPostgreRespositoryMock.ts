import { User } from "../../lib/User/domain/User";
import { UserId } from "../../lib/User/domain/UserId";
import { UserEmail } from "../../lib/User/domain/UserEmail";
import { UserRepository } from "src/lib/User/domain/UserRepository";

export class TestPostgresRepositoryMock implements UserRepository {
  constructor(private readonly users: User[] = []) {
    console.log("====================");
    console.log("Deberia pasar por aqui");
  }

  async create(user: User): Promise<void> {
  }
  async getAll(): Promise<User[]> {
    return Promise.resolve([this.userInstance({})]);
  }

  async findById(id: number): Promise<User | null> {
    return this.userInstance({ id });
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.userInstance({ email });
  }
  async update(user: User): Promise<void> {
    return Promise.resolve();
  }
  async delete(id: number): Promise<void> {
    return;
  }

  private userInstance(params: { id?: number, email?: string }): User {
    return new User(
      new UserId(params.id ?? 1),
      'John',
      'Doe',
      new UserEmail(params.email ?? 'john.doe@example.com'),
      'password',
      new Date(),
      new Date()
    );
  }
}
