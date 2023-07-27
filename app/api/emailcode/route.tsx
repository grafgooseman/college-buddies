import nodemailer from "nodemailer";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase: SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function POST(request: NextRequest) {
    const { email } = await request.json();
    console.log("           Email here");
    // Validate email
    if (!email || !email.includes("@")) {
        return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const temporaryPassword: string = "temporary123"; // Generate a temporary password
    console.log("           temporary123");
    const { data, error } = await supabase
        .from("users")
        .insert({ email, password: temporaryPassword });

    if (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    // Send the temporary password to the user's email
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Your Temporary Password",
        text: `TEXT: Your temporary password is ${temporaryPassword}`,
        html: `<p>Your temporary password is <b>${temporaryPassword}</b></p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "Email sending successful" });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
