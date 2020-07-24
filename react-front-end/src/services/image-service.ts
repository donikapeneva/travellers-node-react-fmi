import { BACKEND_URL } from '../config';
import Axios from 'axios';
import { IImage } from '../data/i-image';
import { FileReaderUtility } from '../utils/file-reader';
import { testImage } from '../components/shared/test-image';

class ImageService implements IImageService {
  public async upload(imagesData: Iterable<File>, adventureId: string): Promise<string> {
    for (const imageData of imagesData) {
      const imageBase64 = await FileReaderUtility.readFileAsync(imageData);

      const image: any = {
        title: imageData.name,
        source: imageBase64,
      };

      const response = await Axios.post(`${BACKEND_URL}/images/${adventureId}`, image);

      return response.data.imageId;
    }
  }

  public async delete(imageId: string): Promise<void> {
    await Axios.delete(`${BACKEND_URL}/images/${imageId}`);
  }

  public async getByTripId(tripId: string): Promise<IImage[]> {
     const response = await Axios.get(`${BACKEND_URL}/images/${tripId}`);

     return response.data;

  }

  public async getById(imageId: string): Promise<IImage> {
    const response = await Axios.get(`${BACKEND_URL}/images/${imageId}`);

    return response.data;
  }

  public async getCoverByTripId(tripId: string): Promise<IImage> {
    const response = await Axios.get(`${BACKEND_URL}/images/${tripId}/cover`);

    return response.data;

  }
}

export interface IImageService {
  upload(imagesData: Iterable<File>, tripId: string): Promise<string>;
  getByTripId(tripId: string): Promise<IImage[]>;
  getById(imageId: string): Promise<IImage>;
  delete(imageId: string): Promise<void>;
  getCoverByTripId(tripId: string) : Promise<IImage>;
}

export const imageService = new ImageService();
