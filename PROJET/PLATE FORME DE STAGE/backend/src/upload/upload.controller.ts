import { Controller, Post, Body, Get, Query, Delete } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('files')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  async uploadFile(@Body('filePath') filePath: string) {
    return this.uploadService.uploadPrivateFile(filePath);
  }

  @Get('url')
  async getFileUrl(@Query('publicId') publicId: string) {
    return this.uploadService.getPrivateUrl(publicId);
  }

  @Delete()
  async deleteFile(@Query('publicId') publicId: string) {
    return this.uploadService.deleteFile(publicId);
  }
}
