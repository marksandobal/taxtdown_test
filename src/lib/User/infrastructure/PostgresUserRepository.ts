import { BaseRepository } from "../../Shared/infrastructure/BaseRepository";
import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { UserEmail } from "../domain/UserEmail";
import { UserId } from "../domain/UserId";
import { UserWithAvailableCredit } from "../domain/UserWithAvailableCredit";

type PosgresUser = {
  id: number;
  name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  credit_id: number;
  credit: string;
  available_credit_id: number;
  amount: number;
  pre_authorized_amount: number;
}

export class PostgresUserRepository extends BaseRepository implements UserRepository {
  async getAllWithAvailableCredits(orderDirection: string = 'ASC'): Promise<UserWithAvailableCredit[]> {
    const query = `
    SELECT u.id, u.name, u.last_name, u.email,c.id as credit_id, ac.id as available_credit_id,
    c.name as credit, c.amount, ac.amount as pre_authorized_amount
    FROM users as u
    INNER JOIN available_credits as ac ON ac.user_id = u.id
    INNER JOIN credits as c ON c.id = ac.credit_id
    ORDER BY ac.amount ${orderDirection}`;

    const result = await this.client.query<PosgresUser>(query);

    return result.rows.map((row) => new UserWithAvailableCredit(
      new User(
        new UserId(row.id),
        row.name,
        row.last_name,
        new UserEmail(row.email),
        null,
        null,
        null
      ),
      row.credit_id,
      row.available_credit_id,
      row.credit,
      row.amount,
      row.pre_authorized_amount
    ));
  }

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
