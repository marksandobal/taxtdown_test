import * as passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";
import * as dotenv from "dotenv";

dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await ServiceContainer.user.findById.run(Number(jwtPayload.id));
      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
