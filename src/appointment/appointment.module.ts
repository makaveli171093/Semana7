import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller.js';
import { AppointmentService } from './appointment.service.js';
import { PatientModule } from '../patient/patient.module.js';

@Module({
  imports: [PatientModule],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {}
