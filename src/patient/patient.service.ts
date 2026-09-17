import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePatientDto } from './DTO/create.patient.DTO.js';
import { UpdatePatientDTO } from './DTO/update.patient.DTO.js';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.patient.findMany();
  }

  findOne(id: number) {
    return this.prisma.patient.findUnique({ where: { id } });
  }

  create(dto: CreatePatientDto) {
    const birthDate = new Date(dto.birthDate);
    if (birthDate > new Date()) {
      throw new BadRequestException(
        'La fecha de nacimiento no puede ser futura',
      );
    }
    return this.prisma.patient.create({ data: { ...dto, birthDate } });
  }

  update(id: number, dto: UpdatePatientDTO) {
    if (dto.birthDate) {
      const birthDate = new Date(dto.birthDate);
      if (birthDate > new Date()) {
        throw new BadRequestException(
          'La fecha de nacimiento no puede ser futura',
        );
      }
    }
    return this.prisma.patient.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.birthDate && { birthDate: new Date(dto.birthDate) }),
      },
    });
  }

  remove(id: number) {
    return this.prisma.patient.delete({ where: { id } });
  }
}
