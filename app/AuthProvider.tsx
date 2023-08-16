// supabaseClient.ts
// import { createClient, SupabaseClient } from "@supabase/supabase-js";

// const supabase: SupabaseClient = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL as string,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
// );

// export default supabase;

//"use client"

// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import type { Database } from "@/types_db";
// // const supabase = createClientComponentClient<Database>({
// //   supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
// //   supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
// // });
// const supabase = createClientComponentClient<Database>({ req, res });


// export default supabase;

// const handleSignUp = async () => {
//     await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//             emailRedirectTo: `${location.origin}/auth/callback`,
//         },
//     });
//     router.refresh();
// };

// const handleSignIn = async () => {
//     await supabase.auth.signInWithPassword({
//         email,
//         password,
//     });
//     router.refresh();
// };

// const handleSignOut = async () => {
//     await supabase.auth.signOut();
//     router.refresh();
// };
