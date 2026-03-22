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
import { BlogService } from './blog.service.js';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get blog post by slug (public)' })
  findBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'List all blog posts (admin)' })
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get blog post by ID' })
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create blog post' })
  create(@Body() data: any) {
    return this.blogService.create(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update blog post' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.blogService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete blog post' })
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }

  @Patch(':id/visibility')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Toggle blog post visibility' })
  toggleVisibility(@Param('id') id: string) {
    return this.blogService.toggleVisibility(id);
  }

  @Patch(':id/featured')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Toggle blog post featured status' })
  toggleFeatured(@Param('id') id: string) {
    return this.blogService.toggleFeatured(id);
  }
}
