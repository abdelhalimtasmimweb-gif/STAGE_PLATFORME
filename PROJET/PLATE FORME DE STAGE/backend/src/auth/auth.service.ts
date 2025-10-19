import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { error } from 'console';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'crypto';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';
import crypto from 'crypto';
import { PasswordResetService } from 'src/password-reset/password-reset.service';
import { EmailService } from 'src/email/email.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(private readonly usersService :UsersService,
        private readonly jwtService:JwtService,
        private readonly passwordResetService:PasswordResetService,
        private readonly emailService:EmailService,
       // @InjectRepository(User) private userRepository: Repository<User>,
        
    ){}

    async register(registerDto:RegisterDto):Promise<{ user: User, accessToken: string }>{

        const existingUser=this.usersService.findByEmail(registerDto.email);
        if(await existingUser){
            throw new ConflictException('Email existe deja');
        }
        
        const {email,fullName,password}=registerDto;
        const user=await this.usersService.createUser(email,password,fullName);
        
        const playload={email:user.email,fullName:user.name,role:user.role}

        const accessToken=this.jwtService.sign(playload);
        
        return {user,accessToken};

    }



    async login(logindto:LoginDto):Promise<{user: User; accessToken: string}>{

      console.log('SECRET_KEY =', process.env.SECRET_KEY);

      const {email,password}=logindto;

      const user=await this.usersService.findByEmail(email);
      if(!user){
           throw new UnauthorizedException('Email ou mot de passe invalide ');  
      }

      const isPasswordValide= await bcrypt.compare(password,user.password);
      if(!isPasswordValide){
        throw new UnauthorizedException(' Email ou mot de passe invalide ');
      } 
      
      const payload={sub:user.id,email:user.email,role:user.role}

      const accessToken=this.jwtService.sign(payload);
      
      return {user,accessToken}
    }

    // async forgotPassword(email:string){
    //    const user=await this.usersService.findByEmail(email);
    //    if(!user){
    //     throw new NotFoundException('Utilisateur non trouvé');
    //    }
    //    const tokenKey=crypto.randomBytes(32).toString("hex")
       
    //    const playload={email:user.email};
    //    const resetToken=this.jwtService.sign(playload,
    //     {secret:tokenKey,
    //      expiresIn:'10m',
    //     }
    //    );


      async sendPasswordReset(email:string){
         
        const user= await this.usersService.findByEmail(email);
        if(!user){
          throw new NotFoundException("Utilisateur introuvable");
        }
         const {token,expiresAt}=await this.passwordResetService.createResetToken(user.email);
        
          const resetLink= `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
          
          const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Réinitialisation de mot de passe</title>
</head>
<body style="font-family: Arial, sans-serif; background-color:#f9f9f9; margin:0; padding:20px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table style="max-width:600px; background:#ffffff; border-radius:8px; padding:30px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="text-align:center;">
              <h2 style="color:#333;">Réinitialisation de votre mot de passe</h2>
              <p style="color:#555; font-size:15px;">
                Vous avez demandé à réinitialiser votre mot de passe.  
                Cliquez sur le bouton ci-dessous pour continuer :
              </p>
              <a href="${resetLink}" 
                 style="display:inline-block; margin-top:20px; padding:12px 20px; 
                        background-color:#007bff; color:#ffffff; text-decoration:none; 
                        font-weight:bold; border-radius:6px;">
                Réinitialiser le mot de passe
              </a>
              <p style="margin-top:30px; font-size:13px; color:#888;">
                Ce lien expirera dans <strong>10 minutes</strong>.  
                Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
         
          const subject=`réinitialisation de mot de passe de ${process.env.PLATEFORME_NAME}`;
          this.emailService.sendMail(email,subject,htmlContent);

        }


  
   async resetPassword(token: string, newPassword: string) {
    // 1. Trouver le token via PasswordResetService
    const resetDoc = await this.passwordResetService.findByToken(token);
    if (!resetDoc) throw new NotFoundException("Token invalide");

    // 2. Valider le token (expiration, usage, etc.)
    await this.passwordResetService.validateToken(resetDoc.email, token);

    // 3. Trouver l’utilisateur lié
    const user = await this.usersService.findByEmail(resetDoc.email);
    if (!user) throw new NotFoundException("Utilisateur non trouvé");

    // 4. Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 5. Mettre à jour le mot de passe de l’utilisateur
    await this.usersService.updatePassword(user.id.toString(), hashedPassword);

    // 6. Marquer le token comme utilisé
    await this.passwordResetService.markAsUsed(resetDoc.id.toString());

    return { message: "Mot de passe réinitialisé avec succès" };
  }     


}
