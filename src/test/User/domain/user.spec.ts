import { User } from "../../../lib/User/domain/User";
import { UserId } from "../../../lib/User/domain/UserId";
import { UserEmail } from "../../../lib/User/domain/UserEmail";

describe('User', () => {
  it('should create a user', () => {
    const user = new User(
      new UserId(1),
      'name',
      'lastname',
      new UserEmail('test@test.com'),
      'test',
      new Date(),
      new Date(),
    );

    expect(user).toBeDefined();
  });

  it('should throw an error if invalid email', () => {
    expect(() => new User(
      new UserId(1),
      'name',
      'lastname',
      new UserEmail('testtest.com'),
      'test',
      new Date(),
      new Date(),
    )).toThrow(Error);
  });
});
