"use client";

import React from "react";
import Button from "@mui/material/Button";
import supabase from "@/utils/supabaseClient";
import { SessionContext, SessionProvider } from "./SessionProvider";
import { useSession } from './useSession';
import { useRouter } from 'next/navigation'

export default function TryNowButton({
    size,
    className
}: {
    size: "small" | "medium" | "large";
    className?: string;
}) {
    const router = useRouter();
    const { googleLogin } = useSession();
    const [text, setText] = React.useState<string>("Try Now");
    const {sessionData: session} = React.useContext(SessionContext) ?? {};

    React.useEffect(() => {
        if (session == null) {
          setText('Try Now');
        } else {
          setText('Find Friends');
        }
        console.log("button:", session);
      }, [session]);

    const handleClick = async () => {
        if(session == null){
            await googleLogin();
        } else {
            await router.push('/profile');
        }
    };

    return (
        <Button
            onClick={handleClick}
            variant="contained"
            size={size}
            className={className}
        >
            {text}
        </Button>
    );
}
