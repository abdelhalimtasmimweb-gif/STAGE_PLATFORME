import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(User) private userRepository: Repository<User>,

  )
  {}

 async findByEmail(email:string):Promise<User | null>{
    return this.userRepo.findOne({where:{email}});
 }

 async createUser(email:string,password:string,fullName:string){

   const salt=await bcrypt.genSalt(12);
   const hash=await bcrypt.hash(password,salt);
   
   const user=this.userRepo.create({
    email,
    password:hash,
    name:fullName,
    role:'user'
   })   
   
  return this.userRepo.save(user);

  }
   
  
          // 🔑 Ajout de la fonction updatePassword
    async updatePassword(userId: string, hashedPassword: string): Promise<User> {
      const user = await this.userRepository.findOne( {where : {id:parseInt(userId)}});
      if (!user) {
        throw new NotFoundException("Utilisateur non trouvé");
      }
      user.password = hashedPassword;
      return this.userRepository.save(user);
    }
  
    


}
