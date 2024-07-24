"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserId_1 = require("../../../lib/User/domain/UserId");
describe('UserId', () => {
    it('return 0 if null or undefined', () => {
        expect(new UserId_1.UserId(null).value).toBe(0);
        expect(new UserId_1.UserId(undefined).value).toBe(0);
    });
});
