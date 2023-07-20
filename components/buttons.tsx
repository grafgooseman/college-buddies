"use client";

export function SignInButton( {handler}:any ) {
    return (
        <button onClick={handler}>
            Sign in and send email
        </button>
    );
}