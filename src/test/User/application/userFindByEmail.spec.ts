import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { User } from "../../../lib/User/domain/User";
import { PostgresUserRepository } from "../../../lib/User/infrastructure/PostgresUserRepository";
import { UserFindByEmail } from "../../../lib/User/application/UserFindByEmail/UserFindByEmail";
import { UserId } from "../../../lib/User/domain/UserId";
import { UserEmail } from "../../../lib/User/domain/UserEmail";
import { UserNotFoundError } from "../../../lib/User/domain/UserNotFoundError";

describe('UserFindByEmail', () => {
  let repositoryMock: DeepMocked<PostgresUserRepository>;
  let userCase: UserFindByEmail;
  const user = new User(
    new UserId(1),
    'John',
    'Doe',
    new UserEmail('john.doe@example.com'),
    'password',
    new Date(),
    new Date()
  );

  beforeEach(() => {
    repositoryMock = createMock<PostgresUserRepository>();
    userCase = new UserFindByEmail(repositoryMock);
  });

  it('should be instance of User', async () => {
    repositoryMock.findByEmail.mockResolvedValue(user);

    const userCaseResult = await userCase.run('john.doe@example.com');

    expect(userCaseResult).toBeDefined();	
    expect(userCaseResult).toBeInstanceOf(User);
  });

  it('return user', async () => {
    repositoryMock.findByEmail.mockResolvedValue(user);

    const userCaseResult = await userCase.run('john.doe@example.com');

    expect(userCaseResult).toBe(user);
  });

  it('throw UserNotFoundError if user not found', async () => {
    repositoryMock.findByEmail.mockResolvedValue(null);

    await expect(userCase.run('john.doe@example.com')).rejects.toThrow(UserNotFoundError);
  });
});
