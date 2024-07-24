"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../../lib/User/domain/User");
const UserId_1 = require("../../../lib/User/domain/UserId");
const UserEmail_1 = require("../../../lib/User/domain/UserEmail");
const ts_jest_1 = require("@golevelup/ts-jest");
describe('PostgresUserRepository', () => {
    let repositoryMock;
    const user = new User_1.User(new UserId_1.UserId(1), 'name', 'lastname', new UserEmail_1.UserEmail('test@test.com'), 'test', new Date(), new Date());
    beforeEach(() => {
        repositoryMock = (0, ts_jest_1.createMock)();
        jest.spyOn(repositoryMock, 'create').mockImplementation(() => Promise.resolve());
    });
    describe('getAll', () => {
        it('return users', async () => {
            repositoryMock.getAll.mockResolvedValue([user]);
            const users = await repositoryMock.getAll();
            expect(users).toEqual([user]);
        });
        it('return empty array', async () => {
            repositoryMock.getAll.mockResolvedValue([]);
            const users = await repositoryMock.getAll();
            expect(users).toEqual([]);
        });
    });
    describe('findById', () => {
        it('return a user', async () => {
            repositoryMock.findById.mockResolvedValue(user);
            const foundUser = await repositoryMock.findById(user.id);
            expect(foundUser).toEqual(user);
        });
        it('return null', async () => {
            repositoryMock.findById.mockResolvedValue(null);
            const foundUser = await repositoryMock.findById(user.id);
            expect(foundUser).toBeNull();
        });
    });
    describe('findByEmail', () => {
        it('return a user', async () => {
            repositoryMock.findByEmail.mockResolvedValue(user);
            const foundUser = await repositoryMock.findByEmail(user.email);
            expect(foundUser).toEqual(user);
        });
        it('return null', async () => {
            repositoryMock.findByEmail.mockResolvedValue(null);
            const foundUser = await repositoryMock.findByEmail(user.email);
            expect(foundUser).toBeNull();
        });
    });
    describe('create', () => {
        it('should call create method', async () => {
            repositoryMock.create(user);
            expect(repositoryMock.create).toHaveBeenCalled();
        });
    });
    describe('update', () => {
        it('should call update method', async () => {
            repositoryMock.update(user);
            expect(repositoryMock.update).toHaveBeenCalled();
        });
    });
    describe('delete', () => {
        it('should call delete method', async () => {
            repositoryMock.delete(user.id);
            expect(repositoryMock.delete).toHaveBeenCalled();
        });
    });
});
