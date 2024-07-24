import { UserId } from "../../../lib/User/domain/UserId";

describe('UserId', () => {
  it('return 0 if null or undefined', () => {
    expect(new UserId(null as any).value).toBe(0);
    expect(new UserId(undefined as any).value).toBe(0);
  });
});
