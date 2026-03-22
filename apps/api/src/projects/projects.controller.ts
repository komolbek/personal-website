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
import { ProjectsService } from './projects.service.js';

@ApiTags('Projects')
@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'List all projects' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create project' })
  create(@Body() data: any) {
    return this.projectsService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update project' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.projectsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project' })
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }

  @Patch(':id/visibility')
  @ApiOperation({ summary: 'Toggle project visibility' })
  toggleVisibility(@Param('id') id: string) {
    return this.projectsService.toggleVisibility(id);
  }

  @Patch(':id/featured')
  @ApiOperation({ summary: 'Toggle project featured status' })
  toggleFeatured(@Param('id') id: string) {
    return this.projectsService.toggleFeatured(id);
  }
}
