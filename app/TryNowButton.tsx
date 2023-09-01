"use client";

import React from "react";
import Button from "@mui/material/Button";
import { useSession } from './useSession';
import { useRouter } from 'next/navigation'

export default function TryNowButton({
    size,
    className,
    overrideText
}: {
    size: "small" | "medium" | "large";
    className?: string;
    overrideText?: string;
}) {
    const router = useRouter();
    const { session, googleLogin } = useSession();
    const [text, setText] = React.useState<string>("Try Now");

    React.useEffect(() => {
        if(overrideText){
            setText(overrideText);
            return;
        }
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
