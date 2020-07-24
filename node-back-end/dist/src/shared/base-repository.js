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
exports.BaseRepository = void 0;
// we imported all types from mongodb driver, to use in code
const mongodb_1 = require("mongodb");
// that class only can be extended
class BaseRepository {
    //we created constructor with arguments to manipulate mongodb operations
    constructor(db, collectionName) {
        this.collection = db.collection(collectionName);
    }
    // we add to method, the async keyword to manipulate the insert result
    // of method.
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.collection.insertOne(item);
            return result.insertedId.toString();
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.collection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: item });
            return !!result.result.ok && result.result.n > 0;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return !!result.result.ok && result.deletedCount && result.deletedCount > 0;
        });
    }
    find(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.collection.findOne(item);
            return result;
        });
    }
    findOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { _id: new mongodb_1.ObjectId(id) };
            const result = yield this.collection.findOne(query);
            return result;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.collection.find();
            return result.toArray();
        });
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base-repository.js.map