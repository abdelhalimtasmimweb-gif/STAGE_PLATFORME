import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // ➕ Créer un profil étudiant
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreateStudentDto, @Req() req: any) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.studentsService.create(dto, token);
  }

  // 📌 Mettre à jour un profil étudiant
  @UseGuards(AuthGuard('jwt'))
  @Put()
  async update(@Body() dto: UpdateStudentDto, @Req() req: any) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.studentsService.update(dto, token);
  }

  // ❌ Supprimer son profil étudiant
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async remove(@Req() req: any) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.studentsService.remove(token);
  }

  // 📋 Obtenir tous les profils étudiants
  @Get()
  async findAll() {
    return this.studentsService.findAll();
  }

  // 🔍 Chercher un profil par ID
  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.studentsService.findById(id);
  }

  // 🔍 Chercher par userId
  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: number) {
    return this.studentsService.findByUserId(userId);
  }

  // 🔍 Chercher par nom d’utilisateur
  @Get('name/:name')
  async findByUserName(@Param('name') name: string) {
    return this.studentsService.findByUserName(name);
  }
}
