import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

@Module({

  imports: [TypeOrmModule.forFeature([User])], 
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
