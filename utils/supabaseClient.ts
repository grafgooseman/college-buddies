// utils/supabaseClient.ts

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabase: SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_KEY as string
);

export default supabase;



// import { createClient } from '@supabase/supabase-js'

// let supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL || "TODO: Your Supabase URL"
// let supabase_key = process.env.NEXT_PUBLIC_SUPABASE_KEY || "TODO: Your Supabase Key"

// const supabase = (access_token: string) => {
//   const supabase = createClient(
//     supabase_url,
//     supabase_key
//   )

// //   supabase.auth.session = () => ({
// //     access_token,
// //     token_type: "",
// //     user: null
// //   })

//   return supabase
// }


// export default supabase;