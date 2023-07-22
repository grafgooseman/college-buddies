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





// "use client";
// import { useRef, useState, useEffect } from "react";
// import { useRouter } from 'next/navigation'

// export default function SignInPage() {
//     const emailRef = useRef<HTMLInputElement>(null); // Typed here
//     const router = useRouter();
//     const [csrfToken, setCsrfToken] = useState<string>("");

//     // Fetch CSRF token when component mounts
//     useEffect(() => {
//         fetch("/api/auth/csrf")
//             .then(response => response.json())
//             .then(data => setCsrfToken(data.csrfToken));
//     }, []);

//     async function sendCode() {
//         console.log("send code pressed. email:" + emailRef.current?.value); // Check for existence
//         const email = emailRef.current?.value; // Check for existence
//         if (!email) {
//             console.error('Email is not provided');
//             return;
//         }
//         // if() // Client side check if Email is valid and belongs to the college
//         const response = await fetch("/api/auth/signin/email", { // use /:provider in the endpoint
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email: email, csrfToken: csrfToken }), // include CSRF token
//         });

//         // const data = await response.json();
//         console.log(response);
//         // handle your response here


//         //redirect user to the verification page

//     }

//     return (
//         <div>
//             <h1>Sign In with email</h1>
//             <input type="text" ref={emailRef} />
//             <button onClick={sendCode}>Send code</button>
//         </div>
//     );
// }
