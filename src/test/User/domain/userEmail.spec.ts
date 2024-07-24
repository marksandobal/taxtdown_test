import { UserEmail } from "../../../lib/User/domain/UserEmail";

describe('UserEmail', () => {
  it('should throw an error if invalid email', () => {
    expect(() => new UserEmail('testtest.com')).toThrow(Error);
  });

  it('should throw an error if invalid email', () => {
    expect(() => new UserEmail('')).toThrow(Error);
  });

  it('should create a valid email', () => {
    const email = new UserEmail('test@test.com');
    expect(email).toBeInstanceOf(UserEmail);
  });
});
