import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard.js';
import { PartnersService } from './partners.service.js';

@ApiTags('Partners')
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Get('public')
  @ApiOperation({ summary: 'Get visible partners with testimonials (public)' })
  findPublic() {
    return this.partnersService.findPublic();
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'List all partners (admin)' })
  findAll() {
    return this.partnersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get partner by ID' })
  findOne(@Param('id') id: string) {
    return this.partnersService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create partner' })
  create(@Body() data: any) {
    return this.partnersService.create(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update partner' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.partnersService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete partner' })
  remove(@Param('id') id: string) {
    return this.partnersService.remove(id);
  }

  @Patch(':id/visibility')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Toggle partner visibility' })
  toggleVisibility(@Param('id') id: string) {
    return this.partnersService.toggleVisibility(id);
  }

  @Patch(':id/featured')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Toggle partner featured status' })
  toggleFeatured(@Param('id') id: string) {
    return this.partnersService.toggleFeatured(id);
  }
}
