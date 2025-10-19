import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, IsBoolean, IsEmail, IsUrl } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUrl()
  logo?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  foundedYear?: number;

  @IsOptional()
  @IsNumber()
  employees?: number;

  // Localisation
  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  // Informations métier
  @IsOptional()
  @IsString()
  industry?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  specialties?: string[];

  @IsOptional()
  @IsString()
  companyType?: string; // Startup, PME...

  // Contacts
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  // Réseaux sociaux
  @IsOptional()
  @IsUrl()
  linkedin?: string;

  @IsOptional()
  @IsUrl()
  twitter?: string;

  // Offres
  @IsOptional()
  @IsNumber()
  availableInternships?: number;

  @IsOptional()
  @IsNumber()
  jobOffers?: number;

  // Partenariats
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  partnerships?: string[];

  // Autres
  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsBoolean()
  isHiring?: boolean;
}
