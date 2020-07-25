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
exports.ImageService = void 0;
const image_repository_1 = require("../repositories/image-repository");
class ImageService {
    constructor(db) {
        this.imageRepository = new image_repository_1.ImageRepository(db, 'images');
    }
    getImage(imageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.imageRepository.findByImageId(imageId);
        });
    }
    getCoverImage(imageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.imageRepository.findAllByTripId(imageId)
                .then((res) => {
                if (res.length > 0) {
                    return res[0];
                }
                return undefined;
            });
        });
    }
    getImages(tripId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.imageRepository.findAllByTripId(tripId);
        });
    }
    uploadImage(tripId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("tripId" + tripId);
            image.tripId = tripId;
            // image.source = image.source.slice(image.source.indexOf(",") + 1 );
            const imageId = yield this.imageRepository.create(image);
            return imageId;
        });
    }
    deleteImage(imageId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(imageId);
            const isDeleted = yield this.imageRepository.delete(imageId);
            return isDeleted;
        });
    }
}
exports.ImageService = ImageService;
//# sourceMappingURL=image-service.js.map