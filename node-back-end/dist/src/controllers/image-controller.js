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
exports.ImageController = void 0;
const user_1 = require("../models/user");
const image_service_1 = require("../services/image-service");
const authorization_service_1 = require("../services/authorization-service");
class ImageController {
    constructor(db) {
        this.imageService = new image_service_1.ImageService(db);
        this.authorizationService = new authorization_service_1.AuthorizationService(db);
    }
    getImage(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // We do not need authrization. Anonymous users can view trips
            const imageId = request.params['imageId'];
            try {
                const image = yield this.imageService.getImage(imageId);
                response.status(200).json({ image });
            }
            catch (_a) {
                response.sendStatus(500);
            }
        });
    }
    getImages(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // We do not need authrization. Anonymous users can view trips
            const tripId = request.params['tripId'];
            try {
                const images = yield this.imageService.getImages(tripId);
                response.status(200).json({ images });
            }
            catch (_a) {
                response.status(200).json({ error: 'Images not found' });
            }
        });
    }
    uploadImage(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = request.userId;
            if (!(yield this.authorizationService.verifyRole(userId, [
                user_1.UserRoles.ADMINISTRATOR,
                user_1.UserRoles.USER,
            ]))) {
                response.sendStatus(401);
                return;
            }
            const { image, tripId } = request.body;
            try {
                yield this.imageService.uploadImage(tripId, image);
                response.sendStatus(200);
            }
            catch (_a) {
                response.sendStatus(500).json({ error: 'Image not uploaded' });
            }
        });
    }
    deleteImage(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = request.userId;
            if (!(yield this.authorizationService.verifyRole(userId, [
                user_1.UserRoles.ADMINISTRATOR,
                user_1.UserRoles.USER,
            ]))) {
                response.sendStatus(401);
                return;
            }
            const imageId = request.params['imageId'];
            try {
                yield this.imageService.deleteImage(imageId);
                response.sendStatus(200);
            }
            catch (_a) {
                response.status(500).json({ error: 'Images is not found' });
            }
        });
    }
}
exports.ImageController = ImageController;
//# sourceMappingURL=image-controller.js.map