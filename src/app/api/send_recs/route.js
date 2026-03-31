import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    const { watchRec, listenRec } = await request.json();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Recommendations',
        text: `What to watch: ${watchRec}\nWhat to listen to: ${listenRec}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Recommendations sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Failed to send recommendations' }, { status: 500 });
    }
}