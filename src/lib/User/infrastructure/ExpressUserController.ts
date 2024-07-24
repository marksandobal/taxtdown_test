import { Request, Response, NextFunction } from 'express';
import { ServiceContainer } from '../../Shared/infrastructure/ServiceContainer';
import { UserNotFoundError } from '../../User/domain/UserNotFoundError';
import { Encrypt } from '../../Shared/infrastructure/encryp';

export class ExpressUserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await ServiceContainer.user.getAll.run();
      const usersPrimitive = users.map(user => user.mapToPrimitive());
      return res.json(usersPrimitive).status(200);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const user = await ServiceContainer.user.findById.run(Number(id));

      return res.json(user.mapToPrimitive()).status(200);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ message: 'User not found' });
      }

      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const { name, lastName, email, password, createdAt, updatedAt } = req.body as {
      name: string,
      lastName: string,
      email: string,
      password: string,
      createdAt: string,
      updatedAt: string
    };

    try {
      const passwordHash = await Encrypt.hash(password);
      const user = await ServiceContainer.user.create.run(0, name, lastName, email, passwordHash, new Date(createdAt), new Date(updatedAt));

      return res.json(user).status(201);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name, lastName, email, password, createdAt, updatedAt } = req.body as {
      name: string,
      lastName: string,
      email: string,
      password: string,
      createdAt: string,
      updatedAt: string
    };
    try {
      const user = await ServiceContainer.user.update.run(Number(id), name, lastName, email, password, new Date(createdAt), new Date(updatedAt));

      return res.json(user).status(200);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ message: 'User not found' });
      }

      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await ServiceContainer.user.delete.run(Number(id));

      return res.status(204).json({ message: 'User deleted' });
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ message: 'User not found' });
      }

      next(error);
    }
  }
}
