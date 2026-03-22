import { Controller, Post, Get, Body, Res } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import * as express from 'express';
import { AuthService } from './auth.service.js';
import { LoginDto, SetupDto } from './dto/login.dto.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Admin login' })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const { token } = await this.authService.login(dto.email, dto.password);

    // Set cookie for backward compatibility
    res.cookie('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    return { success: true, token };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Admin logout' })
  async logout(@Res({ passthrough: true }) res: express.Response) {
    res.clearCookie('admin_session');
    res.clearCookie('hub_session');
    return { success: true };
  }

  @Get('logout')
  @ApiOperation({ summary: 'Admin logout (GET)' })
  async logoutGet(@Res({ passthrough: true }) res: express.Response) {
    res.clearCookie('admin_session');
    res.clearCookie('hub_session');
    return { success: true };
  }

  @Post('setup')
  @ApiOperation({ summary: 'Create initial admin user (only works if no admin exists)' })
  async setup(@Body() dto: SetupDto) {
    const admin = await this.authService.setup(
      dto.email,
      dto.password,
      dto.name,
    );
    return { success: true, message: 'Admin user created', admin };
  }

  @Get('setup')
  @ApiOperation({ summary: 'Check if setup is required' })
  async checkSetup() {
    const setupRequired = await this.authService.isSetupRequired();
    return { setupRequired };
  }
}
