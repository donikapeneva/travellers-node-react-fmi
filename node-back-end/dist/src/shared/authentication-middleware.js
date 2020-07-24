"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationMiddleware = void 0;
const token_utility_1 = require("./token-utility");
class AuthenticationMiddleware {
    static verifyToken(req, res, next) {
        const authorizationHeaderValue = req.headers['authorization'];
        if (!authorizationHeaderValue) {
            return res
                .status(403)
                .send({ auth: false, message: 'No token provided.' });
        }
        const token = authorizationHeaderValue
            .toString()
            .replace('Bearer', '')
            .trim();
        if (!token) {
            return res
                .status(403)
                .send({ auth: false, message: 'No token provided.' });
        }
        const verificationHandler = (err, decoded) => {
            if (err) {
                return res
                    .status(500)
                    .send({ auth: false, message: 'Failed to authenticate token.' });
            }
            // if everything good, save to request for use in other routes
            req.userId = decoded.id;
            next();
        };
        token_utility_1.TokenUtility.verifyToken(token, verificationHandler);
    }
}
exports.AuthenticationMiddleware = AuthenticationMiddleware;
//# sourceMappingURL=authentication-middleware.js.map