import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsInt,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { Gender } from '../../generated/prisma/enums.js';

export class CreateDoctorDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  firstName: string;

  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @MaxLength(100, { message: 'El apellido no puede exceder 100 caracteres' })
  lastName: string;

  @IsInt({ message: 'El specialtyId debe ser un número entero' })
  @IsPositive({ message: 'El specialtyId debe ser un ID válido mayor a 0' })
  @IsNotEmpty({ message: 'El specialtyId es obligatorio' })
  specialtyId: number;

  @IsOptional()
  @IsInt({ message: 'El userId debe ser un número entero' })
  @IsPositive({ message: 'El userId debe ser un ID válido mayor a 0' })
  userId?: number;
}
