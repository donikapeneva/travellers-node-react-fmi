"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationMiddleWare = void 0;
const jsonwebtoken = require("jsonwebtoken");
class AuthorizationMiddleWare {
    static authorize(req, res, next) {
        const { userId } = req.body;
        if (!token) {
            return res
                .status(403)
                .send({ auth: false, message: 'No token provided.' });
        }
        jsonwebtoken.verify(token, 'donySecret', function (err, decoded) {
            if (err) {
                return res
                    .status(500)
                    .send({ auth: false, message: 'Failed to authenticate token.' });
            }
            // if everything good, save to request for use in other routes
            // req.userId = decoded.id;
            next();
        });
    }
}
exports.AuthorizationMiddleWare = AuthorizationMiddleWare;
//# sourceMappingURL=authorization-middleware.js.map