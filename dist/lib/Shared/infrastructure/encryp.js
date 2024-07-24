"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encrypt = void 0;
const bcrypt = require("bcrypt");
class Encrypt {
    static async hash(value) {
        return await bcrypt.hash(value, 10);
    }
    static async compare(value, hash) {
        return await bcrypt.compare(value, hash);
    }
}
exports.Encrypt = Encrypt;
