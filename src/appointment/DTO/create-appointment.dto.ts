import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({
    example: '2026-09-20T14:30:00.000Z',
    description: 'Fecha y hora de la cita',
  })
  @IsDateString({}, { message: 'La fecha debe tener el formato válido' })
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  dateTime: string;

  @ApiProperty({ example: 1, description: 'ID del paciente asociado' })
  @IsInt({ message: 'El ID del paciente debe ser un entero' })
  @IsPositive({ message: 'El ID del paciente debe ser válido' })
  @IsNotEmpty({ message: 'El ID del paciente es obligatorio' })
  patientId: number;

  @ApiProperty({ example: 1, description: 'ID del médico asignado' })
  @IsInt({ message: 'El ID del médico debe ser un entero' })
  @IsPositive({ message: 'El ID del médico debe ser válido' })
  @IsNotEmpty({ message: 'El ID del médico es obligatorio' })
  doctorId: number;

  @ApiPropertyOptional({
    example: 'Consulta general y chequeo preventivo',
    description: 'Motivo de la cita médica',
  })
  @IsOptional()
  @IsString({ message: 'El motivo debe ser una cadena de texto' })
  reason?: string;
}
