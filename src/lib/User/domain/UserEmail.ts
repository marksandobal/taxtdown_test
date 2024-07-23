export class UserEmail {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!this.value) {
      throw new Error('Invalid email');
    }

    if (!regex.test(this.value)) {
      throw new Error('Invalid email');
    }
  }
}
