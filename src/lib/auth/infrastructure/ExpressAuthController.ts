import { Encrypt } from "../../Shared/infrastructure/encryp";
import { Request, Response, NextFunction } from "express";
import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";
import * as jwt from "jsonwebtoken";
import { UserNotFoundError } from "../../User/domain/UserNotFoundError";
import * as dotenv from "dotenv";

dotenv.config();

export class ExpressAuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const user = await ServiceContainer.user.findByEmail.run(email);
      if (!user || !(await Encrypt.compare(password, user.password as string))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

      res.json({ token }).status(200);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ message: 'User not found' });
      }

      return next(error);
    }
  }
}
