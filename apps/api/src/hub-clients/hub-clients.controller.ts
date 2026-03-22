import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard.js';
import { HubClientsService } from './hub-clients.service.js';

@ApiTags('Hub Clients')
@Controller('hub/clients')
@UseGuards(AuthGuard)
export class HubClientsController {
  constructor(private readonly hubClientsService: HubClientsService) {}

  @Get()
  @ApiOperation({ summary: 'List all clients' })
  findAll(@Query('productId') productId?: string) {
    return this.hubClientsService.findAll(productId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get client by ID' })
  findOne(@Param('id') id: string) {
    return this.hubClientsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create client' })
  create(@Body() data: any) {
    return this.hubClientsService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update client' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.hubClientsService.update(id, data);
  }

  @Post(':id/payments')
  @ApiOperation({ summary: 'Record payment for client' })
  recordPayment(
    @Param('id') id: string,
    @Body() data: { amount: number; description?: string; date?: string },
  ) {
    return this.hubClientsService.recordPayment(id, data);
  }

  @Delete(':id/payments/:paymentId')
  @ApiOperation({ summary: 'Delete a client payment' })
  deletePayment(@Param('paymentId') paymentId: string) {
    return this.hubClientsService.deletePayment(paymentId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete client' })
  remove(@Param('id') id: string) {
    return this.hubClientsService.remove(id);
  }
}
