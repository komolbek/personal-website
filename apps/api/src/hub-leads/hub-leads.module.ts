import { Module } from '@nestjs/common';
import { HubLeadsController } from './hub-leads.controller.js';
import { HubLeadsService } from './hub-leads.service.js';

@Module({
  controllers: [HubLeadsController],
  providers: [HubLeadsService],
})
export class HubLeadsModule {}
