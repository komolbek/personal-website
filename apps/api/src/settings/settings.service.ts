import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { DatabaseService } from '../database/database.service.js';

@Injectable()
export class SettingsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.siteSetting.findMany({
      orderBy: { key: 'asc' },
    });
  }

  async get(key: string) {
    const setting = await this.db.siteSetting.findUnique({ where: { key } });
    if (!setting) throw new NotFoundException(`Setting "${key}" not found`);
    return setting;
  }

  async save(settings: { key: string; value: string; type?: string }[]) {
    const results = await Promise.all(
      settings.map((s) =>
        this.db.siteSetting.upsert({
          where: { key: s.key },
          update: { value: s.value, type: s.type ?? 'string' },
          create: { key: s.key, value: s.value, type: s.type ?? 'string' },
        }),
      ),
    );
    return results;
  }

  async updateProfile(email: string, data: { name?: string; email?: string }) {
    const user = await this.db.adminUser.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('Admin user not found');
    return this.db.adminUser.update({
      where: { email },
      data,
      select: { id: true, email: true, name: true, updatedAt: true },
    });
  }

  async changePassword(
    email: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.db.adminUser.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('Admin user not found');

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await this.db.adminUser.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return { success: true, message: 'Password updated successfully' };
  }
}
