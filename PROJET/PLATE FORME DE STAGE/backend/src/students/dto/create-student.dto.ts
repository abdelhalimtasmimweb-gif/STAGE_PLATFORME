
import { IsString, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  firstName: string;

  @IsString()
  familyName: string;

  @IsNumber()
  age: number;

  @IsString()
  cv: string;

  @IsNumber()
  tel: number;

  @IsUrl()
  linkdin: string;

  @IsString()
  etablissement: string;

  @IsString()
  pays:string;

  @IsString()
  ville:string;

  @IsString()
  parcours:string;

  @IsString()
  description: string;

  @IsOptional()
  @IsUrl()
  portfolio?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;  // 🔹 lien cloud de l'image

  @IsNumber()
  userId: number;  // lien avec l’utilisateur
}

