// src/appointment/appointment.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Citas')
@ApiBearerAuth('JWT-auth')
@Controller('appointment')
@Roles('RECEPCIONISTA')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @ApiOperation({ summary: 'Registrar una nueva cita' })
  @Post()
  create(@Body() body: any) {
    return this.appointmentService.create(body);
  }

  @ApiOperation({
    summary: 'Obtener la lista de todas las citas con sus pacientes',
  })
  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }
}
