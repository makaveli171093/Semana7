// src/appointment/appointment.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateAppointmentDto } from './DTO/create-appointment.dto.js';

@ApiTags('Citas')
@ApiBearerAuth('JWT-auth')
@Controller('appointment')
@Roles('RECEPCIONISTA')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @ApiOperation({ summary: 'Registrar una nueva cita' })
  @ApiResponse({ status: 201, description: 'Cita programada correctamente' })
  @ApiResponse({ status: 400, description: 'Datos del formulario inválidos' })
  @ApiResponse({ status: 404, description: 'El paciente asociado no existe' })
  @Post()
  create(@Body() dto: CreateAppointmentDto) {
    return this.appointmentService.create(dto);
  }

  @ApiOperation({
    summary: 'Obtener la lista de todas las citas con sus pacientes',
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de citas obtenido exitosamente',
  })
  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }
}
