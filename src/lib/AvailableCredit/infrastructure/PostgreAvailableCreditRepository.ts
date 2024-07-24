import { BaseRepository } from "../../Shared/infrastructure/BaseRepository";
import { AvailableCreditRepository } from "../domain/AvailableCreditRepository";
import { AvailableCredit } from "../domain/AvailableCredit";
import { AvailableCreditWithUserAndCredit } from "../domain/availableCreditWithUser";
import { User } from "../../User/domain/User";
import { Credit } from "../../Credit/domain/Credit";
import { UserEmail } from "../../User/domain/UserEmail";
import { UserId } from "../../User/domain/UserId";

type PosgresAvailableCredit = {
  id: number;
  amount: number;
  credit_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

type PostgresAvailableCreditWithUserAndCredit = {
  id: number;
  user_id: number;
  name: string;
  last_name: string;
  email: string;
  credit_id: number;
  credit: string;
  amount: number;
  active: boolean;
  pre_aproved_amount: number;
}

export class PostgreAvailableCreditRepository extends BaseRepository implements AvailableCreditRepository {
  async getAll(): Promise<AvailableCreditWithUserAndCredit[]> {
    const query = `
    SELECT ac.id,  u.id as user_id, u.name, u.last_name, u.email, c.id as credit_id,
    c.name as credit, c.amount, c.active, ac.amount as pre_aproved_amount
    FROM available_credits AS ac
    INNER JOIN users AS u ON ac.user_id = u.id
    INNER JOIN credits AS c ON c.id = ac.credit_id
    ORDER BY ac.amount`;

    const result = await this.client.query<PostgresAvailableCreditWithUserAndCredit>(query);
    return result.rows.map((row) => new AvailableCreditWithUserAndCredit(
        row.id,
        new User(new UserId(row.user_id), row.name, row.last_name, new UserEmail(row.email), null, null, null),
        new Credit(row.credit_id, row.credit, row.amount, row.active, null, null),
        row.pre_aproved_amount
      )
    );
  }

  async findByAvailableByCreditIdAndUserId(creditId: number, userId: number): Promise<AvailableCredit | null> {
    const query = `SELECT * FROM available_credits WHERE credit_id = $1 AND user_id = $2`;
    const result = await this.client.query<PosgresAvailableCredit>(query, [creditId, userId]);
    return result.rows.map((row) => this.mapToDomain(row))[0] || null;
  }

  async create(availableCredit: AvailableCredit): Promise<void> {
    const query = `INSERT INTO available_credits (amount, credit_id, user_id) VALUES ($1, $2, $3)`;
    await this.client.query(query, [availableCredit.amount, availableCredit.creditId, availableCredit.userId]);
  }

  private mapToDomain(row: PosgresAvailableCredit): AvailableCredit {
    return new AvailableCredit(
      row.id,
      row.amount,
      row.credit_id,
      row.user_id,
      row.created_at,
      row.updated_at
    );
  }
}
