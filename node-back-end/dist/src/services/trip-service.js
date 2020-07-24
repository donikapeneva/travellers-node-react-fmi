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
exports.TripService = void 0;
const trip_repository_1 = require("../repositories/trip-repository");
class TripService {
    constructor(db) {
        this.tripRepository = new trip_repository_1.TripRepository(db, 'trips');
    }
    getTripInfo(tripId) {
        return __awaiter(this, void 0, void 0, function* () {
            const trip = yield this.tripRepository.getById(tripId);
            return trip;
        });
    }
    getTrips() {
        return __awaiter(this, void 0, void 0, function* () {
            const trips = yield this.tripRepository.getAll();
            return trips;
        });
    }
    createTrip(trip, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTrip = Object.assign({}, trip);
            newTrip.userId = userId;
            newTrip.isDeleted = false;
            newTrip.lastUpdated = Date.now().toString();
            const tripId = yield this.tripRepository.createTrip(newTrip);
            return tripId;
        });
    }
    deleteTrip(tripId) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield this.tripRepository.delete(tripId);
            return isDeleted;
        });
    }
    updateTrip(tripId, tripUpdates) {
        return __awaiter(this, void 0, void 0, function* () {
            tripUpdates.lastUpdated = Date.now().toString();
            tripUpdates.userId = Date.now().toString();
            const isUpdated = yield this.tripRepository.update(tripId, tripUpdates);
            return isUpdated;
        });
    }
}
exports.TripService = TripService;
//# sourceMappingURL=trip-service.js.map