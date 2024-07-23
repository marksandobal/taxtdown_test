/* import { User } from "../../../lib/User/domain/User";
import { UserFindByEmail } from "../../../lib/User/application/UserFndByEmail/UserFindByEmail";
import { TestPostgresRepositoryMock } from '../../mocks/TestPostgreRespositoryMock';

describe('UserFindByEmail', () => {
  it('should be instance of User', () => {
    const user = new UserFindByEmail(new TestPostgresRepositoryMock());

    expect(user).toBeDefined();	
  });

  it('should create a user', async () => {
    const repository = new TestPostgresRepositoryMock();
    const useCase = new UserFindByEmail(repository);
    
    const userResult = await useCase.run('john.doe@example.com');
    console.log("====================")
    console.log(userResult);
    expect(userResult?.id).toBe(1);
    expect(userResult?.name).toBe('John');
    expect(userResult?.lastName).toBe('Doe');
    expect(userResult?.email).toBe('john.doe@example.com');
  });
});
 */