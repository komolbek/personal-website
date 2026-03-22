import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard.js';
import { HubProjectsService } from './hub-projects.service.js';

@ApiTags('Hub Projects')
@Controller('hub/projects')
@UseGuards(AuthGuard)
export class HubProjectsController {
  constructor(private readonly hubProjectsService: HubProjectsService) {}

  // ── Projects ──

  @Get()
  @ApiOperation({ summary: 'List all projects' })
  findAll() {
    return this.hubProjectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  findOne(@Param('id') id: string) {
    return this.hubProjectsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create project (auto-creates contact from client info)' })
  create(@Body() data: any) {
    return this.hubProjectsService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update project' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.hubProjectsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project' })
  remove(@Param('id') id: string) {
    return this.hubProjectsService.remove(id);
  }

  // ── Milestones ──

  @Post(':id/milestones')
  @ApiOperation({ summary: 'Add milestone to project' })
  addMilestone(
    @Param('id') id: string,
    @Body() data: { title: string; amount: number; currency?: string; dueDate?: string },
  ) {
    return this.hubProjectsService.addMilestone(id, data);
  }

  @Patch('milestones/:milestoneId/status')
  @ApiOperation({ summary: 'Update milestone status (auto-creates payment on PAID)' })
  updateMilestoneStatus(
    @Param('milestoneId') milestoneId: string,
    @Body() body: { status: string },
  ) {
    return this.hubProjectsService.updateMilestoneStatus(milestoneId, body.status);
  }

  @Delete('milestones/:milestoneId')
  @ApiOperation({ summary: 'Delete milestone' })
  removeMilestone(@Param('milestoneId') milestoneId: string) {
    return this.hubProjectsService.removeMilestone(milestoneId);
  }

  // ── Payments ──

  @Post(':id/payments')
  @ApiOperation({ summary: 'Add payment to project' })
  addPayment(
    @Param('id') id: string,
    @Body()
    data: {
      type: string;
      amount: number;
      currency?: string;
      category?: string;
      description: string;
      date?: string;
    },
  ) {
    return this.hubProjectsService.addPayment(id, data);
  }

  @Delete('payments/:paymentId')
  @ApiOperation({ summary: 'Delete payment' })
  removePayment(@Param('paymentId') paymentId: string) {
    return this.hubProjectsService.removePayment(paymentId);
  }
}
