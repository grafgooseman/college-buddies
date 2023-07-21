import NextAuth from "next-auth";
import { NextAuthOptions, User } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { Adapter } from "next-auth/adapters";
import nodemailer from "nodemailer";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/auth/signin",
        verifyRequest: "/auth/verify-request", // (used for check email message)
    },
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
            async generateVerificationToken() {
                return "ABC123";
            },
			normalizeIdentifier(identifier: string): string {
				// TODO: Allow only Sheridan Emails

				// Get the first two elements only,
				// separated by `@` from user input.
				let [local, domain] = identifier.toLowerCase().trim().split("@")
				// The part before "@" can contain a ","
				// but we remove it on the domain part
				domain = domain.split(",")[0]
				return `${local}@${domain}`
		  
				// You can also throw an error, which will redirect the user
				// to the error page with error=EmailSignin in the URL
				// if (identifier.split("@").length > 2) {
				//   throw new Error("Only one email allowed")
				// }
			  },
            from: process.env.EMAIL_FROM,
            sendVerificationRequest: async ({
                identifier: email,
                url,
                provider: { server, from },
            }) => {
                // Create a transporter
                const transporter = nodemailer.createTransport(server);

                // Generate a token which I can use to verify the email

                // Create the email options (text seems to do nothing)
                const mailOptions = {
                    from,
                    to: email,
                    subject: "Login to College Buddies App",
                    text: "",
                    html: "<p>Good, hello</p>",
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
