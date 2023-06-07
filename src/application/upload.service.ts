import { Inject, Injectable } from '@nestjs/common';
import { UploadRepository } from 'src/domain/interfaces/uploadRepository.interface';
import { UploadFile } from 'src/domain/types/UploadFile';

@Injectable()
export class UploadService {
  constructor(
    @Inject(UploadRepository)
    private readonly uploadRepository: UploadRepository,
  ) {}

  async upload(file: Express.Multer.File): Promise<UploadFile> {
    return await this.uploadRepository.upload(file);
  }
}
