"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const ExpressUserRouter_1 = require("./lib/User/infrastructure/ExpressUserRouter");
const AuthRouter_1 = require("./lib/auth/infrastructure/AuthRouter");
const ExpressCreditRouter_1 = require("./lib/Credit/infrastructure/ExpressCreditRouter");
const ExpressAvailableCreditRouter_1 = require("./lib/AvailableCredit/infrastructure/ExpressAvailableCreditRouter");
const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(AuthRouter_1.default);
app.use(ExpressUserRouter_1.default);
app.use(ExpressCreditRouter_1.default);
app.use(ExpressAvailableCreditRouter_1.default);
app.use((error, req, res, next) => {
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
