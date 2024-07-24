import { Router } from "express";
import { body } from "express-validator";
import { ExpressAvailableCreditController } from "./ExpressAvailableCreditController";
import validateRequest from "../../Shared/infrastructure/ValidateRequest";
import passport from "../../auth/infrastructure/PassportUse";

const controller = new ExpressAvailableCreditController();

const router = Router();

router.get("/available-credits",
  passport.authenticate("jwt", { session: false }),
  controller.getAll);

router.post("/available-credits",
  passport.authenticate("jwt", { session: false }),
  [
    body("amount").isNumeric().notEmpty(),
    body("creditId").isNumeric().notEmpty(),
    body("userId").isNumeric().notEmpty()
  ],
  validateRequest,
  controller.create);

export default router;
