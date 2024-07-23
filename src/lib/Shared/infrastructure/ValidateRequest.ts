import { NextFunction, Request, Response } from "express";
import { validationResult, FieldValidationError } from "express-validator";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(err => {
      const error = err as FieldValidationError;
      return { message: error.msg, field: error.path };
    }) });
  }
  next();
};

export default validateRequest;
