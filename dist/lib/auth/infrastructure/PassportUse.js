"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
const ServiceContainer_1 = require("../../Shared/infrastructure/ServiceContainer");
const dotenv = require("dotenv");
dotenv.config();
const jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};
passport.use(new passport_jwt_1.Strategy(jwtOptions, async (jwtPayload, done) => {
    try {
        const user = await ServiceContainer_1.ServiceContainer.user.findById.run(Number(jwtPayload.id));
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    }
    catch (error) {
        return done(error, false);
    }
}));
exports.default = passport;
