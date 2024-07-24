import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { UserGetAll } from "../../../lib/User/application/UserGetAll/UserGetAll";
import { User } from '../../../lib/User/domain/User';
import { UserId } from '../../../lib/User/domain/UserId';
import { UserEmail } from '../../../lib/User/domain/UserEmail';
import { PostgresUserRepository } from '../../../lib/User/infrastructure/PostgresUserRepository';

describe('UserGetAll', () => {
  let repositoryMock: DeepMocked<PostgresUserRepository>;
  let userCase: UserGetAll;
  const userObject = new User(
    new UserId(1),
    'John',
    'Doe',
    new UserEmail('john.doe@example.com'),
    'password',
    new Date(),
    new Date()
  );

  beforeEach(async () => {
    repositoryMock = createMock<PostgresUserRepository>();
    userCase = new UserGetAll(repositoryMock);
  });

  it('should be instance of User', async () => {
    repositoryMock.getAll.mockResolvedValue(
      Promise.resolve([userObject])
    );

    const userCaseResult = await userCase.run();

    expect(userCaseResult).toBeDefined();
    expect(userCaseResult).toBeInstanceOf(Array);
    expect(userCaseResult[0]).toBeInstanceOf(User);
  });

  it('return an array of users', async () => {
    repositoryMock.getAll.mockResolvedValue(
      Promise.resolve([userObject])
    );

    const userCaseResult = await userCase.run();

    expect(userCaseResult).toHaveLength(1);
    expect(userCaseResult[0].id).toBe(1);
    expect(userCaseResult[0].name).toBe('John');
    expect(userCaseResult[0].lastName).toBe('Doe');
    expect(userCaseResult[0].email).toBe('john.doe@example.com');
  });
});
