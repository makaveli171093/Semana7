// src/appointment/appointment.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('appointment')
@Roles('RECEPCIONISTA')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() body: any) {
    return this.appointmentService.create(body);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }
}
