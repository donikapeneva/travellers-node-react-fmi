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
exports.TripController = void 0;
const user_1 = require("../models/user");
const trip_service_1 = require("../services/trip-service");
class TripController {
    constructor(db) {
        // this.authorizationService = new AuthorizationService(db);
        this.tripService = new trip_service_1.TripService(db);
    }
    getTripInfo(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // We do not need authrization. Anonymous users can view trips
            const tripId = request.params['tripId'];
            try {
                const trip = yield this.tripService.getTripInfo(tripId);
                response.status(200).json({ trip });
            }
            catch (_a) {
                response.sendStatus(500);
            }
        });
    }
    getTrips(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // We do not need authrization. Anonymous users can view trips
            try {
                const trips = yield this.tripService.getTrips();
                response.status(200).json({ trips });
            }
            catch (_a) {
                response.sendStatus(500);
            }
        });
    }
    createTrip(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = request.userId;
            if (!(yield this.authorizationService.verifyRole(userId, [
                user_1.UserRoles.ADMINISTRATOR,
                user_1.UserRoles.USER,
            ]))) {
                response.sendStatus(401);
                return;
            }
            const trip = request.body;
            console.log(trip);
            try {
                const tripId = yield this.tripService.createTrip(trip, trip.userId);
                response.status(200).json({ tripId });
            }
            catch (_a) {
                response.sendStatus(500);
            }
        });
    }
    deleteTrip(request, response) {
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
            try {
                yield this.tripService.deleteTrip(tripId);
                response.sendStatus(200);
            }
            catch (_a) {
                response.sendStatus(500);
            }
        });
    }
    updateTrip(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = request.userId;
            if (!(yield this.authorizationService.verifyRole(userId, [
                user_1.UserRoles.ADMINISTRATOR,
                user_1.UserRoles.USER,
            ]))) {
                response.sendStatus(401);
                return;
            }
            const tripUpdates = request.body;
            const tripId = request.params['tripId'];
            try {
                yield this.tripService.updateTrip(tripId, tripUpdates);
                response.sendStatus(200);
            }
            catch (_a) {
                response.sendStatus(500);
            }
        });
    }
}
exports.TripController = TripController;
//# sourceMappingURL=trip-controller.js.map