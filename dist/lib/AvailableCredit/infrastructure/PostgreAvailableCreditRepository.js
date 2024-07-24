"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreAvailableCreditRepository = void 0;
const BaseRepository_1 = require("../../Shared/infrastructure/BaseRepository");
const AvailableCredit_1 = require("../domain/AvailableCredit");
class PostgreAvailableCreditRepository extends BaseRepository_1.BaseRepository {
    async getAll() {
        const query = `SELECT * FROM available_credits`;
        const result = await this.client.query(query);
        return result.rows.map((row) => this.mapToDomain(row));
    }
    async findByAvailableByCreditIdAndUserId(creditId, userId) {
        const query = `SELECT * FROM available_credits WHERE credit_id = $1 AND user_id = $2`;
        const result = await this.client.query(query, [creditId, userId]);
        return result.rows.map((row) => this.mapToDomain(row))[0] || null;
    }
    async create(availableCredit) {
        const query = `INSERT INTO available_credits (amount, credit_id, user_id) VALUES ($1, $2, $3)`;
        await this.client.query(query, [availableCredit.amount, availableCredit.creditId, availableCredit.userId]);
    }
    mapToDomain(row) {
        return new AvailableCredit_1.AvailableCredit(row.id, row.amount, row.credit_id, row.user_id, row.created_at, row.updated_at);
    }
}
exports.PostgreAvailableCreditRepository = PostgreAvailableCreditRepository;
