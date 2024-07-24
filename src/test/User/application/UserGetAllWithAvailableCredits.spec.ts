import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { UserGetAllWithAvailableCredits } from "../../../lib/User/application/UserGetAllWithAvailableCredits/UserGetAllWithAvailableCredits";
import { PostgresUserRepository } from "src/lib/User/infrastructure/PostgresUserRepository";
import { UserId } from "../../../lib/User/domain/UserId";
import { UserEmail } from "../../../lib/User/domain/UserEmail";
import { User } from "../../../lib/User/domain/User";
import { UserWithAvailableCredit } from "../../../lib/User/domain/UserWithAvailableCredit";

describe('UserGetAllWithAvailableCredits', () => {
  let repositoryMock: DeepMocked<PostgresUserRepository>;
  let useCase: UserGetAllWithAvailableCredits;

  const userWithAvailableCredit = new UserWithAvailableCredit(
   new User(
    new UserId(1),
    'John',
    'Doe',
    new UserEmail('john.doe@example.com'),
    null,
    null,
    null
   ),
   1,
   1,
   'Credito de verano',
   1000,
   100
  );

  beforeEach(() => {
    repositoryMock = createMock<PostgresUserRepository>();
    useCase = new UserGetAllWithAvailableCredits(repositoryMock);
  });

  it('return all users with their available credits', async () => {
    repositoryMock.getAllWithAvailableCredits.mockResolvedValue([userWithAvailableCredit]);

    const userCaseResult = await useCase.run();

    expect(userCaseResult).toHaveLength(1);
    expect(userCaseResult).toEqual([userWithAvailableCredit]);
  });
});
