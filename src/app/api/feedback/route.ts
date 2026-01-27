import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface FeedbackData {
  authorName: string;
  authorEmail?: string;
  position?: string;
  quote: string;
  rating?: number;
}

// POST - Submit new feedback (public, requires approval)
export async function POST(request: NextRequest) {
  try {
    const body: FeedbackData = await request.json();
    const { authorName, authorEmail, position, quote, rating } = body;

    // Validate required fields
    if (!authorName || !quote) {
      return NextResponse.json(
        { error: 'Name and feedback message are required' },
        { status: 400 }
      );
    }

    // Validate email if provided
    if (authorEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(authorEmail)) {
        return NextResponse.json(
          { error: 'Invalid email address' },
          { status: 400 }
        );
      }
    }

    // Validate rating if provided
    if (rating !== undefined && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Create feedback with PENDING status
    await prisma.feedback.create({
      data: {
        authorName,
        authorEmail: authorEmail || null,
        position_en: position || null,
        quote_en: quote,
        rating: rating || 5,
        status: 'PENDING',
        featured: false,
        isVisible: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your feedback! It will be reviewed and published soon.'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Feedback submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}

// GET - Get approved feedback for public display
export async function GET() {
  try {
    const feedback = await prisma.feedback.findMany({
      where: {
        status: 'APPROVED',
        isVisible: true,
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
      select: {
        id: true,
        authorName: true,
        position_en: true,
        position_ru: true,
        position_uz: true,
        quote_en: true,
        quote_ru: true,
        quote_uz: true,
        rating: true,
        featured: true,
        avatar: true,
        partner: {
          select: {
            name: true,
            logo: true,
          },
        },
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}
