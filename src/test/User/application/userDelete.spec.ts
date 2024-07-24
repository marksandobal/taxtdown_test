import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { PostgresUserRepository } from "../../../lib/User/infrastructure/PostgresUserRepository";
import { UserDelete } from "../../../lib/User/application/UserDelete/UserDelete";
import { User } from "../../../lib/User/domain/User";
import { UserId } from "../../../lib/User/domain/UserId";
import { UserEmail } from "../../../lib/User/domain/UserEmail";
import { UserNotFoundError } from "../../../lib/User/domain/UserNotFoundError";

describe('UserDelete', () => {
  let repositoryMock: DeepMocked<PostgresUserRepository>;
  let userCase: UserDelete;
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
    jest.spyOn(repositoryMock, 'delete').mockResolvedValue();
    userCase = new UserDelete(repositoryMock);
  });

  it('should delete a user', async () => {
    await userCase.run(user.id);

    expect(repositoryMock.delete).toHaveBeenCalledWith(user.id);
  });

  it('error if user is not found', async () => {
    repositoryMock.delete.mockRejectedValue(new UserNotFoundError());

    await expect(userCase.run(1)).rejects.toThrow(UserNotFoundError);
  });
});
