import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

export class BaseRepository {
  client: Pool;

  constructor() {
    this.client = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    });
  }
}
