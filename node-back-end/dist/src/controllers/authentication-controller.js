"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const user_service_1 = require("../services/user-service");
const user_1 = require("../models/user");
const crypto = require("crypto-js");
const token_utility_1 = require("../shared/token-utility");
// Think about storing token in database. It will be more secure, because currently we
// do not have a mechanism to invalidate token
class AuthenticationController {
    constructor(db, refreshTokenManager) {
        this.userService = new user_service_1.UserService(db);
        this.refreshTokenManager = refreshTokenManager;
    }
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = request.body;
            const user = yield this.userService.getByUsername(username);
            const passwordIsValid = crypto.SHA256(password).toString() === user.password;
            if (!passwordIsValid) {
                response.status(401).send({ auth: false, token: null });
            }
            else {
                const token = token_utility_1.TokenUtility.generateToken(user.id);
                const refreshToken = token_utility_1.TokenUtility.generateRefreshToken(user.id);
                this.refreshTokenManager.registerRefreshToken(refreshToken);
                response
                    .status(200)
                    .json({ auth: true, token: token, refreshToken: refreshToken });
            }
        });
    }
    logout(request, response) {
        const { refreshToken } = request.body;
        this.refreshTokenManager.invalidateRefreshToken(refreshToken);
        response.status(200).json({ auth: false, token: null });
    }
    register(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = request.body;
            // Could be optimized with 1 query
            const isUserNameExists = yield this.userService.usernameExists(userData.username);
            const isMailExists = yield this.userService.mailsExists(userData.email);
            if (isUserNameExists || isMailExists) {
                // Change status and send appropriate message
                response.status(500).send('Username or mail exist in database');
                return;
            }
            const hashedPassword = crypto.SHA256(userData.password).toString();
            userData.password = hashedPassword;
            // TODO test PURPOSE
            userData.role = user_1.UserRoles.ADMINISTRATOR;
            try {
                const userId = yield this.userService.create(userData);
                const token = token_utility_1.TokenUtility.generateToken(userId);
                const refreshToken = token_utility_1.TokenUtility.generateRefreshToken(userId);
                this.refreshTokenManager.registerRefreshToken(refreshToken);
                response
                    .status(200)
                    .json({ auth: true, token: token, refreshToken: refreshToken });
            }
            catch (_a) {
                response.sendStatus(500);
            }
        });
    }
    token(request, response) {
        const { refreshToken } = request.body;
        if (!refreshToken) {
            response.sendStatus(401);
            return;
        }
        if (!this.refreshTokenManager.isRefreshTokenValid(refreshToken)) {
            response.sendStatus(403);
            return;
        }
        const verifyHandler = (err, user) => {
            if (err) {
                return response.sendStatus(403);
            }
            const accessToken = token_utility_1.TokenUtility.generateToken(user.id);
            response.json({
                accessToken,
            });
        };
        token_utility_1.TokenUtility.verifyRefreshToken(refreshToken, verifyHandler);
    }
}
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=authentication-controller.js.map