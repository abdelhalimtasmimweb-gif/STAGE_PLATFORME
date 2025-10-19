import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './Schemas/company.shema';
import { EmailService } from 'src/email/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UploadService } from 'src/upload/upload.service';
import { url } from 'inspector';

@Injectable()
export class CompaniesService {
    
    constructor(
        @InjectModel(Company.name)
        private readonly companyModel:Model<Company>,
        private readonly emailService:EmailService,
        private readonly uploadService:UploadService,
    ){}

    
 // ➕ Créer une nouvelle entreprise
  async create(dto: CreateCompanyDto): Promise<Company> {
    if(dto.logo){

     // Upload du logo et récupération de l'URL
    const logoUrl=await this.uploadService.uploadPrivateFile(dto.logo);
    dto.logo = logoUrl.secure_url;

    }

    const newCompany = new this.companyModel(dto);
    return await newCompany.save();
  }

  // 📋 Récupérer toutes les entreprises
  async findAll(): Promise<Company[]> {
    return await this.companyModel.find().exec();
  }

  // 🔎 Récupérer une entreprise par ID
  async findOne(id: string): Promise<Company> {
    const company = await this.companyModel.findById(id).exec();
    if (!company) {
      throw new NotFoundException(`Entreprise avec id ${id} non trouvée`);
    }
    return company;
  }

  // 🔎 Récupérer une entreprise par nom
  async findOneByName(name: string): Promise<Company> {
    const company = await this.companyModel.findOne({ name }).exec();
    if (!company) {
      throw new NotFoundException(`Entreprise avec le nom ${name} non trouvée`);
    }
    return company;
  }

  // ✏️ Mettre à jour une entreprise
  async update(id: string, dto: UpdateCompanyDto): Promise<Company> {
    if (dto.logo) {
        const uploadResult = await this.uploadService.uploadPrivateFile(dto.logo);
        dto.logo = uploadResult.secure_url; 
    }

    const updatedCompany = await this.companyModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!updatedCompany) {
      throw new NotFoundException(`Entreprise avec id ${id} non trouvée`);
    }

    return updatedCompany;
  }

  // ❌ Supprimer une entreprise
  async remove(id: string): Promise<void> {
    const result = await this.companyModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Entreprise avec id ${id} non trouvée`);
    }
  }
}
