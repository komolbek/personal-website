import {
  Controller,
  Post,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard.js';
import { TranslateService } from './translate.service.js';

@ApiTags('Translate')
@Controller('translate')
@UseGuards(AuthGuard)
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @Post()
  @ApiOperation({ summary: 'Translate texts to en and uz (admin)' })
  async translate(
    @Body() body: { texts: string[]; from?: string },
  ) {
    const { texts, from = 'ru' } = body;

    if (!Array.isArray(texts) || texts.length === 0) {
      throw new BadRequestException('texts array required');
    }

    const enTranslations = await Promise.all(
      texts.map((t: string) => this.translateService.translate(t, from, 'en')),
    );
    const uzTranslations = await Promise.all(
      texts.map((t: string) => this.translateService.translate(t, from, 'uz')),
    );

    return { en: enTranslations, uz: uzTranslations };
  }
}
