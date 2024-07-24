import { UserGetAll } from "../../User/application/UserGetAll/UserGetAll";
import { UserGetAllWithAvailableCredits } from "../../User/application/UserGetAllWithAvailableCredits/UserGetAllWithAvailableCredits";
import { UserFindById } from "../../User/application/UserFindById/UserFindById";
import { UserCreate } from "../../User/application/UserCreate/UserCreate";
import { UserUpdate } from "../../User/application/UserUpdate/UserUpdate";
import { UserDelete } from "../../User/application/UserDelete/UserDelete";
import { UserFindByEmail } from "../../User/application/UserFindByEmail/UserFindByEmail";
import { PostgresUserRepository } from "../../User/infrastructure/PostgresUserRepository";
import { CreditGetAll } from "../../Credit/application/CreditGetAll/CreditGetAll";
import { CreditFindById } from "../../Credit/application/CreditFindById/CreditFindById";
import { CreditCreate } from "../../Credit/application/CreditCreate/CreditCreate";
import { PostgresCreditRepository } from "../../Credit/infrastructure/PostgresCreditRepository";
import { AvailableCreditGetAll } from "../../AvailableCredit/application/AvailableCreditGetAll/AvailableCreditGetAll";
import { AvailableCreditCreate } from "../../AvailableCredit/application/AvailableCreditCreate/AvailableCreditCreate";
import { PostgreAvailableCreditRepository } from "../../AvailableCredit/infrastructure/PostgreAvailableCreditRepository";

const userRepository = new PostgresUserRepository();
const creditRepository = new PostgresCreditRepository();
const availableCreditRepository = new PostgreAvailableCreditRepository();

export const ServiceContainer = {
  user: {
    getAll: new UserGetAll(userRepository),
    getAllWithAvailableCredits: new UserGetAllWithAvailableCredits(userRepository),
    findById: new UserFindById(userRepository),
    findByEmail: new UserFindByEmail(userRepository),
    create: new UserCreate(userRepository),
    update: new UserUpdate(userRepository),
    delete: new UserDelete(userRepository)
  },
  credit: {
    getAll: new CreditGetAll(creditRepository),
    findById: new CreditFindById(creditRepository),
    create: new CreditCreate(creditRepository)
  },
  availableCredit: {
    getAll: new AvailableCreditGetAll(availableCreditRepository),
    create: new AvailableCreditCreate(availableCreditRepository)
  }
};
