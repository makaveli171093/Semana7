import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  MaxLength,
} from 'class-validator';
import { Gender } from '../../generated/prisma/enums.js';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({ example: 'Juan', description: 'Nombre del paciente' })
  @MaxLength(30, { message: 'El nombre no debe exeder los 30 caracteres' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  firstName: string;

  @ApiProperty({ example: 'Paredes', description: 'Apellido del paciente' })
  @MaxLength(30, { message: 'El apellido no debe exeder los 30 caracteres' })
  @IsString({ message: 'El apellido debe ser un texto' })
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  lastName: string;

  @ApiProperty({
    example: 'juan.p@gmail.com',
    description: 'Correo electrónico único',
  })
  @MaxLength(50, { message: 'El nombre no debe exeder los 50 caracteres' })
  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @ApiProperty({
    example: '77712345',
    description: 'Número de teléfono o celular',
  })
  @MaxLength(20, { message: 'El telefono no debe exeder los 20 caracteres' })
  @IsString({ message: 'El apellido debe ser un texto' })
  @IsNotEmpty({ message: 'El telefono es obligatorio' })
  phone: string;

  @ApiProperty({
    enum: Gender,
    example: Gender.MASCULINO,
    description: 'Género',
  })
  @IsEnum(Gender, {
    message: 'El genero solo debe sero MASCULINO, FEMENINO U OTRO',
  })
  @IsNotEmpty({ message: 'El genero es obligatorio' })
  gender: Gender;

  @ApiProperty({
    example: '1995-05-15',
    description: 'Fecha de nacimiento (YYYY-MM-DD)',
  })
  @IsDateString(
    {},
    { message: 'La fecha debe ser valida, formato: (YYYY-MM-DD)' },
  )
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  birthDate: string;
}
