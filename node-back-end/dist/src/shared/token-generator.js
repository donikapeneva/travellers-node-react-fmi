"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenGenerator = void 0;
const jsonwebtoken = require("jsonwebtoken");
class TokenGenerator {
    static generateToken(userId) {
        const token = jsonwebtoken.sign({ id: userId }, TokenGenerator.SECRET, {
            expiresIn: TokenGenerator.EXPIRATION_TIME,
        });
        return token;
    }
}
exports.TokenGenerator = TokenGenerator;
TokenGenerator.SECRET = 'donySecret';
// 24 hours
TokenGenerator.EXPIRATION_TIME = 86400;
//# sourceMappingURL=token-generator.js.map