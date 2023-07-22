// NextAuth configuration
import NextAuth from "next-auth";
import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { Adapter } from "next-auth/adapters";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Temporary Password",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Temporary Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { username: email, password } = credentials;

        const { data, error } = await supabase
          .from("users")
          .select("email, password")
          .eq("email", email)
          .single();

        if (error || !data || data.password !== password) {
          return null;
        }

        // Return the User object directly
        return { email } as User;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  }) as Adapter<User>,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };





// import NextAuth from "next-auth";
// import { NextAuthOptions, User } from "next-auth";
// import EmailProvider from "next-auth/providers/email";
// import { SupabaseAdapter } from "@auth/supabase-adapter";
// import { Adapter } from "next-auth/adapters";
// import nodemailer from "nodemailer";

// export const authOptions: NextAuthOptions = {
//     pages: {
//         signIn: "/auth/signin",
//         verifyRequest: "/auth/verify-request", // (used for check email message)
//     },
//     providers: [
//         EmailProvider({
//             server: {
//                 host: process.env.EMAIL_SERVER_HOST,
//                 port: Number(process.env.EMAIL_SERVER_PORT),
//                 auth: {
//                     user: process.env.EMAIL_SERVER_USER,
//                     pass: process.env.EMAIL_SERVER_PASSWORD,
//                 },
//             },
//             async generateVerificationToken() {
//                 return "ABC123";
//             },
//             normalizeIdentifier(identifier: string): string {
//                 // Get the first two elements only,
//                 // separated by `@` from user input.
//                 let [local, domain] = identifier
//                     .toLowerCase()
//                     .trim()
//                     .split("@");
//                 // The part before "@" can contain a ","
//                 // but we remove it on the domain part

//                 // Check if both local and domain parts exist
//                 if (!local || !domain) {
//                     throw new Error("Invalid email address");
//                 }

//                 // Check if the domain is a Sheridan domain
//                 if (
//                     domain !== "sheridancollege.ca" &&
//                     domain !== "shernet.sheridancollege.ca"
//                 ) {
//                     throw new Error(
//                         "Email address does not belong to Sheridan College"
//                     );
//                 }

//                 // You can also throw an error, which will redirect the user
//                 // to the error page with error=EmailSignin in the URL
//                 if (identifier.split("@").length > 2) {
//                     throw new Error("Only one email allowed");
//                 }

//                 console.log(local, domain, "I am being run ...........................................");

//                 domain = domain.split(",")[0];
//                 return `${local}@${domain}`;
//             },
//             from: process.env.EMAIL_FROM,
//             sendVerificationRequest: async ({
//                 identifier: email,
//                 url,
//                 provider: { server, from },
//             }) => {
//                 // Create a transporter
//                 const transporter = nodemailer.createTransport(server);

//                 // Create the email options (text seems to do nothing)
//                 const mailOptions = {
//                     from,
//                     to: email,
//                     subject: "Login to College Buddies App",
//                     text: "Fallback if HTML is not allowed to be rendered",
//                     html: "<p>Good, hello</p>",
//                 };

//                 // Send the email
//                 const result = await transporter.sendMail(mailOptions);

//                 // how to give to the UI that email was sent successfully?
//                 const failed = result.rejected
//                     .concat(result.pending)
//                     .filter(Boolean);
//                 if (failed.length) {
//                     throw new Error(
//                         `Email(s) (${failed.join(", ")}) could not be sent`
//                     );
//                 }
//             },
//             secret: process.env.NEXTAUTH_SECRET,
//         }),
//     ],
//     adapter: SupabaseAdapter({
//         url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
//         secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
//     }) as Adapter<User>,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
