"use client";

import React from "react";
import Button from "@mui/material/Button";
import supabase from "@/utils/supabaseClient";

export default function TryNowButton({
    size,
    className,
}: {
    size: "small" | "medium" | "large";
    className?: string;
}) {
    
    // I am fetching the session in multiple places, I need to create a SessionContext
    const [sessionData, setSessionData] = React.useState<any>(null);

    React.useEffect(() => {
        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            console.log(data, error);
            setSessionData(data);
        };
        fetchSession();
    }, []);


    const handleClick = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            // options: {
            //   queryParams: {
            //     access_type: 'offline',
            //     prompt: 'consent',
            //   },
            // },
        });

        if (error) {
            return alert(
                "Error: " + error.message || error.toString() || "Unknown error"
            );
        }

        console.log(data, error);
    };

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
