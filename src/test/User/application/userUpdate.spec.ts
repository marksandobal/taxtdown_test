
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { PostgresUserRepository } from "src/lib/User/infrastructure/PostgresUserRepository";
import { UserUpdate } from "../../../lib/User/application/UserUpdate/UserUpdate";
import { User } from "../../../lib/User/domain/User";
import { UserId } from "../../../lib/User/domain/UserId";
import { UserEmail } from "../../../lib/User/domain/UserEmail";
import { UserNotFoundError } from "../../../lib/User/domain/UserNotFoundError";

describe('UserUpdate', () => {
  let repositoryMock: DeepMocked<PostgresUserRepository>;
  let userCase: UserUpdate;
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
    jest.spyOn(repositoryMock, 'update').mockImplementation(() => Promise.resolve());
    userCase = new UserUpdate(repositoryMock);
  });

  it('should update a user', async () => {
    await userCase.run(user.id,
      user.name,
      user.lastName,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt
    );

    expect(repositoryMock.update).toHaveBeenCalledWith(user);
  });

  it('error if email is invalid value', async () => {
    await expect(userCase.run(user.id,
      user.name,
      user.lastName,
      'user.email',
      user.password,
      user.createdAt,
      user.updatedAt
    )).rejects.toThrow(Error);
  });

  it('error if user not found', async () => {
    repositoryMock.findById.mockResolvedValue(null);

    await expect(userCase.run(user.id,
      user.name,
      user.lastName,
      'john.doe@example.com',
      user.password,
      user.createdAt,
      user.updatedAt
    )).rejects.toThrow(UserNotFoundError);
  });
});
