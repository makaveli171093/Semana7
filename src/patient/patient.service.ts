import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.patient.findMany();
  }

  findOne(id: number) {
    return this.prisma.patient.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.patient.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.patient.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.patient.delete({ where: { id } });
  }
}
