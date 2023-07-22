"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react"

export default function SignInPage() {
    const emailRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    async function sendCode() {
        const email = emailRef.current?.value;
        if (!email) {
            console.error('Email is not provided');
            return;
        }

        const response = await signIn('email', { email });

        console.log(response);
    }

    return (
        <div>
            <h1>Sign In with email</h1>
            <input type="text" ref={emailRef} />
            <button onClick={sendCode}>Send code</button>
        </div>
    );
}
