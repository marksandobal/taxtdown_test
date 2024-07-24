import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { UserRepository } from "../../../lib/User/domain/UserRepository";
import { UserFindById } from "../../../lib/User/application/UserFindById/UserFindById";
import { User } from "../../../lib/User/domain/User";
import { UserId } from "../../../lib/User/domain/UserId";
import { UserEmail } from "../../../lib/User/domain/UserEmail";
import { UserNotFoundError } from "../../../lib/User/domain/UserNotFoundError";

describe('UserFindById', () => {
  let repositoryMock: DeepMocked<UserRepository>;
  let userCase: UserFindById;
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
    repositoryMock = createMock<UserRepository>();
    userCase = new UserFindById(repositoryMock);
  });

  it('should be instance of User', async () => {
    repositoryMock.findById.mockResolvedValue(user);

    const useCaseResult = await userCase.run(user.id);

    expect(useCaseResult).toBeInstanceOf(User);
  });

  it('should find a user by id', async () => {
    repositoryMock.findById.mockResolvedValue(user);

    const useCaseResult = await userCase.run(user.id);

    expect(useCaseResult).toBe(user);
  });

  it('should throw an error if user is not found', async () => {
    repositoryMock.findById.mockResolvedValue(null);

    await expect(userCase.run(user.id)).rejects.toThrow(UserNotFoundError);
  });
});
