import { db_tables } from "@/lib/constants";
import pool from "@/lib/postgres";
import { google } from "googleapis";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const token = cookies().get("token");

    const jwtPayload = atob(token?.value?.split(".")[1]);
    const { userId } = JSON.parse(jwtPayload);

    console.log("userid", userId)

    const getUserImg = await pool.query(`SELECT userimg_id from ${db_tables.user.name} WHERE id=$1`, [
      Number(userId),
    ]);

    // The fileId for the userImg
    const fileId = getUserImg.rows[0].userimg_id;

    // Decode google drive service account base64 from env
    const base64Key = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_BASE64;

    if (!base64Key) {
      throw new Error("Missing Google Service Account environment variable.");
    }

    // Parse the JSON from the Base64 string
    const serviceAccount = JSON.parse(Buffer.from(base64Key, "base64").toString("utf8"));

    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const drive = google.drive({ version: "v3", auth });

    // Fetch the file content
    const response = await drive.files.get(
      { fileId, alt: "media" }, // Use `alt: media` to download the file content
      { responseType: "stream" } // Get the response as a stream
    );

    // Convert the file stream to a Base64 string
    const chunks = [];
    for await (const chunk of response.data) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    const base64 = buffer.toString("base64");

    return new Response(
      JSON.stringify({ success: true, base64Img: base64 }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
