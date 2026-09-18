import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { DoctorService } from './doctor.service.js';
import { CreateDoctorDto } from './DTO/create.doctor.dto.js';
import { UpdateDoctorDto } from './DTO/update.doctor.dto.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('doctor')
@Roles('RECEPCIONISTA')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const doctor = await this.doctorService.findOne(+id);
    if (!doctor) {
      throw new NotFoundException(`Médico con id ${id} no encontrado`);
    }
    return doctor;
  }

  @Post()
  create(@Body() dto: CreateDoctorDto) {
    return this.doctorService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDoctorDto) {
    return this.doctorService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(Number(id));
  }
}
