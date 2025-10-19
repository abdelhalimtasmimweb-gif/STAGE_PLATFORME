import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

// students.entity.ts
@Entity('student_profiles')
export class StudentProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName:string;

  
  @Column()
  familyName:string;

  @Column()
  age:number;

  @Column()
  cv: string;

  @Column()
  tel:number;

  @Column()
  linkdin:string;

  @Column()
  description:string;
  
  @Column()
  pays:string;

  @Column()
  ville:string;

  @Column()
  etablissement:string;

  @Column()
  parcours:string;

  @Column()
  portfolio: string;

  @Column()
  imageUrl: string;
 

  // @ManyToOne(() => User, (u) => u.studentProfile)
  // @JoinColumn()
  // user: User;
    @ManyToOne(() => User, (user) => user.studentProfile, { eager: true })
    @JoinColumn({ name: 'userId' })
    user: User;

  @Column()
  userId: number;
}