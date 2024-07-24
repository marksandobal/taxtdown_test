import { body, query } from "express-validator";
import { Router } from "express";
import validateRequest from "../../Shared/infrastructure/ValidateRequest";
import { ExpressUserController } from "./ExpressUserController";
import passport from "../../auth/infrastructure/PassportUse";

const controller = new ExpressUserController();

const userRouter = Router();

userRouter.get("/users/available-credits",
  [
    query('orderDirection').isIn(['ASC', 'DESC']).optional()
  ],
  validateRequest,
  passport.authenticate('jwt', { session: false }),
  controller.getAllWithAvailableCredits);

userRouter.get("/users",
  passport.authenticate('jwt', { session: false }),
  controller.getAll);
userRouter.get("/users/:id",
  passport.authenticate('jwt', { session: false }),
  controller.getById);

userRouter.post("/users",
  [
    body('name').isString().notEmpty(),
    body('lastName').isString().notEmpty(),
    body('email').isEmail().notEmpty(),
    body('password').isString().notEmpty()
  ],
  validateRequest,
  controller.create);

userRouter.put("/users/:id",
  passport.authenticate('jwt', { session: false }),
  controller.update);
userRouter.delete("/users/:id",
  passport.authenticate('jwt', { session: false }),
  controller.delete);

export default userRouter;
