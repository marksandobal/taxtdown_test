"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const pg_1 = require("pg");
const dotenv = require("dotenv");
dotenv.config();
class BaseRepository {
    constructor() {
        this.client = new pg_1.Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
        });
    }
}
exports.BaseRepository = BaseRepository;
