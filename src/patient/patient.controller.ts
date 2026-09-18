import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service.js';
import { CreatePatientDto } from './DTO/create.patient.DTO.js';
import { UpdatePatientDTO } from './DTO/update.patient.DTO.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';

@Controller('patient')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('RECEPCIONISTA')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const patient = await this.patientService.findOne(+id);
    if (!patient) {
      throw new NotFoundException(`Paciente con id: ${id} no encontrado`);
    }
    return patient;
  }

  @Post()
  create(@Body() dto: CreatePatientDto) {
    return this.patientService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePatientDTO) {
    return this.patientService.update(Number(id), dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.patientService.remove(Number(id));
  }
}
