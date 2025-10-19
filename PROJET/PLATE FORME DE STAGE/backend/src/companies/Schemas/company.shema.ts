import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PrimaryGeneratedColumn } from 'typeorm';

export type CompanyDocument = Company & Document;

@Schema({ timestamps: true })
export class Company {

  @Prop({ required: true })
  name: string;

  @Prop()
  logo: string;

  @Prop()
  description: string;

  @Prop()
  foundedYear: number;

  @Prop()
  employees: number;

  // Localisation
  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop()
  address: string;

  @Prop()
  postalCode: string;

  @Prop()
  googleMapsLink: string;


  // Informations métier
  @Prop()
  industry: string;

  @Prop([String])
  specialties: string[];

  @Prop()
  companyType: string; // Startup, PME, Multinationale...

  // Contacts
  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  website: string;

  // Réseaux sociaux
  @Prop()
  linkedin: string;

  @Prop()
  twitter: string;

  // Offres
  @Prop({ default: 0 })
  availableInternships: number;

  @Prop({ default: 0 })
  jobOffers: number;

  // Partenariats
  @Prop([String])
  partnerships: string[];

  // Autres
  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: false })
  isHiring: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
