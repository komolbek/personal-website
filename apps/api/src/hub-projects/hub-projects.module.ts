import { Module } from '@nestjs/common';
import { HubProjectsController } from './hub-projects.controller.js';
import { HubProjectsService } from './hub-projects.service.js';

@Module({
  controllers: [HubProjectsController],
  providers: [HubProjectsService],
})
export class HubProjectsModule {}
