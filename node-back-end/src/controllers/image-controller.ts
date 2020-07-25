import {Request, Response} from 'express';
import {Db} from 'mongodb';
import {UserRoles} from '../models/user';
import {IImageService, ImageService} from '../services/image-service';
import {AuthorizationService, IAuthorizationService,} from '../services/authorization-service';

export class ImageController implements IImageController {
    // TODO use DI
    private readonly imageService: IImageService;
    private readonly authorizationService: IAuthorizationService;

    public constructor(db: Db) {
        this.imageService = new ImageService(db);
        this.authorizationService = new AuthorizationService(db);
    }

    public async getImage(request: Request, response: Response): Promise<void> {
        // We do not need authrization. Anonymous users can view trips
        const imageId = request.params['imageId'];

        try {
            const image = await this.imageService.getImage(imageId);

            response.status(200).json({image});
        } catch {
            response.sendStatus(500);
        }
    }

    public async getCoverImage(request: Request, response: Response): Promise<void> {
        // We do not need authrization. Anonymous users can view trips
        const tripId = request.params['tripId'];

        try {
            const image = await this.imageService.getCoverImage(tripId);

            response.status(200).json({image});
        } catch {
            response.status(200).json({error: 'Images not found'});
        }
    }

    public async getImages(request: Request, response: Response): Promise<void> {
        // We do not need authrization. Anonymous users can view trips
        const tripId = request.params['tripId'];
        console.log("GET");
        console.log(tripId);
        try {
            const images = await this.imageService.getImages(tripId);
            console.log("IMAGES");
            response.status(200).json(images);
        } catch {
            response.status(200).json({error: 'Images not found'});
        }
    }

    public async uploadImage(
        request: Request,
        response: Response
    ): Promise<void> {
        const userId: string = (request as any).userId;

        // if (
        //     !(await this.authorizationService.verifyRole(userId, [
        //         UserRoles.ADMINISTRATOR,
        //         UserRoles.USER,
        //     ]))
        // ) {
        //     response.sendStatus(401);
        //
        //     return;
        // }

        const {image, tripId} = request.body;

        try {
            console.log("tripId in controller: " + tripId);
            await this.imageService.uploadImage(tripId, image);

            response.sendStatus(200);
        } catch {
            response.sendStatus(500).json({error: 'Image not uploaded'});
        }
    }

    public async deleteImage(
        request: Request,
        response: Response
    ): Promise<void> {
        const userId: string = (request as any).userId;
        console.log("request.params");
        console.log(request.params);
        // if (
        //     !(await this.authorizationService.verifyRole(userId, [
        //         UserRoles.ADMINISTRATOR,
        //         UserRoles.USER,
        //     ]))
        // ) {
        //     response.sendStatus(401);
        //
        //     return;
        // }

        const imageId = request.params['imageId'];

        try {
            await this.imageService.deleteImage(imageId);

            response.sendStatus(200);
        } catch {
            response.status(500).json({error: 'Images is not found'});
        }
    }
}

export interface IImageController {
    getImage(request: Request, response: Response): void;

    getImages(request: Request, response: Response): void;

    uploadImage(request: Request, response: Response): void;

    deleteImage(request: Request, response: Response): void;
}
