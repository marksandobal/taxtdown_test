import { body, query } from "express-validator";
import { Router } from "express";
import validateRequest from "../../Shared/infrastructure/ValidateRequest";
import { ExpressCreditController } from "./ExpressCreditController";
import passport from "../../auth/infrastructure/PassportUse";

const controller = new ExpressCreditController();
const creditRouter = Router();

creditRouter.get("/credits",
  passport.authenticate("jwt", { session: false }),
  controller.getAll);

creditRouter.get("/credits/:id",
  query("id").isInt().notEmpty().withMessage("Id must be an integer"),
  validateRequest,
  passport.authenticate("jwt", { session: false }),
  controller.getById);

creditRouter.post("/credits",
  [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("amount").isInt().notEmpty().withMessage("Amount must be an integer"),
    body("active").isBoolean().notEmpty().withMessage("Active must be a boolean"),
  ],
  validateRequest,
  passport.authenticate("jwt", { session: false }),
  controller.create);

export default creditRouter;
