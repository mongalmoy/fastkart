import pool from "@/lib/postgres";
import { db_tables } from "@/lib/constants";
import nodemailer from "nodemailer";

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
});

export async function POST(req) {
  try {
    const { subject, body } = await req.json();

    console.log("Received data:");
    console.log("subject:", subject);
    console.log("body:", body);

    // Fetch subscribers from DB
    const subscriberResult = await pool.query(
      `SELECT email FROM ${db_tables.subscriber_table.name}`
    );

    const subscribers = subscriberResult.rows.map((el) => el.email);
    console.log("Subscribers:", subscribers);

    // Send emails to all subscribers
    await Promise.all(
      subscribers.map(async (subscriberEmail) => {
        try {
          const info = await transporter.sendMail({
            from: `"FastKart Newsletter" <${process.env.ADMIN_EMAIL}>`,
            to: subscriberEmail,
            subject,
            text: body,
          });
          console.log(`Email sent to ${subscriberEmail}:`, info.messageId);
        } catch (emailError) {
          console.error(
            `Failed to send email to ${subscriberEmail}:`,
            emailError
          );
        }
      })
    );

    return new Response(
      JSON.stringify({
        message: "Email sent to all subscribers successfully.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Subscribe API error:", error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
