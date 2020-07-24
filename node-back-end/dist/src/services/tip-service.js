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
exports.TipService = void 0;
const trip_repository_1 = require("../repositories/trip-repository");
class TipService {
    constructor(db) {
        this.tripRepository = new trip_repository_1.TripRepository(db, 'trips');
    }
    getTips(tripId) {
        return __awaiter(this, void 0, void 0, function* () {
            const trip = yield this.tripRepository.getById(tripId);
            return trip.tips;
        });
    }
    createTip(tripId, tip) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipId = yield this.tripRepository.addTipToTrip(tripId, tip);
            return tipId;
        });
    }
    deleteTip(tipId, tripId) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield this.tripRepository.deleteTip(tipId, tripId);
            return isDeleted;
        });
    }
    updateTip(tripId, tipId, tipUpdates, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const trip = yield this.tripRepository.getById(tripId);
            trip.lastUpdated = Date.now().toString();
            trip.userId = userId;
            let tipToBeUpdated = trip.tips.find((tip) => tip.id === tipId);
            tipToBeUpdated = tipUpdates;
            const isUpdated = yield this.tripRepository.update(tripId, trip);
            return isUpdated;
        });
    }
}
exports.TipService = TipService;
//# sourceMappingURL=tip-service.js.map