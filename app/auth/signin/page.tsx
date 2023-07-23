// Sign In

"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { getCsrfToken, signIn } from "next-auth/react"

export default function SignInPage() {
    const emailRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    async function sendCode() {
        const email = emailRef.current?.value;
        const csrfToken = await getCsrfToken();
        
        if (!email) {
          console.error('Email is not provided');
          return;
        }
      
        try {
          const response = await fetch('/api/emailcode', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, csrfToken: csrfToken}),
          });
      
          if (response.ok) {
            console.log('Temporary password sent to email');
          } else {
            console.error('Failed to send temporary password');
          }
        } catch (error) {
          console.error('Error sending temporary password:', error);
        }
      }
      

    return (
        <div>
            <h1>Sign In with email</h1>
            <input type="text" ref={emailRef} />
            <button onClick={sendCode}>Send code</button>
        </div>
    );
}
