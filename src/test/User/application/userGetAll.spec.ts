import { TestPostgresRepositoryMock } from '../../mocks/TestPostgreRespositoryMock';
import { UserGetAll } from "../../../lib/User/application/UserGetAll/UserGetAll";

describe('UserGetAll', () => {
  it('should be instance of User', () => {
    const repository = new TestPostgresRepositoryMock();
    const user = new UserGetAll(repository);

    expect(user).toBeDefined();	
  });

  it('should create a user', async () => {
    const repository = new TestPostgresRepositoryMock();
    const useCase = new UserGetAll(repository);

    const userResult = await useCase.run();
    console.log("====================");
    console.log(userResult);
    expect(userResult.length).toBe(1);
  });
});
