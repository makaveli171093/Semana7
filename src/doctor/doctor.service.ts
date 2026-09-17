import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDoctorDto } from './DTO/create.doctor.dto.js';
import { UpdateDoctorDto } from './DTO/update.doctor.dto.js';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.doctor.findMany({
      include: {
        specialty: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.doctor.findUnique({
      where: { id },
      include: {
        specialty: true,
      },
    });
  }

  async create(dto: CreateDoctorDto) {
    try {
      return await this.prisma.doctor.create({ data: dto });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException(
          `La especialidad con id ${dto.specialtyId} no existe`,
        );
      }
      throw error;
    }
  }

  update(id: number, dto: UpdateDoctorDto) {
    return this.prisma.doctor.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.doctor.delete({ where: { id } });
  }
}
