import * as express from "express";
import * as passport from "passport";
import { Request, Response, NextFunction } from "express";
import ExpressUserRouter from "./lib/User/infrastructure/ExpressUserRouter";
import ExpressAuthRouter from "./lib/auth/infrastructure/AuthRouter";
import ExpressCreditRouter from "./lib/Credit/infrastructure/ExpressCreditRouter";
import ExpressAvailableCreditRouter from "./lib/AvailableCredit/infrastructure/ExpressAvailableCreditRouter";

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(ExpressAuthRouter);
app.use(ExpressUserRouter);
app.use(ExpressCreditRouter);
app.use(ExpressAvailableCreditRouter);

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof Error) {
    console.error(error.stack);
    return res.status(500).send(error.message);
  }

  console.error(error);
  return res.status(500).send("Internal Server Error");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
