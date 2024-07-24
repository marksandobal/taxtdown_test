import { Request, Response, NextFunction } from "express";
import { CreditRepository } from "../domain/CreditRepository";
import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";
import { CreditNotFoundError } from "../domain/CreditNotFoundError";

export class ExpressCreditController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const credits = await ServiceContainer.credit.getAll.run();
      return res.json(credits).status(200);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const credit = await ServiceContainer.credit.findById.run(Number(id));
      return res.json(credit).status(200);
    } catch (error) {
      if (error instanceof CreditNotFoundError) {
        return res.status(404).json({ message: 'Credit not found' });
      }
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const { name, amount, active } = req.body;
    try {
      await ServiceContainer.credit.create.run(0, name, amount, active);
      return res.json({ message: 'Credit created' }).status(201);
    } catch (error) {
      next(error);
    }
  }
}
