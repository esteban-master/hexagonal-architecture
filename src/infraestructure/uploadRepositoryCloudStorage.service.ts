import { Storage } from '@google-cloud/storage';
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { UploadRepository } from 'src/domain/interfaces/uploadRepository.interface';
import { UploadFile } from 'src/domain/types/UploadFile';
import { unlink } from 'node:fs/promises';
import GCPEnvConfig from 'src/config/GCPEnv.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class UploadRepositoryCloudStorage implements UploadRepository {
  private readonly storage: Storage;

  constructor(
    @Inject(GCPEnvConfig.KEY)
    private readonly gcpEnvConfig: ConfigType<typeof GCPEnvConfig>,
  ) {
    this.storage = new Storage({
      projectId: this.gcpEnvConfig.PROJECT_ID,
    });
  }

  async upload(file: Express.Multer.File): Promise<UploadFile> {
    let response = null;
    try {
      const [uploadFile] = await this.storage
        .bucket(this.gcpEnvConfig.BUCKET_NAME)
        .upload(file.path);
      response = {
        id: uploadFile.id,
        name: uploadFile.name,
      };
    } catch (error) {
      throw new BadRequestException(
        `Error al subir el archivo: ${file.originalname}`,
      );
    }

    await unlink(file.path);
    return response;
  }
}
