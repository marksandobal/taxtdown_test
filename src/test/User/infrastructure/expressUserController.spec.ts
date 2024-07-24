import { createRequest, createResponse } from 'node-mocks-http';
import { ExpressUserController } from '../../../lib/User/infrastructure/ExpressUserController';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { UserEmail } from '../../../lib/User/domain/UserEmail';
import { UserId } from '../../../lib/User/domain/UserId';
import { User } from '../../../lib/User/domain/User';

describe('ExpressUserController', () => {
  let expressUserControllerMock: DeepMocked<ExpressUserController>;
  const user = new User(
    new UserId(1),
    'John',
    'Doe',
    new UserEmail('john.doe@example.com'),
    'password',
    new Date(),
    new Date(),
  );

  beforeEach(() => {
    expressUserControllerMock = createMock<ExpressUserController>();
  });

  describe('getAll', () => {
    it('should return array of users', async () => {
      const req = createRequest({
        method: 'GET'
      });

      const res = createResponse();
      const next = jest.fn();
      expressUserControllerMock.getAll.mockResolvedValue(res.json([user]));

      await expressUserControllerMock.getAll(req, res, next);
      const response = res._getJSONData()

      expect(res.statusCode).toBe(200);
      expect(response[0].id).toEqual(user.id);
      expect(response[0].name).toEqual(user.name);
      expect(response[0].lastName).toEqual(user.lastName);
      expect(response[0].email).toEqual(user.email);
      expect(response[0].createdAt).toEqual(user.createdAt.toISOString());
      expect(response[0].updatedAt).toEqual(user.updatedAt.toISOString());
    });

    it('should return empty array', async () => {
      const req = createRequest({
        method: 'GET'
      });

      const res = createResponse();
      const next = jest.fn();
      expressUserControllerMock.getAll.mockResolvedValue(res.json([]));

      await expressUserControllerMock.getAll(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual([]);
    });
  });

  describe('getById', () => {
    it('should return user', async () => {
      const req = createRequest({
        method: 'GET',
        params: {
          id: user.id.toString()
        }
      });

      const res = createResponse();
      const next = jest.fn();

      expressUserControllerMock.getById.mockResolvedValue(res.json(user));

      await expressUserControllerMock.getById(req, res, next);
      const response = res._getJSONData()

      expect(res.statusCode).toBe(200);
      expect(response.id).toEqual(user.id);
      expect(response.name).toEqual(user.name);
      expect(response.lastName).toEqual(user.lastName);
      expect(response.email).toEqual(user.email);
      expect(response.createdAt).toEqual(user.createdAt.toISOString());
      expect(response.updatedAt).toEqual(user.updatedAt.toISOString());
    });

    it('should return status code 404', async () => {
      const req = createRequest({
        method: 'GET',
        params: {
          id: user.id.toString()
        }
      });

      const res = createResponse();
      const next = jest.fn();
      expressUserControllerMock.getById.mockResolvedValue(res.status(404).json({ message: 'User not found' }));
 
      await expressUserControllerMock.getById(req, res, next);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ message: 'User not found' });
    });
  });

  describe('create', () => {
    it('should return status code 201', async () => {
      const req = createRequest({
        method: 'POST',
        params: {
          id: 1,
          name: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password'
        }
      });
  
      const res = createResponse();
      const next = jest.fn();
      expressUserControllerMock.create.mockResolvedValue(res.status(201).json());
 
      await expressUserControllerMock.create(req, res, next);

      expect(res.statusCode).toBe(201);
    });

    it('should return status code 500', async () => {
      const req = createRequest({
        method: 'POST',
        params: {
          id: 1,
          name: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password'
        }
      });

      const res = createResponse();
      const next = jest.fn();
      expressUserControllerMock.create.mockResolvedValue(res.status(500).json('Internal server error'));
  
      await expressUserControllerMock.create(req, res, next);
  
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual('Internal server error');
    });
  });

  describe('update', () => {
    it('should return status code 200', async () => {
      const req = createRequest({
        method: 'PUT',
        params: {
          id: 1,
          name: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password'
        }
      });

      const res = createResponse();
      const next = jest.fn();
      expressUserControllerMock.update.mockResolvedValue(res.status(200).json());
 
      await expressUserControllerMock.update(req, res, next);

      expect(res.statusCode).toBe(200);
    });

    it('should return status code 404', async () => {
      const req = createRequest({
        method: 'PUT',
        params: {
          id: 1,
          name: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password'
        }
      });

      const res = createResponse();
      const next = jest.fn();
      expressUserControllerMock.update.mockResolvedValue(res.status(404).json({ message: 'User not found' }));
 
      await expressUserControllerMock.update(req, res, next);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ message: 'User not found' });
    });

    it('should return status code 500', async () => {
      const req = createRequest({
        method: 'POST',
        params: {
          id: 1,
        }
      });

      const res = createResponse();
      const next = jest.fn();
      expressUserControllerMock.update.mockResolvedValue(res.status(500).json('Internal server error'));
  
      await expressUserControllerMock.update(req, res, next);
  
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual('Internal server error');
    });
  });

  describe('delete', () => {
    it('should return status code 204', async () => {
      const req = createRequest({
        method: 'DELETE',
        params: {
          id: user.id.toString(),
        }
      });

      const res = createResponse();
      const next = jest.fn();
      expressUserControllerMock.delete.mockResolvedValue(res.status(204).json());
 
      await expressUserControllerMock.delete(req, res, next);

      expect(res.statusCode).toBe(204);
    });

    it('should return status code 404', async () => {
      const req = createRequest({
        method: 'DELETE',
        params: {
          id: user.id.toString(),
        }
      });

      const res = createResponse();
      const next = jest.fn();
      expressUserControllerMock.delete.mockResolvedValue(res.status(404).json({ message: 'User not found' }));
 
      await expressUserControllerMock.delete(req, res, next);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ message: 'User not found' });
    });

    it('should return status code 500', async () => {
      const req = createRequest({
        method: 'DELETE',
        params: {
          id: user.id.toString(),
        }
      });

      const res = createResponse();
      const next = jest.fn();
      expressUserControllerMock.delete.mockResolvedValue(res.status(500).json('Internal server error'));
  
      await expressUserControllerMock.delete(req, res, next);
  
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual('Internal server error');
    });
  });
});
