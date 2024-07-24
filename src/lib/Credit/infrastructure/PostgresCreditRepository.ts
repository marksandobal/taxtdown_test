import { BaseRepository } from "../../Shared/infrastructure/BaseRepository";
import { CreditRepository } from "../domain/CreditRepository";
import { Credit } from "../domain/Credit";

type PostgresCredit = {
  id: number;
  amount: number;
  name: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
};


export class PostgresCreditRepository extends BaseRepository implements CreditRepository {
  async getAll(): Promise<Credit[]> {
    const query = `SELECT * FROM credits`;
    const result = await this.client.query<PostgresCredit>(query);
    return result.rows.map(this.mapToDomain);
  }

  async findById(id: number): Promise<Credit | null> {
    const query = `SELECT * FROM credits WHERE id = $1`;
    const result = await this.client.query<PostgresCredit>(query, [id]);
    return this.mapToDomain(result.rows[0]);
  }

  async create(credit: Credit): Promise<void> {
    const query = `INSERT INTO credits (amount, name, active) VALUES ($1, $2, $3)`;
    await this.client.query(query, [credit.amount, credit.name, credit.active]);
  }

  private mapToDomain(credit: PostgresCredit): Credit {
    return new Credit(
      credit.id,
      credit.name,
      credit.amount,
      credit.active,
      credit.created_at,
      credit.updated_at);
  }
}
