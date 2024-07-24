"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressAuthController = void 0;
const encryp_1 = require("../../Shared/infrastructure/encryp");
const ServiceContainer_1 = require("../../Shared/infrastructure/ServiceContainer");
const jwt = require("jsonwebtoken");
const UserNotFoundError_1 = require("../../User/domain/UserNotFoundError");
const dotenv = require("dotenv");
dotenv.config();
class ExpressAuthController {
    async login(req, res, next) {
        const { email, password } = req.body;
        try {
            const user = await ServiceContainer_1.ServiceContainer.user.findByEmail.run(email);
            if (!user || !(await encryp_1.Encrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token }).status(200);
        }
        catch (error) {
            if (error instanceof UserNotFoundError_1.UserNotFoundError) {
                return res.status(404).json({ message: 'User not found' });
            }
            return next(error);
        }
    }
}
exports.ExpressAuthController = ExpressAuthController;
