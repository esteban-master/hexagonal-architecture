import { UploadFile } from '../types/UploadFile';

export interface UploadRepository {
  upload(file: Express.Multer.File): Promise<UploadFile>;
}

export const UploadRepository = Symbol('UploadRepository');
