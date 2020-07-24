"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenUtility = void 0;
const jsonwebtoken = require("jsonwebtoken");
class TokenUtility {
    static generateToken(userId) {
        const token = jsonwebtoken.sign({ id: userId }, TokenUtility.TOKEN_SECRET, {
            expiresIn: TokenUtility.EXPIRATION_TOKEN_TIME_IN_SECONDS,
        });
        return token;
    }
    static verifyToken(token, callback) {
        jsonwebtoken.verify(token, TokenUtility.TOKEN_SECRET, callback);
    }
    static verifyRefreshToken(refreshToken, callback) {
        jsonwebtoken.verify(refreshToken, TokenUtility.REFRESH_TOKEN_SECRET, callback);
    }
    static generateRefreshToken(userId) {
        const token = jsonwebtoken.sign({ id: userId }, TokenUtility.REFRESH_TOKEN_SECRET, {
            expiresIn: TokenUtility.EXPIRATION_REFRESH_TOKEN_TIME_IN_SECONDS,
        });
        return token;
    }
}
exports.TokenUtility = TokenUtility;
TokenUtility.TOKEN_SECRET = 'donySecret';
TokenUtility.REFRESH_TOKEN_SECRET = 'donySecretRefresh';
// 1 hours
TokenUtility.EXPIRATION_TOKEN_TIME_IN_SECONDS = 3600;
// 24 hours
TokenUtility.EXPIRATION_REFRESH_TOKEN_TIME_IN_SECONDS = 86400;
//# sourceMappingURL=token-utility.js.map