import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PasswordResetService } from 'src/password-reset/password-reset.service';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { PasswordResetModule } from 'src/password-reset/password-reset.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    PassportModule,
    EmailModule,
    PasswordResetModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY, // 🔑 à mettre dans .env
      signOptions: { expiresIn: '2h' }, // durée de validité du token
    }),
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService,JwtStrategy],
  
})
export class AuthModule {}
