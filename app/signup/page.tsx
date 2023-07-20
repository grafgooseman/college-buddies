// "use server"

import { SignInButton } from "@/components/buttons";

export default async function Signup() {
  let email = "artemgusev2100@gmail.com";
  let name = "Artem Gusev";

  const sendVerificationEmail = async (email: string, name: string) => {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY || "",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "system",
          email: "info@collegebuddies.space",
        },
        to: [
          {
            email: "artemgusev2100@gmail.com",
            name: "Artem Gusev",
          },
        ],
        subject: "Hello world",
        htmlContent:
          "<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Brevo.</p></body></html>",
      }),
    });

    if (response.ok) {
      console.log("Email sent successfully.");
    } else {
      console.error(`Error: ${response.status}`);
    }
  };

  return (
    <div>
      <h1>Verify email</h1>
      <SignInButton handler={sendVerificationEmail}/>
    </div>
  );
}
