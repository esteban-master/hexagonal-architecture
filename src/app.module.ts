import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './application/upload.service';
import { UploadRepository } from './domain/interfaces/uploadRepository.interface';
import { UploadRepositoryCloudStorage } from './infraestructure/uploadRepositoryCloudStorage.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import GCPEnvConfig from './config/GCPEnv.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [GCPEnvConfig],
      validationSchema: Joi.object({
        PROJECT_ID: Joi.string().required(),
        BUCKET_NAME: Joi.string().required(),
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [
    UploadService,
    {
      provide: UploadRepository,
      useClass: UploadRepositoryCloudStorage,
    },
  ],
})
export class AppModule {}
