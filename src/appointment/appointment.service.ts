// src/appointment/appointment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { PatientService } from '../patient/patient.service.js';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly patientService: PatientService,
  ) {}

  async create(data: {
    scheduledAt: string;
    patientId: number;
    doctorId: number;
    reason?: string;
    status?: any;
  }) {
    const patient = await this.patientService.findOne(Number(data.patientId));
    if (!patient) {
      throw new NotFoundException('El paciente no existe');
    }

    return this.prisma.appointment.create({
      data: {
        scheduledAt: new Date(data.scheduledAt),
        patientId: Number(data.patientId),
        doctorId: Number(data.doctorId),
        reason: data.reason,
        status: data.status ?? undefined,
      },
    });
  }

  findAll() {
    return this.prisma.appointment.findMany({
      include: {
        patient: true,
      },
    });
  }
}
