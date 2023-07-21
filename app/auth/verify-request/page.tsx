"use client";

export default function SignInPage() {

    const veruify = () => {
        console.log("verify pressed");
    }

    const goBackToEmail = () => {
        console.log("go back to email pressed");
    }

    return (
        <div>
            <h1>Put in code form your email</h1>
            <input type="text" />
            <button onClick={veruify}>Verify</button>
            <button onClick={goBackToEmail}>Go back to put another email</button>
        </div>
    )
}