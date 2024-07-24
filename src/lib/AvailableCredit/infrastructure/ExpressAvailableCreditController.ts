import { Request, Response, NextFunction } from "express";
import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";
import { RequestedCreditError } from "../domain/RequestedCreditError";

export class ExpressAvailableCreditController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const availableCredits = await ServiceContainer.availableCredit.getAll.run();
      res.json(availableCredits).status(200);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { amount, creditId, userId } = req.body;
    try {
      await ServiceContainer.availableCredit.create.run(amount, creditId, userId);
      res.json({ message: "Available credit created" }).status(201);
    } catch (error) {
      if (error instanceof RequestedCreditError) {
        res.status(400).json({ message: error.message });
      } else {
        next(error);
      }
    }
  }
}
