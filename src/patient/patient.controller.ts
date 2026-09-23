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
import { PatientService } from './patient.service.js';
import { CreatePatientDto } from './DTO/create.patient.DTO.js';
import { UpdatePatientDTO } from './DTO/update.patient.DTO.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Pacientes')
@ApiBearerAuth('JWT-auth')
@Controller('patient')
@Roles('RECEPCIONISTA')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @ApiOperation({ summary: 'Obtener todos los pacientes' })
  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un paciente por su ID' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const patient = await this.patientService.findOne(+id);
    if (!patient) {
      throw new NotFoundException(`Paciente con id: ${id} no encontrado`);
    }
    return patient;
  }

  @ApiOperation({ summary: 'Crear un nuevo paciente' })
  @Post()
  create(@Body() dto: CreatePatientDto) {
    return this.patientService.create(dto);
  }

  @ApiOperation({ summary: 'Actualizar datos de un paciente existente' })
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePatientDTO) {
    return this.patientService.update(Number(id), dto);
  }

  @ApiOperation({ summary: 'Eliminar un paciente por su ID' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.patientService.remove(Number(id));
  }
}
