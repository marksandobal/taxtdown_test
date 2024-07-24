import { BaseRepository } from "../../Shared/infrastructure/BaseRepository";
import { AvailableCreditRepository } from "../domain/AvailableCreditRepository";
import { AvailableCredit } from "../domain/AvailableCredit";

type PosgresAvailableCredit = {
  id: number;
  amount: number;
  credit_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export class PostgreAvailableCreditRepository extends BaseRepository implements AvailableCreditRepository {
  async getAll(): Promise<AvailableCredit[]> {
    const query = `SELECT * FROM available_credits`;

    const result = await this.client.query<PosgresAvailableCredit>(query);
    return result.rows.map((row) => this.mapToDomain(row));
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
