import { Module } from '@nestjs/common';
import { HubQuotesController } from './hub-quotes.controller.js';
import { HubQuotesService } from './hub-quotes.service.js';

@Module({
  controllers: [HubQuotesController],
  providers: [HubQuotesService],
})
export class HubQuotesModule {}
