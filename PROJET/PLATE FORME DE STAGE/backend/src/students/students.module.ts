import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { StudentProfile } from './entities/student.entity';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User,StudentProfile]),
UsersModule,
AuthModule,
ConfigModule.forRoot({ isGlobal: true }),
JwtModule.register({})],

  providers: [StudentsService],
  controllers: [StudentsController],
  exports:[StudentsService],
})
export class StudentsModule {}
