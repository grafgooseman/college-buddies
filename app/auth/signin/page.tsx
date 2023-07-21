"use client";
import { useRef, useState, useEffect } from "react";

export default function SignInPage() {
    const emailRef = useRef();
    const [csrfToken, setCsrfToken] = useState("");

    // Fetch CSRF token when component mounts
    useEffect(() => {
        fetch("/api/auth/csrf")
            .then(response => response.json())
            .then(data => setCsrfToken(data.csrfToken));
    }, []);

    async function sendCode() {
        console.log("send code pressed. email:" + emailRef.current.value);
        const email = emailRef.current.value;
        const response = await fetch("/api/auth/signin/email", { // use /:provider in the endpoint
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, csrfToken: csrfToken }), // include CSRF token
        });

        const data = await response.json();
        console.log(data);
        // handle your response here
    }

    return (
        <div>
            <h1>Sign In with email</h1>
            <input type="text" ref={emailRef} />
            <button onClick={sendCode}>Send code</button>
        </div>
    );
}
