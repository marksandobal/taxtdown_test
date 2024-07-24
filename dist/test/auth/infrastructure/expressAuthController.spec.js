"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_jest_1 = require("@golevelup/ts-jest");
const node_mocks_http_1 = require("node-mocks-http");
describe('ExpressAuthController', () => {
    let expressAuthControllerMock;
    beforeEach(() => {
        expressAuthControllerMock = (0, ts_jest_1.createMock)();
    });
    describe('login', () => {
        it('should return token', async () => {
            const req = (0, node_mocks_http_1.createRequest)({
                method: 'POST',
                body: {
                    email: 'john.doe@example.com',
                    password: 'password',
                },
            });
            const next = jest.fn();
            const res = (0, node_mocks_http_1.createResponse)();
            expressAuthControllerMock.login.mockResolvedValue(res.status(200).json({ token: 'token' }));
            await expressAuthControllerMock.login(req, res, next);
            const response = res._getJSONData();
            expect(res.statusCode).toBe(200);
            expect(response).toEqual({ token: 'token' });
        });
        it('return invalid credentials', async () => {
            const req = (0, node_mocks_http_1.createRequest)({
                method: 'POST',
                body: {
                    email: 'john.doe@example.com',
                    password: 'password',
                },
            });
            const next = jest.fn();
            const res = (0, node_mocks_http_1.createResponse)();
            expressAuthControllerMock.login.mockResolvedValue(res.status(401).json({ message: 'Invalid email or password' }));
            await expressAuthControllerMock.login(req, res, next);
            const response = res._getJSONData();
            expect(res.statusCode).toBe(401);
            expect(response).toEqual({ message: 'Invalid email or password' });
        });
        it('return user not found', async () => {
            const req = (0, node_mocks_http_1.createRequest)({
                method: 'POST',
                body: {
                    email: 'john.doe@example.com',
                    password: 'password',
                },
            });
            const next = jest.fn();
            const res = (0, node_mocks_http_1.createResponse)();
            expressAuthControllerMock.login.mockResolvedValue(res.status(404).json({ message: 'User not found' }));
            await expressAuthControllerMock.login(req, res, next);
            const response = res._getJSONData();
            expect(res.statusCode).toBe(404);
            expect(response).toEqual({ message: 'User not found' });
        });
    });
});
