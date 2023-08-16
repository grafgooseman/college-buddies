"use client";

import Button from "@mui/material/Button";
import supabase from "@/utils/supabaseClient";

export default function TryNow( {size, className}: {size: "small" | "medium" | "large"; className?: string} ) {

    const handleClick = async () => {
        console.log("Try Now");
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            // options: {
            //   queryParams: {
            //     access_type: 'offline',
            //     prompt: 'consent',
            //   },
            // },
          })
        console.log(data, error);
    }


    return (
        <Button
            onClick={handleClick}
            variant="contained"
            size={size}
            className={className}
        >
            TRY NOW
        </Button>
    );
}
