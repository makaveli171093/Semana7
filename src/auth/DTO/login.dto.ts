import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  email: string;

  @IsString({ message: 'La contraseña es obligatoria' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  password: string;
}
