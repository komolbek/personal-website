import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '../auth/auth.guard.js';
import { ContactsService } from './contacts.service.js';
import { TelegramService } from '../telegram/telegram.service.js';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  private readonly logger = new Logger(ContactsController.name);

  constructor(
    private readonly contactsService: ContactsService,
    private readonly telegramService: TelegramService,
    private readonly config: ConfigService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Submit contact form (public)' })
  async create(
    @Body()
    data: {
      name: string;
      email?: string;
      phone: string;
      company?: string;
      service?: string;
      budget?: string;
      message: string;
    },
  ) {
    const submission = await this.contactsService.create(data);

    // Send Telegram notification to admin
    try {
      const bot = this.telegramService.getBot();
      const adminChatId = this.config.get<string>('TELEGRAM_ADMIN_CHAT_ID');
      if (bot && adminChatId) {
        const message = [
          'New contact form submission:',
          '',
          `Name: ${data.name}`,
          data.email ? `Email: ${data.email}` : null,
          `Phone: ${data.phone}`,
          data.company ? `Company: ${data.company}` : null,
          data.service ? `Service: ${data.service}` : null,
          data.budget ? `Budget: ${data.budget}` : null,
          '',
          `Message:\n${data.message}`,
        ]
          .filter(Boolean)
          .join('\n');
        await bot.api.sendMessage(adminChatId, message);
      }
    } catch (error) {
      this.logger.error('Failed to send Telegram notification:', error);
    }

    return submission;
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'List all contact submissions (admin)' })
  findAll() {
    return this.contactsService.findAll();
  }

  @Patch(':id/read')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Mark submission as read (admin)' })
  markAsRead(@Param('id') id: string) {
    return this.contactsService.markAsRead(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete submission (admin)' })
  remove(@Param('id') id: string) {
    return this.contactsService.remove(id);
  }
}
