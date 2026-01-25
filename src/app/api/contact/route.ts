import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface ContactFormData {
  name: string;
  email?: string;
  message: string;
  company?: string;
  phone: string;
  service?: string;
  budget?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, message, company, phone, service, budget } = body;

    // Validate required fields (phone is now required, email is optional)
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, phone, and message are required' },
        { status: 400 }
      );
    }

    // Basic email validation (only if provided)
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email address' },
          { status: 400 }
        );
      }
    }

    // Save to database
    await prisma.contactSubmission.create({
      data: {
        name,
        email: email || null,
        phone,
        company: company || null,
        service: service || null,
        budget: budget || null,
        message,
      },
    });

    // Log for development
    console.log('Contact form submission saved:', {
      name,
      phone,
      ...(email && { email }),
      ...(company && { company }),
      ...(service && { service }),
      ...(budget && { budget }),
    });

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
