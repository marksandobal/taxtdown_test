import { UserGetAll } from "../../User/application/UserGetAll/UserGetAll";
import { UserFindById } from "../../User/application/UserFindById/UserFindById";
import { UserCreate } from "../../User/application/UserCreate/UserCreate";
import { UserUpdate } from "../../User/application/UserUpdate/UserUpdate";
import { UserDelete } from "../../User/application/UserDelete/UserDelete";
import { UserFindByEmail } from "../../User/application/UserFindByEmail/UserFindByEmail";
import { PostgresUserRepository } from "../../User/infrastructure/PostgresUserRepository";

const userRepository = new PostgresUserRepository();

export const ServiceContainer = {
  user: {
    getAll: new UserGetAll(userRepository),
    findById: new UserFindById(userRepository),
    findByEmail: new UserFindByEmail(userRepository),
    create: new UserCreate(userRepository),
    update: new UserUpdate(userRepository),
    delete: new UserDelete(userRepository)
  },
};
