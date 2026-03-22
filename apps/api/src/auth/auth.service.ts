import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { DatabaseService } from '../database/database.service.js';

export interface AdminPayload {
  id: string;
  email: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.db.adminUser.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload: AdminPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = await this.jwt.signAsync(payload);
    return { token };
  }

  async setup(
    email: string,
    password: string,
    name: string,
  ): Promise<{ id: string; email: string; name: string }> {
    const existing = await this.db.adminUser.findFirst();
    if (existing) {
      throw new BadRequestException('Admin user already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = await this.db.adminUser.create({
      data: { email, password: hashedPassword, name },
    });

    return { id: admin.id, email: admin.email, name: admin.name };
  }

  async isSetupRequired(): Promise<boolean> {
    const existing = await this.db.adminUser.findFirst();
    return !existing;
  }

  async validateToken(token: string): Promise<AdminPayload | null> {
    try {
      return await this.jwt.verifyAsync<AdminPayload>(token);
    } catch {
      return null;
    }
  }
}
