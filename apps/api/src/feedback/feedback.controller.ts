import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard.js';
import { FeedbackService } from './feedback.service.js';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('public')
  @ApiOperation({ summary: 'Get approved visible feedback (public)' })
  findPublic() {
    return this.feedbackService.findPublic();
  }

  @Post()
  @ApiOperation({ summary: 'Submit feedback (public)' })
  create(
    @Body()
    data: {
      authorName: string;
      authorEmail?: string;
      position_en?: string;
      position_ru?: string;
      position_uz?: string;
      quote_en: string;
      quote_ru?: string;
      quote_uz?: string;
      rating?: number;
      partnerId?: string;
    },
  ) {
    return this.feedbackService.create({ ...data, status: 'PENDING' });
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'List all feedback (admin)' })
  findAll() {
    return this.feedbackService.findAll();
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update feedback status (admin)' })
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: 'PENDING' | 'APPROVED' | 'REJECTED' },
  ) {
    return this.feedbackService.updateStatus(id, body.status);
  }

  @Patch(':id/featured')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Toggle featured status (admin)' })
  toggleFeatured(@Param('id') id: string) {
    return this.feedbackService.toggleFeatured(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete feedback (admin)' })
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(id);
  }
}
