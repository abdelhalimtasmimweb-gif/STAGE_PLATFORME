import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { CompaniesModule } from './companies/companies.module';
import { OffresModule } from './offres/offres.module';
import { NlpModule } from './nlp/nlp.module';
import { ApplicationsService } from './applications/applications.service';
import { ApplicationsModule } from './applications/applications.module';
import { CvParsedModule } from './cv-parsed/cv-parsed.module';
import { PortfolioService } from './portfolio/portfolio.service';
import { PortfolioController } from './portfolio/portfolio.controller';
import { PortfolioModule } from './portfolio/portfolio.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from './email/email.module';
import { PasswordResetService } from './password-reset/password-reset.service';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config';
import { UploadService } from './upload/upload.service';
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',      // ou l'IP de ton serveur MySQL
      port: 3306,
      username: 'root',       // ton user MySQL
      password: '',   // ton mot de passe
      database: 'internship_db',     // nom de ta base de données
      autoLoadEntities: true, // charge automatiquement les entités
      synchronize: true,      // ⚠️ crée/modifie la DB automatiquement (à désactiver en prod)
    }),

    MongooseModule.forRoot('mongodb://localhost:27017/stage_db'),
    ConfigModule.forRoot({
      isGlobal: true, // optionnel : rend ConfigModule disponible dans tout le projet
    }),

    StudentsModule, CompaniesModule, OffresModule, NlpModule, ApplicationsModule, CvParsedModule, PortfolioModule, AuthModule, UsersModule, EmailModule, PasswordResetModule, UploadModule],
  controllers: [AppController, PortfolioController, UploadController],
  providers: [AppService, UploadService],
})
export class AppModule {

  constructor(){
    console.log(process.env.SECRET_KEY);
     

  }

}
