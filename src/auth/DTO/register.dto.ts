import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'recepcion@mail.com',
    description: 'Correo en formato correcto',
  })
  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Contraseña segura',
  })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;

  @ApiProperty({
    example: 'RECEPCIONISTA',
    description: 'MEDICO, RECEPCIONISTA O GERENCIA',
  })
  @IsString({ message: 'El rol debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  role: string;
}
