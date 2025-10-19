import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { UploadModule } from 'src/upload/upload.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './Schemas/company.shema';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [UploadModule,EmailModule,
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
