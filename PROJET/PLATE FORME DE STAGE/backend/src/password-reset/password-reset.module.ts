import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PasswordReset, PasswordResetSchema } from './schemas/password-reset.schema';
import { AuthService } from 'src/auth/auth.service';
import { PasswordResetService } from './password-reset.service';
import { AuthController } from 'src/auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports:[MongooseModule.forFeature([
      { name: PasswordReset.name, schema: PasswordResetSchema }
     ])],
    providers:[PasswordResetService],
    exports:[PasswordResetService],
})
export class PasswordResetModule {}
