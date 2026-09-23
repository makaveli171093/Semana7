import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './DTO/register.dto.js';
import { LoginDto } from './DTO/login.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    try {
      const passwordHash = await bcrypt.hash(dto.password, 10);
      return this.prisma.user.create({
        data: {
          email: dto.email,
          password: passwordHash,
          role: dto.role as any,
        },
        select: {
          id: true,
          email: true,
          role: true,
        },
      });
    } catch (error) {
      console.error('ERROR EN REGISTER:', error);
      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' },
    );

    return { token };
  }
}
