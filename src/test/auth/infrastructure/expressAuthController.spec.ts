import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { ExpressAuthController } from "../../../lib/auth/infrastructure/ExpressAuthController";
import { createRequest, createResponse } from "node-mocks-http";


describe('ExpressAuthController', () => {
  let expressAuthControllerMock: DeepMocked<ExpressAuthController>;

  beforeEach(() => {
    expressAuthControllerMock = createMock<ExpressAuthController>();
  });

  describe('login', () => {
    it('should return token', async () => {
      const req = createRequest({
        method: 'POST',
        body: {
          email: 'john.doe@example.com',
          password: 'password',
        },
      });

      const next = jest.fn();
      const res = createResponse();
      expressAuthControllerMock.login.mockResolvedValue(
        res.status(200).json({ token: 'token' })
      );
  
      await expressAuthControllerMock.login(req, res, next);
      const response =  res._getJSONData();

      expect(res.statusCode).toBe(200);
      expect(response).toEqual({ token: 'token' });
    });

    it('return invalid credentials', async () => {
      const req = createRequest({
        method: 'POST',
        body: {
          email: 'john.doe@example.com',
          password: 'password',
        },
      });

      const next = jest.fn();
      const res = createResponse();
      expressAuthControllerMock.login.mockResolvedValue(
        res.status(401).json({ message: 'Invalid email or password' })
      );

      await expressAuthControllerMock.login(req, res, next);
      const response =  res._getJSONData();
  
      expect(res.statusCode).toBe(401);
      expect(response).toEqual({ message: 'Invalid email or password' });
    });

    it('return user not found', async () => {
      const req = createRequest({
        method: 'POST',
        body: {
          email: 'john.doe@example.com',
          password: 'password',
        },
      });

      const next = jest.fn();
      const res = createResponse();
      expressAuthControllerMock.login.mockResolvedValue(
        res.status(404).json({ message: 'User not found' })
      );

      await expressAuthControllerMock.login(req, res, next);
      const response =  res._getJSONData();
  
      expect(res.statusCode).toBe(404);
      expect(response).toEqual({ message: 'User not found' });
    });
  });
});
