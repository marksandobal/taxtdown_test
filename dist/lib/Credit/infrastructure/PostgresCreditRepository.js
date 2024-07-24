"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresCreditRepository = void 0;
const BaseRepository_1 = require("../../Shared/infrastructure/BaseRepository");
const Credit_1 = require("../domain/Credit");
class PostgresCreditRepository extends BaseRepository_1.BaseRepository {
    async getAll() {
        const query = `SELECT * FROM credits`;
        const result = await this.client.query(query);
        return result.rows.map(this.mapToDomain);
    }
    async findById(id) {
        const query = `SELECT * FROM credits WHERE id = $1`;
        const result = await this.client.query(query, [id]);
        return this.mapToDomain(result.rows[0]);
    }
    async create(credit) {
        const query = `INSERT INTO credits (amount, name, active) VALUES ($1, $2, $3)`;
        await this.client.query(query, [credit.amount, credit.name, credit.active]);
    }
    mapToDomain(credit) {
        return new Credit_1.Credit(credit.id, credit.name, credit.amount, credit.active, credit.created_at, credit.updated_at);
    }
}
exports.PostgresCreditRepository = PostgresCreditRepository;
