"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_mocks_http_1 = require("node-mocks-http");
const ts_jest_1 = require("@golevelup/ts-jest");
const UserEmail_1 = require("../../../lib/User/domain/UserEmail");
const UserId_1 = require("../../../lib/User/domain/UserId");
const User_1 = require("../../../lib/User/domain/User");
const UserWithAvailableCredit_1 = require("../../../lib/User/domain/UserWithAvailableCredit");
describe('ExpressUserController', () => {
    let expressUserControllerMock;
    const user = new User_1.User(new UserId_1.UserId(1), 'John', 'Doe', new UserEmail_1.UserEmail('john.doe@example.com'), 'password', new Date(), new Date());
    beforeEach(() => {
        expressUserControllerMock = (0, ts_jest_1.createMock)();
    });
    describe('getAllWithAvailableCredits', () => {
        it('should return array of users', async () => {
            const userWithAvailableCredit = new UserWithAvailableCredit_1.UserWithAvailableCredit(new User_1.User(new UserId_1.UserId(1), 'John', 'Doe', new UserEmail_1.UserEmail('john.doe@example.com'), null, null, null), 1, 1, 'Credito de verano', 1000, 100);
            const req = (0, node_mocks_http_1.createRequest)({
                method: 'GET'
            });
            const res = (0, node_mocks_http_1.createResponse)();
            const next = jest.fn();
            const responseObject = {
                id: userWithAvailableCredit.user.id,
                name: userWithAvailableCredit.user.name,
                lastName: userWithAvailableCredit.user.lastName,
                email: userWithAvailableCredit.user.email,
                credit: {
                    id: userWithAvailableCredit.creditId,
                    credit: userWithAvailableCredit.credit,
                    amount: userWithAvailableCredit.amount,
                    preAprovedAmount: userWithAvailableCredit.preAprovedAmount,
                    availableCreditId: userWithAvailableCredit.availableCreditId
                }
            };
            expressUserControllerMock.getAllWithAvailableCredits.mockResolvedValue(res.json([responseObject]));
            await expressUserControllerMock.getAllWithAvailableCredits(req, res, next);
            const response = res._getJSONData();
            expect(res.statusCode).toBe(200);
            expect(response[0].id).toEqual(userWithAvailableCredit.user.id);
            expect(response[0].name).toEqual(userWithAvailableCredit.user.name);
            expect(response[0].lastName).toEqual(userWithAvailableCredit.user.lastName);
            expect(response[0].email).toEqual(userWithAvailableCredit.user.email);
            expect(response[0].credit.id).toEqual(userWithAvailableCredit.creditId);
            expect(response[0].credit.amount).toEqual(userWithAvailableCredit.amount);
            expect(response[0].credit.preAprovedAmount).toEqual(userWithAvailableCredit.preAprovedAmount);
        });
    });
    describe('getAll', () => {
        it('should return array of users', async () => {
            const req = (0, node_mocks_http_1.createRequest)({
                method: 'GET'
            });
            const res = (0, node_mocks_http_1.createResponse)();
            const next = jest.fn();
            expressUserControllerMock.getAll.mockResolvedValue(res.json([user]));
            await expressUserControllerMock.getAll(req, res, next);
            const response = res._getJSONData();
            expect(res.statusCode).toBe(200);
            expect(response[0].id).toEqual(user.id);
            expect(response[0].name).toEqual(user.name);
            expect(response[0].lastName).toEqual(user.lastName);
            expect(response[0].email).toEqual(user.email);
            expect(response[0].createdAt).toEqual(user.createdAt.toISOString());
            expect(response[0].updatedAt).toEqual(user.updatedAt.toISOString());
        });
        it('should return empty array', async () => {
            const req = (0, node_mocks_http_1.createRequest)({
                method: 'GET'
            });
            const res = (0, node_mocks_http_1.createResponse)();
            const next = jest.fn();
            expressUserControllerMock.getAll.mockResolvedValue(res.json([]));
            await expressUserControllerMock.getAll(req, res, next);
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual([]);
        });
    });
    describe('getById', () => {
        it('should return user', async () => {
            const req = (0, node_mocks_http_1.createRequest)({
                method: 'GET',
                params: {
                    id: user.id.toString()
                }
            });
            const res = (0, node_mocks_http_1.createResponse)();
            const next = jest.fn();
            expressUserControllerMock.getById.mockResolvedValue(res.json(user));
            await expressUserControllerMock.getById(req, res, next);
            const response = res._getJSONData();
            expect(res.statusCode).toBe(200);
            expect(response.id).toEqual(user.id);
            expect(response.name).toEqual(user.name);
            expect(response.lastName).toEqual(user.lastName);
            expect(response.email).toEqual(user.email);
            expect(response.createdAt).toEqual(user.createdAt.toISOString());
            expect(response.updatedAt).toEqual(user.updatedAt.toISOString());
        });
        it('should return status code 404', async () => {
            const req = (0, node_mocks_http_1.createRequest)({
                method: 'GET',
                params: {
                    id: user.id.toString()
                }
            });
            const res = (0, node_mocks_http_1.createResponse)();
            const next = jest.fn();
            expressUserControllerMock.getById.mockResolvedValue(res.status(404).json({ message: 'User not found' }));
            await expressUserControllerMock.getById(req, res, next);
            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ message: 'User not found' });
        });
    });
    describe('create', () => {
        it('should return status code 201', async () => {
            const req = (0, node_mocks_http_1.createRequest)({
                method: 'POST',
                params: {
                    id: 1,
                    name: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'password'
                }
            });
            const res = (0, node_mocks_http_1.createResponse)();
            const next = jest.fn();
            expressUserControllerMock.create.mockResolvedValue(res.status(201).json());
            await expressUserControllerMock.create(req, res, next);
            expect(res.statusCode).toBe(201);
        });
        it('should return status code 500', async () => {
            const req = (0, node_mocks_http_1.createRequest)({
                method: 'POST',
                params: {
                    id: 1,
                    name: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'password'
                }
            });
            const res = (0, node_mocks_http_1.createResponse)();
            const next = jest.fn();
            expressUserControllerMock.create.mockResolvedValue(res.status(500).json('Internal server error'));
            await expressUserControllerMock.create(req, res, next);
            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual('Internal server error');
        });
    });
    describe('update', () => {
        it('should return status code 200', async () => {
            const req = (0, node_mocks_http_1.createRequest)({
                method: 'PUT',
                params: {
                    id: 1,
                    name: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'password'
                }
            });
            const res = (0, node_mocks_http_1.createResponse)();
            const next = jest.fn();
            expressUserControllerMock.update.mockResolvedValue(res.status(200).json());
            await expressUserControllerMock.update(req, res, next);
            expect(res.statusCode).toBe(200);
        });
        it('should return status code 404', async () => {
            const req = (0, node_mocks_http_1.createRequest)({
                method: 'PUT',
                params: {
                    id: 1,
                    name: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'password'
                }
            });
            const res = (0, node_mocks_http_1.createResponse)();
            const next = jest.fn();
            expressUserControllerMock.update.mockResolvedValue(res.status(404).json({ message: 'User not found' }));
            await expressUserControllerMock.update(req, res, next);
            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ message: 'User not found' });
        });
        it('should return status code 500', async () => {
            const req = (0, node_mocks_http_1.createRequest)({
                method: 'POST',
                params: {
                    id: 1,
                }
            });
            const res = (0, node_mocks_http_1.createResponse)();
            const next = jest.fn();
            expressUserControllerMock.update.mockResolvedValue(res.status(500).json('Internal server error'));
            await expressUserControllerMock.update(req, res, next);
            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual('Internal server error');
        });
    });
    describe('delete', () => {
        it('should return status code 204', async () => {
            const req = (0, node_mocks_http_1.createRequest)({
                method: 'DELETE',
                params: {
                    id: user.id.toString(),
                }
            });
            const res = (0, node_mocks_http_1.createResponse)();
            const next = jest.fn();
            expressUserControllerMock.delete.mockResolvedValue(res.status(204).json());
            await expressUserControllerMock.delete(req, res, next);
            expect(res.statusCode).toBe(204);
        });
        it('should return status code 404', async () => {
            const req = (0, node_mocks_http_1.createRequest)({
                method: 'DELETE',
                params: {
                    id: user.id.toString(),
                }
            });
            const res = (0, node_mocks_http_1.createResponse)();
            const next = jest.fn();
            expressUserControllerMock.delete.mockResolvedValue(res.status(404).json({ message: 'User not found' }));
            await expressUserControllerMock.delete(req, res, next);
            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ message: 'User not found' });
        });
        it('should return status code 500', async () => {
            const req = (0, node_mocks_http_1.createRequest)({
                method: 'DELETE',
                params: {
                    id: user.id.toString(),
                }
            });
            const res = (0, node_mocks_http_1.createResponse)();
            const next = jest.fn();
            expressUserControllerMock.delete.mockResolvedValue(res.status(500).json('Internal server error'));
            await expressUserControllerMock.delete(req, res, next);
            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual('Internal server error');
        });
    });
});
