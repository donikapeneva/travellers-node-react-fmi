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
exports.UserRepository = void 0;
const base_repository_1 = require("../shared/base-repository");
class UserRepository extends base_repository_1.BaseRepository {
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { username };
            const user = yield this.collection.findOne(query);
            if (user) {
                user.id = user._id.toString();
            }
            return user;
        });
    }
    findByMail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { email };
            const user = yield this.collection.findOne(query);
            if (user) {
                user.id = user._id.toString();
            }
            return user;
        });
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOneById(userId);
            if (user) {
                user.id = user._id.toString();
            }
            return user;
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user-repository.js.map