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
exports.TripRepository = void 0;
const base_repository_1 = require("../shared/base-repository");
const mongodb_1 = require("mongodb");
class TripRepository extends base_repository_1.BaseRepository {
    getById(tripId) {
        return __awaiter(this, void 0, void 0, function* () {
            const trip = yield this.findOneById(tripId);
            return trip;
        });
    }
    createTrip(trip) {
        return __awaiter(this, void 0, void 0, function* () {
            // for (const tip of trip.tips) {
            //   tip.id = new ObjectId().toHexString();
            //   console.log(tip.id);
            // }
            console.log(trip);
            const tripId = yield this.create(trip);
            console.log(tripId);
            return tripId;
        });
    }
    addTipToTrip(tripId, tip) {
        return __awaiter(this, void 0, void 0, function* () {
            tip.id = new mongodb_1.ObjectId().toHexString();
            yield this.collection.updateOne({ _id: new mongodb_1.ObjectId(tripId) }, { $push: { tips: tip } });
            return tip.id;
        });
    }
    deleteTip(tipId, tripId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(tripId) }, { $pull: { tips: { id: tipId } } });
            return !!result.ok;
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const trip = yield this.findOneById(id);
            const result = yield this.collection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { name: item.name, city: item.city, country: item.country,
                    time: item.time, tips: item.tips, lastUpdated: item.lastUpdated, isDeleted: item.isDeleted } });
            return !!result.result.ok && result.result.n > 0;
        });
    }
}
exports.TripRepository = TripRepository;
//# sourceMappingURL=trip-repository.js.map