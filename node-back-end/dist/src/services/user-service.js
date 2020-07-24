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
exports.UserService = void 0;
const user_repository_1 = require("../repositories/user-repository");
class UserService {
    constructor(db) {
        this.userRepository = new user_repository_1.UserRepository(db, 'users');
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield this.userRepository.create(userData);
            return userId;
        });
    }
    update(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUpdated = yield this.userRepository.update(userId, userData);
            return isUpdated;
        });
    }
    // Do we want to delete it physicali from db?
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield this.userRepository.delete(userId);
            return isDeleted;
        });
    }
    getByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByUsername(username);
            return user;
        });
    }
    getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(userId);
            return user;
        });
    }
    usernameExists(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByUsername(username);
            return user !== null;
        });
    }
    mailsExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByMail(email);
            return user !== null;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.getAll();
            for (const user of users) {
                delete user.password;
            }
            return users;
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map