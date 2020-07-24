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
exports.AuthorizationService = void 0;
const user_service_1 = require("./user-service");
class AuthorizationService {
    constructor(db) {
        this.userService = new user_service_1.UserService(db);
    }
    verifyRole(userId, roles) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getByUserId(userId);
            const userRoles = new Set([...roles].map((role) => role.toString().toUpperCase()));
            return user ? userRoles.has(user.role.toUpperCase()) : false;
        });
    }
}
exports.AuthorizationService = AuthorizationService;
//# sourceMappingURL=authorization-service.js.map