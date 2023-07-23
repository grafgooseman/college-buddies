// NextAuth configuration
import NextAuth from "next-auth";
import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { Adapter } from "next-auth/adapters";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabase: SupabaseClient = createClient(
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
                if (!credentials) {
                    return null;
                }

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