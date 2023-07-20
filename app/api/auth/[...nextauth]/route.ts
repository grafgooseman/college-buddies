import NextAuth from "next-auth";
import { NextAuthOptions, User } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { Adapter } from "next-auth/adapters";
import nodemailer from "nodemailer";

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({
        identifier: email,
        url,
        provider: { server, from },
      }) => {
        // Create a transporter
        const transporter = nodemailer.createTransport(server);

        // Create the email options
        const mailOptions = {
          from,
          to: email,
          subject: "Hello World",
          text: "Hello World",
          html: "<p>Hello World</p>",
        };

        // Send the email
        return transporter.sendMail(mailOptions);
      },
      secret: process.env.NEXTAUTH_SECRET,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  }) as Adapter<User>,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
