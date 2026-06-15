import Button from "./Button.js";
import EmailLayout from "./EmailLayout.js";

export default function WelcomeEmail({
  firstName = "there",
}) {
  return EmailLayout({
    title: "Welcome to TickOnt 🎉",

    content: `
      <p>Hi ${firstName},</p>

      <p>
        Thanks for creating your TickOnt account.
      </p>

      <p>
        You can now:
      </p>

      <ul>
        <li>Discover events</li>
        <li>Purchase tickets</li>
        <li>Manage bookings</li>
        <li>Use passkeys for secure login</li>
      </ul>

      ${
        Button(
            "Open Tickont",
            process.env.APP_URL
        )
      }
    `,
  });
}