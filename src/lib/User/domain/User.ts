import { UserEmail } from './UserEmail';
import { UserId } from "./UserId";

export class User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: UserId,
    name: string,
    lastName: string,
    email: UserEmail,
    password: string | null,
    createdAt: Date | null,
    updatedAt: Date | null
  ) {
    this.id = id.value;
    this.name = name;
    this.lastName = lastName;
    this.email = email.value;
    this.password = password || '';
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public mapToPrimitive() {
    return {
      id: this.id,
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
