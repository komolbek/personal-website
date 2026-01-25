import { NextRequest, NextResponse } from 'next/server';

// Simple email sending using Resend or any email service
// For now, we'll log the message and return success
// You can integrate with Resend, SendGrid, or other email services later

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, message, company, phone, service, budget } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // Example with Resend:
    //
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // await resend.emails.send({
    //   from: 'contact@nectoautomations.com',
    //   to: 'info@nectoautomations.com',
    //   subject: `New inquiry from ${name}${company ? ` (${company})` : ''}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
    //     ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
    //     ${service ? `<p><strong>Service Interested:</strong> ${service}</p>` : ''}
    //     ${budget ? `<p><strong>Budget Range:</strong> ${budget}</p>` : ''}
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });

    // For now, log the message
    console.log('Contact form submission:', {
      name,
      email,
      message,
      ...(company && { company }),
      ...(phone && { phone }),
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
