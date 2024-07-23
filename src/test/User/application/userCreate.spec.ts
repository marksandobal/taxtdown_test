/* import { User } from "../../../lib/User/domain/User";
import { UserId } from "../../../lib/User/domain/UserId";
import { UserEmail } from "../../../lib/User/domain/UserEmail";
import { UserCreate } from "../../../lib/User/application/UserCreate/UserCreate";
import { TestPostgresRepositoryMock } from 'src/test/mocks/TestPostgreRespositoryMock';

('pg', () => ({
  __esModule: true,
  Pool: jest.fn().mockImplementation(() => ({
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  })),
}));

describe('UserCreate', () => {
  it('should be instance of User', () => {
    const user = new UserCreate(new TestPostgresRepositoryMock());

    expect(user).toBeDefined();	
  });

  it('should create a user', async () => {
    const useCase = new UserCreate(new TestPostgresRepositoryMock());
    const user = new User(
      new UserId(1),
      'John',
      'Doe',
      new UserEmail('john.doe@example.com'),
      'password',
      new Date(),
      new Date()
    )

    const userResult = await useCase.run(
      user.id,
      user.name,
      user.lastName,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt
    );

    expect(userResult).toBeDefined();	
  });
});
 */