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

@Controller('patient')
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
  create(@Body() body: any) {
    return this.patientService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.patientService.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
