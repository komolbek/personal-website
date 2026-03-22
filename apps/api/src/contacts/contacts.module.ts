import { Module } from '@nestjs/common';
import { TelegramModule } from '../telegram/telegram.module.js';
import { ContactsController } from './contacts.controller.js';
import { ContactsService } from './contacts.service.js';

@Module({
  imports: [TelegramModule],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
