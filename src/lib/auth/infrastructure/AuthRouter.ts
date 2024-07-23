import { Router } from "express";
import { body } from "express-validator";
import { ExpressAuthController } from "./ExpressAuthController";
import validateRequest from "../../Shared/infrastructure/ValidateRequest";

const authRouter = Router();
const controller = new ExpressAuthController();

authRouter.post('/login', [
    body('email').isEmail().withMessage('Email is required'),
    body('password').isString().withMessage('Password is required'),
  ], validateRequest,
  controller.login);

export default authRouter;
