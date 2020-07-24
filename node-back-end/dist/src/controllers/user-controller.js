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
exports.UserController = void 0;
const user_service_1 = require("../services/user-service");
const authorization_service_1 = require("../services/authorization-service");
const user_1 = require("../models/user");
const crypto = require("crypto-js");
class UserController {
    constructor(db) {
        this.userService = new user_service_1.UserService(db);
        this.authorizationService = new authorization_service_1.AuthorizationService(db);
    }
    getUserInfo(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = request.userId;
            if (!(yield this.authorizationService.verifyRole(userId, [
                user_1.UserRoles.ADMINISTRATOR,
                user_1.UserRoles.USER,
            ]))) {
                response.sendStatus(401);
                return;
            }
            const username = request.params['username'];
            const user = yield this.userService.getByUsername(username);
            if (user) {
                delete user.password;
            }
            response.status(200).send({ user });
        });
    }
    getUsers(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = request.userId;
            if (!(yield this.authorizationService.verifyRole(userId, [
                user_1.UserRoles.ADMINISTRATOR,
            ]))) {
                response.sendStatus(401);
                return;
            }
            const users = yield this.userService.getAllUsers();
            response.status(200).send({ users });
        });
    }
    createUser(request, response) {
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
            try {
                const userId = yield this.userService.create(userData);
                response.status(200).json({ userId });
            }
            catch (_a) {
                response.sendStatus(500);
            }
        });
    }
    updateUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = request.body;
            const userId = request.params['userId'];
            try {
                yield this.userService.update(userId, userData);
                response.sendStatus(200);
            }
            catch (_a) {
                response.sendStatus(500);
            }
        });
    }
    deleteUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = request.params['userId'];
            try {
                yield this.userService.delete(userId);
                response.sendStatus(200);
            }
            catch (_a) {
                response.sendStatus(500);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user-controller.js.map