import * as bcrypt from 'bcrypt';

export class Encrypt {
  static async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, 10);
  }

  static async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
