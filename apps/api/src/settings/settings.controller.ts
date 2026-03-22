import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import * as express from 'express';
import { AuthGuard } from '../auth/auth.guard.js';
import { SettingsService } from './settings.service.js';

@ApiTags('Settings')
@Controller('settings')
@UseGuards(AuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all settings' })
  findAll() {
    return this.settingsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Save settings (upsert batch)' })
  save(@Body() body: { settings: { key: string; value: string; type?: string }[] }) {
    return this.settingsService.save(body.settings);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update admin profile' })
  updateProfile(
    @Req() req: express.Request,
    @Body() data: { name?: string; email?: string },
  ) {
    const admin = (req as any).admin;
    return this.settingsService.updateProfile(admin.email, data);
  }

  @Put('password')
  @ApiOperation({ summary: 'Change admin password' })
  changePassword(
    @Req() req: express.Request,
    @Body() data: { currentPassword: string; newPassword: string },
  ) {
    const admin = (req as any).admin;
    return this.settingsService.changePassword(
      admin.email,
      data.currentPassword,
      data.newPassword,
    );
  }
}
