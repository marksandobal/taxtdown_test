import { PostgresUserRepository } from "../../../lib/User/infrastructure/PostgresUserRepository";
import { User } from "../../../lib/User/domain/User";
import { UserId } from "../../../lib/User/domain/UserId";
import { UserEmail } from "../../../lib/User/domain/UserEmail";
import { DeepMocked, createMock } from "@golevelup/ts-jest";

describe('PostgresUserRepository', () => {
  let repositoryMock: DeepMocked<PostgresUserRepository>;
  const user = new User(
    new UserId(1),
    'name',
    'lastname',
    new UserEmail('test@test.com'),
    'test',
    new Date(),
    new Date(),
  );

  beforeEach(() => {
    repositoryMock = createMock<PostgresUserRepository>();
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
