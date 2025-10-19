import { Module } from '@nestjs/common';
import { CvParsedController } from './cv-parsed.controller';
import { CvParsedService } from './cv-parsed.service';

@Module({
  controllers: [CvParsedController],
  providers: [CvParsedService]
})
export class CvParsedModule {}
