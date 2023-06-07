import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UploadService } from './application/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (_, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}`;
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const uploadFile = await this.uploadService.upload(file);
    return res.status(HttpStatus.CREATED).json(uploadFile);
  }
}
