import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const message = {
      to: email,
      from: process.env.RESEND_SENDER_EMAIL as string,
      subject: 'Welcome to the waitlist!',
      // text: `Hello! You've been added to the waitlist. We'll notify you once the app is ready.`,
      html: `<strong>Hello!</strong><p>This is Cesar from vTour. You've been added to the waitlist. We'll notify you once the app is ready.</p><p>Cheers,</p><p>Cesar<br/>vTour</p>`,
    };

    await resend.emails.send(message);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}
