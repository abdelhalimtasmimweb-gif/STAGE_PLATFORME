import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentProfile } from './entities/student.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { UpdateStudentDto } from './dto/update-student.dto';
import { assign } from 'nodemailer/lib/shared';

@Injectable()
export class StudentsService {
    
    constructor(
        @InjectRepository(StudentProfile)
        private studentRepository:Repository<StudentProfile>,

        @InjectRepository(User)
        private userRepository:Repository<User>,


        private readonly jwtStrategy:JwtStrategy,
    ){}


    async create(dto:CreateStudentDto,token:string):Promise<StudentProfile>{
        
        const payload:any=this.jwtStrategy.extractPayload(token);
        const user=await this.userRepository.findOneBy({id:Number(payload.sub)});
        if(!user){
            throw new NotFoundException('Utilisateur non trouvé');
        }

          const existingProfile = await this.studentRepository.findOne({
         where: { userId: user.id },
         });

        if (existingProfile) {
              throw new ConflictException('Cet utilisateur a déjà un profil étudiant.');
           }





        const profile:any = this.studentRepository.create({...dto,userId: user.id,});

        return await this.studentRepository.save(profile);
    }


    async update(dto:UpdateStudentDto,token:string):Promise<StudentProfile>{
        const payload =this.jwtStrategy.extractPayload(token);
     
        const user= await this.userRepository.findOneBy({id:Number(payload.sub)});
        if(!user){
            throw new NotFoundException('Utilisateur non trouvé')
        }
        const profile =await this.studentRepository.findOneBy({userId:Number(payload.sub)});
        if(!profile){
            throw new NotFoundException('Utilisateur non trouvé');
        }

        Object.assign(profile,dto);

        return await this.studentRepository.save(profile);
    }

    async remove(token:string):Promise<{message:string}>{
        const payload=this.jwtStrategy.extractPayload(token);

        const user= await this.userRepository.findOneBy({id:Number(payload.sub)});
        if(!user){
            throw new NotFoundException('Utilisateur non trouvé');
        }

        const profile=await this.studentRepository.findOneBy({userId:user.id})
        if(!profile){
            throw new NotFoundException("Utilisateur non trouvé");
        }

        await this.studentRepository.remove(profile);

         return { message: 'Profil étudiant supprimé avec succès' };
    }

    async findAll(): Promise<StudentProfile[]> {
    return await this.studentRepository.find();
     }

 async findById(id: number): Promise<StudentProfile> {
   const profile = await this.studentRepository.findOneBy({ id });
   if (!profile) {
     throw new NotFoundException(`Profil étudiant avec id ${id} non trouvé`);
   }
    return profile;
  }
    
  async findByUserId(userId: number): Promise<StudentProfile> {
      const profile = await this.studentRepository.findOneBy({ userId });
      if (!profile) {
     throw new NotFoundException(`Profil pour l'utilisateur ${userId} non trouvé`);
   }
   return profile;
  }

   async findByUserName(name: string): Promise<StudentProfile[]>{
        
      const profile=await this.studentRepository.find({
        relations:["user"],
        where:{user:{name}},
      })
      
     if(!profile.length){
        throw new NotFoundException(`Aucun profil trouvé pour l'utilisateur nommé "${name}"`);

     }
      return profile;
   } 

}
