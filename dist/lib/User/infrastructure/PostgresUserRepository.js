"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresUserRepository = void 0;
const BaseRepository_1 = require("../../Shared/infrastructure/BaseRepository");
const User_1 = require("../domain/User");
const UserEmail_1 = require("../domain/UserEmail");
const UserId_1 = require("../domain/UserId");
const UserWithAvailableCredit_1 = require("../domain/UserWithAvailableCredit");
class PostgresUserRepository extends BaseRepository_1.BaseRepository {
    async getAllWithAvailableCredits(orderDirection = 'ASC') {
        const query = `
    SELECT u.id, u.name, u.last_name, u.email,c.id as credit_id, ac.id as available_credit_id,
    c.name as credit, c.amount, ac.amount as pre_authorized_amount
    FROM users as u
    INNER JOIN available_credits as ac ON ac.user_id = u.id
    INNER JOIN credits as c ON c.id = ac.credit_id
    ORDER BY ac.amount ${orderDirection}`;
        const result = await this.client.query(query);
        return result.rows.map((row) => new UserWithAvailableCredit_1.UserWithAvailableCredit(new User_1.User(new UserId_1.UserId(row.id), row.name, row.last_name, new UserEmail_1.UserEmail(row.email), null, null, null), row.credit_id, row.available_credit_id, row.credit, row.amount, row.pre_authorized_amount));
    }
    async getAll() {
        const query = `SELECT id, name, last_name, email, created_at, updated_at FROM users`;
        const result = await this.client.query(query);
        return result.rows.map((row) => this.mapToUser(row));
    }
    async findById(id) {
        const query = `SELECT id, name, last_name, email, created_at, updated_at FROM users WHERE id = $1`;
        const result = await this.client.query(query, [id]);
        if (result.rows.length === 0) {
            return null;
        }
        const row = result.rows[0];
        return this.mapToUser(row);
    }
    async findByEmail(email) {
        const query = `SELECT id, name, last_name, email, password, created_at, updated_at FROM users WHERE email = $1`;
        const result = await this.client.query(query, [email]);
        if (result.rows.length === 0) {
            return null;
        }
        const row = result.rows[0];
        return this.mapToUser(row);
    }
    async create(user) {
        const query = `INSERT INTO users (name, last_name, email, password) VALUES ($1, $2, $3, $4)`;
        const values = [user.name, user.lastName, user.email, user.password];
        await this.client.query(query, values);
    }
    async update(user) {
        const query = `UPDATE users SET name = $1, last_name = $2, email = $3, password = $4, updated_at = $5 WHERE id = $6`;
        const values = [user.name, user.lastName, user.email, user.password, new Date(), user.id];
        await this.client.query(query, values);
    }
    async delete(id) {
        const query = `DELETE FROM users WHERE id = $1`;
        await this.client.query(query, [id]);
    }
    mapToUser(user) {
        return new User_1.User(new UserId_1.UserId(user.id), user.name, user.last_name, new UserEmail_1.UserEmail(user.email), user.password, user.created_at, user.updated_at);
    }
}
exports.PostgresUserRepository = PostgresUserRepository;
