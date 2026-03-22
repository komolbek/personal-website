import { Module } from '@nestjs/common';
import { HubClientsController } from './hub-clients.controller.js';
import { HubClientsService } from './hub-clients.service.js';

@Module({
  controllers: [HubClientsController],
  providers: [HubClientsService],
})
export class HubClientsModule {}
