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
exports.TipController = void 0;
const authorization_service_1 = require("../services/authorization-service");
const user_1 = require("../models/user");
const tip_service_1 = require("../services/tip-service");
class TipController {
    constructor(db) {
        this.authorizationService = new authorization_service_1.AuthorizationService(db);
        this.tipService = new tip_service_1.TipService(db);
    }
    getTips(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // We do not need authrization. Anonymous users can view trips
            const tripId = request.params['tripId'];
            try {
                const tips = yield this.tipService.getTips(tripId);
                response.status(200).json({ tips });
            }
            catch (_a) {
                response.sendStatus(500);
            }
        });
    }
    createTip(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = request.userId;
            if (!(yield this.authorizationService.verifyRole(userId, [
                user_1.UserRoles.ADMINISTRATOR,
                user_1.UserRoles.USER,
            ]))) {
                response.sendStatus(401);
                return;
            }
            const tripId = request.params['tripId'];
            const tip = request.body;
            try {
                const tipId = yield this.tipService.createTip(tripId, tip);
                response.status(200).json({ tipId });
            }
            catch (_a) {
                response.sendStatus(500);
            }
        });
    }
    deleteTip(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = request.userId;
            if (!(yield this.authorizationService.verifyRole(userId, [
                user_1.UserRoles.ADMINISTRATOR,
                user_1.UserRoles.USER,
            ]))) {
                response.sendStatus(401);
                return;
            }
            const tipId = request.params['tipId'];
            const tripId = request.params['tripId'];
            try {
                yield this.tipService.deleteTip(tipId, tripId);
                response.sendStatus(200);
            }
            catch (_a) {
                response.sendStatus(500);
            }
        });
    }
    updateTip(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = request.userId;
            if (!(yield this.authorizationService.verifyRole(userId, [
                user_1.UserRoles.ADMINISTRATOR,
                user_1.UserRoles.USER,
            ]))) {
                response.sendStatus(401);
                return;
            }
            const tripId = request.params['tripId'];
            const tipId = request.params['tipId'];
            const tip = request.body;
            try {
                yield this.tipService.updateTip(tripId, tipId, tip, userId);
                response.sendStatus(200);
            }
            catch (_a) {
                response.sendStatus(500);
            }
        });
    }
}
exports.TipController = TipController;
//# sourceMappingURL=tip-controller.js.map