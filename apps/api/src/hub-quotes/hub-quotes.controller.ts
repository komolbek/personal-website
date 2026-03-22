import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard.js';
import { HubQuotesService } from './hub-quotes.service.js';

@ApiTags('Hub Quotes & Contracts')
@Controller('hub')
@UseGuards(AuthGuard)
export class HubQuotesController {
  constructor(private readonly hubQuotesService: HubQuotesService) {}

  // ── Quotes ──

  @Get('quotes')
  @ApiOperation({ summary: 'List all quotes' })
  findAllQuotes(@Query('projectId') projectId?: string) {
    return this.hubQuotesService.findAllQuotes(projectId);
  }

  @Get('quotes/:id')
  @ApiOperation({ summary: 'Get quote by ID' })
  findOneQuote(@Param('id') id: string) {
    return this.hubQuotesService.findOneQuote(id);
  }

  @Post('quotes')
  @ApiOperation({ summary: 'Create quote' })
  createQuote(@Body() data: any) {
    return this.hubQuotesService.createQuote(data);
  }

  @Patch('quotes/:id/status')
  @ApiOperation({ summary: 'Update quote status' })
  updateQuoteStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ) {
    return this.hubQuotesService.updateQuoteStatus(id, body.status);
  }

  @Delete('quotes/:id')
  @ApiOperation({ summary: 'Delete quote' })
  removeQuote(@Param('id') id: string) {
    return this.hubQuotesService.removeQuote(id);
  }

  // ── Contracts ──

  @Get('contracts')
  @ApiOperation({ summary: 'List all contracts' })
  findAllContracts(@Query('projectId') projectId?: string) {
    return this.hubQuotesService.findAllContracts(projectId);
  }

  @Get('contracts/:id')
  @ApiOperation({ summary: 'Get contract by ID' })
  findOneContract(@Param('id') id: string) {
    return this.hubQuotesService.findOneContract(id);
  }

  @Post('contracts')
  @ApiOperation({ summary: 'Create contract' })
  createContract(@Body() data: any) {
    return this.hubQuotesService.createContract(data);
  }

  @Patch('contracts/:id/status')
  @ApiOperation({ summary: 'Update contract status (auto-sets signedDate on SIGNED)' })
  updateContractStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ) {
    return this.hubQuotesService.updateContractStatus(id, body.status);
  }

  @Delete('contracts/:id')
  @ApiOperation({ summary: 'Delete contract' })
  removeContract(@Param('id') id: string) {
    return this.hubQuotesService.removeContract(id);
  }
}
