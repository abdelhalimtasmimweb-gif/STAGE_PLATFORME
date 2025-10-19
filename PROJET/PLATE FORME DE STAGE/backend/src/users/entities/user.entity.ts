import { Prop } from "@nestjs/mongoose";
import { StudentProfile } from "src/students/entities/student.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";



   @Entity('users')
export class User{
 
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    name:string;

    @Column({unique: true})
    email:string;
   
    @Column()
    password: string;

    @Column({default:'user'})
     role:string;

    @Column({nullable:true})
    portfolio?:string;
   
    
    // @OneToOne(() => StudentProfile, (s) => s.user)
    // studentProfile?: StudentProfile;
    
     @OneToMany(() => StudentProfile, (profile) => profile.user)
     studentProfile: StudentProfile[];

}

 