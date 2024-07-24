import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { User } from "../../../lib/User/domain/User";
import { UserId } from "../../../lib/User/domain/UserId";
import { UserEmail } from "../../../lib/User/domain/UserEmail";
import { UserCreate } from "../../../lib/User/application/UserCreate/UserCreate";
import { PostgresUserRepository } from "../../../lib/User/infrastructure/PostgresUserRepository";

describe('UserCreate', () => {
  let repositoryMock: DeepMocked<PostgresUserRepository>;
  let userCase: UserCreate;
  const user = new User(
    new UserId(1),
    'John',
    'Doe',
    new UserEmail('john.doe@example.com'),
    'password',
    new Date(),
    new Date()
  )

  beforeEach(() => {
    repositoryMock = createMock<PostgresUserRepository>();
    jest.spyOn(repositoryMock, 'create').mockImplementation(() => Promise.resolve());
    userCase = new UserCreate(repositoryMock);
  });

  it('should create a valid user', async () => {
    await userCase.run(
      user.id,
      user.name,
      user.lastName,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt);

    expect(repositoryMock.create).toHaveBeenCalled();
  });

  it('error if email is invalid value', async () => {
    await expect(userCase.run(
      user.id,
      user.name,
      user.lastName,
      'user.email',
      user.password,
      user.createdAt,
      user.updatedAt
    )).rejects.toThrow(Error);
  });
});
