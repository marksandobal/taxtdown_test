import { BaseRepository } from "../../Shared/infrastructure/BaseRepository";
import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { UserEmail } from "../domain/UserEmail";
import { UserId } from "../domain/UserId";

type PosgresUser = {
  id: number;
  name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export class PostgresUserRepository extends BaseRepository implements UserRepository {
  async getAll(): Promise<User[]> {
    const query = `SELECT id, name, last_name, email, created_at, updated_at FROM users`;
    const result = await this.client.query<PosgresUser>(query);
    return result.rows.map((row) => this.mapToUser(row));
  }

  async findById(id: number): Promise<User | null> {
    const query = `SELECT id, name, last_name, email, created_at, updated_at FROM users WHERE id = $1`;
    const result = await this.client.query<PosgresUser>(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0]
    return this.mapToUser(row);
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = `SELECT id, name, last_name, email, password, created_at, updated_at FROM users WHERE email = $1`;
    const result = await this.client.query<PosgresUser>(query, [email]);
    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0]
    return this.mapToUser(row);
  }

  async create(user: User): Promise<void> {
    const query = `INSERT INTO users (name, last_name, email, password) VALUES ($1, $2, $3, $4)`;
    const values = [user.name, user.lastName, user.email, user.password]
    await this.client.query(query, values);
  }

  async update(user: User): Promise<void> {
    const query = `UPDATE users SET name = $1, last_name = $2, email = $3, password = $4, updated_at = $5 WHERE id = $6`;
    const values = [user.name, user.lastName, user.email, user.password, new Date(), user.id];
    console.log(values);
    await this.client.query(query, values);
  }

  async delete(id: number): Promise<void> {
    const query = `DELETE FROM users WHERE id = $1`;
    await this.client.query(query, [id]);
  }

  private mapToUser(user: PosgresUser): User {
    return new User(
      new UserId(user.id),
      user.name,
      user.last_name,
      new UserEmail(user.email),
      user.password,
      user.created_at,
      user.updated_at
    );
  }
}
