import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PasswordReset } from './schemas/password-reset.schema';
import { Model } from 'mongoose';
import * as crypto from 'crypto';

@Injectable()
export class PasswordResetService {
  constructor(
   @InjectModel(PasswordReset.name) private resetModel: Model<PasswordReset>,
  ){}
   
  async createResetToken(email:string){
    const token=crypto.randomBytes(32).toString("hex");
    const expiresIn=parseInt(process.env.RESET_PASS_EXPIRESIN || '10')*1000*60
    const expiresAt=new Date(Date.now()+expiresIn);
    
    const restDoc=this.resetModel.create({
        email,
        token,
        expiresAt,
    });

    return restDoc;
  }

  async validateToken(email:string,token:string){
      const resetDoc = await this.resetModel.findOne({ email, token });

    if (!resetDoc) throw new NotFoundException('Token invalide');
    if (resetDoc.used) throw new UnauthorizedException('Token déjà utilisé');
    if (resetDoc.expiresAt < new Date()) throw new UnauthorizedException('Token expiré');

    return resetDoc;
  }

   async markAsUsed(id:string){
      this.resetModel.findByIdAndUpdate(id,{used:true});

   }

   async findByToken(token: string) {
       return this.resetModel.findOne({ token });
   }

   async deleteByToken(token: string) {
       return this.resetModel.deleteOne({ token });
    }

  }


