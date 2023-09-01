// utils/supabaseClient.ts

//Convert everything to Server side and cookies? Or leave like it is right now? 
//Why I want to convert to cookies?
//Cause I cant check if I am authorised server side rn.
//Does taht matter? Maybe it doesnt even.

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabase: SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default supabase;
