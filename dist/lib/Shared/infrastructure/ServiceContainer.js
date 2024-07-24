"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceContainer = void 0;
const UserGetAll_1 = require("../../User/application/UserGetAll/UserGetAll");
const UserGetAllWithAvailableCredits_1 = require("../../User/application/UserGetAllWithAvailableCredits/UserGetAllWithAvailableCredits");
const UserFindById_1 = require("../../User/application/UserFindById/UserFindById");
const UserCreate_1 = require("../../User/application/UserCreate/UserCreate");
const UserUpdate_1 = require("../../User/application/UserUpdate/UserUpdate");
const UserDelete_1 = require("../../User/application/UserDelete/UserDelete");
const UserFindByEmail_1 = require("../../User/application/UserFindByEmail/UserFindByEmail");
const PostgresUserRepository_1 = require("../../User/infrastructure/PostgresUserRepository");
const CreditGetAll_1 = require("../../Credit/application/CreditGetAll/CreditGetAll");
const CreditFindById_1 = require("../../Credit/application/CreditFindById/CreditFindById");
const CreditCreate_1 = require("../../Credit/application/CreditCreate/CreditCreate");
const PostgresCreditRepository_1 = require("../../Credit/infrastructure/PostgresCreditRepository");
const AvailableCreditGetAll_1 = require("../../AvailableCredit/application/AvailableCreditGetAll/AvailableCreditGetAll");
const AvailableCreditCreate_1 = require("../../AvailableCredit/application/AvailableCreditCreate/AvailableCreditCreate");
const PostgreAvailableCreditRepository_1 = require("../../AvailableCredit/infrastructure/PostgreAvailableCreditRepository");
const userRepository = new PostgresUserRepository_1.PostgresUserRepository();
const creditRepository = new PostgresCreditRepository_1.PostgresCreditRepository();
const availableCreditRepository = new PostgreAvailableCreditRepository_1.PostgreAvailableCreditRepository();
exports.ServiceContainer = {
    user: {
        getAll: new UserGetAll_1.UserGetAll(userRepository),
        getAllWithAvailableCredits: new UserGetAllWithAvailableCredits_1.UserGetAllWithAvailableCredits(userRepository),
        findById: new UserFindById_1.UserFindById(userRepository),
        findByEmail: new UserFindByEmail_1.UserFindByEmail(userRepository),
        create: new UserCreate_1.UserCreate(userRepository),
        update: new UserUpdate_1.UserUpdate(userRepository),
        delete: new UserDelete_1.UserDelete(userRepository)
    },
    credit: {
        getAll: new CreditGetAll_1.CreditGetAll(creditRepository),
        findById: new CreditFindById_1.CreditFindById(creditRepository),
        create: new CreditCreate_1.CreditCreate(creditRepository)
    },
    availableCredit: {
        getAll: new AvailableCreditGetAll_1.AvailableCreditGetAll(availableCreditRepository),
        create: new AvailableCreditCreate_1.AvailableCreditCreate(availableCreditRepository)
    }
};
