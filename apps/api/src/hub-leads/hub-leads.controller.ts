import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard.js';
import { HubLeadsService } from './hub-leads.service.js';

@ApiTags('Hub Leads')
@Controller('hub/leads')
@UseGuards(AuthGuard)
export class HubLeadsController {
  constructor(private readonly hubLeadsService: HubLeadsService) {}

  @Get()
  @ApiOperation({ summary: 'List all leads' })
  findAll(@Query('productId') productId?: string) {
    return this.hubLeadsService.findAll(productId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lead by ID' })
  findOne(@Param('id') id: string) {
    return this.hubLeadsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create lead' })
  create(@Body() data: any) {
    return this.hubLeadsService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update lead' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.hubLeadsService.update(id, data);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update lead status (auto-creates client on SIGNED)' })
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ) {
    return this.hubLeadsService.updateStatus(id, body.status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete lead' })
  remove(@Param('id') id: string) {
    return this.hubLeadsService.remove(id);
  }
}
