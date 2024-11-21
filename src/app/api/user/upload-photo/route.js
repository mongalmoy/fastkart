import { db_tables } from "@/lib/constants";
import pool from "@/lib/postgres";
import { google } from "googleapis";
import { cookies } from "next/headers";
import { Readable } from "stream";

const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

export async function POST(req) {
  try {
    const token = cookies().get("token");

    const jwtPayload = atob(token?.value?.split(".")[1]);
    const { userId } = JSON.parse(jwtPayload);

    // Parse the incoming data
    const { fileName, fileType, base64Img } = await req?.json();

    // Decode google drive service account base64 from env
    const base64Key = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_BASE64;

    if (!base64Key) {
      throw new Error("Missing Google Service Account environment variable.");
    }

    // Parse the JSON from the Base64 string
    const serviceAccount = JSON.parse(Buffer.from(base64Key, "base64").toString("utf8"));

    // Authenticate using the service account
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const drive = google.drive({ version: "v3", auth });

    // Check if the file already exists in the folder
    const searchResponse = await drive.files.list({
      q: `'${folderId}' in parents and name='${fileName}' and trashed=false`,
      fields: "files(id, name)",
    });

    let fileId;

    if (searchResponse.data.files.length > 0) {
      // File exists, get its ID
      fileId = searchResponse.data.files[0].id;

      // Convert base64 image to buffer
      const buffer = Buffer.from(base64Img, "base64");

      // Create a readable stream for the buffer
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);

      // Update the existing file with new content
      await drive.files.update({
        fileId,
        media: {
          mimeType: fileType,
          body: stream,
        },
      });

      // Update userimg to user db
      const updateUserImg = await pool.query(
        `UPDATE ${db_tables.user.name} SET userimg_id=$1 WHERE id=$2`,
        [fileId, userId]
      )

      return new Response(
        JSON.stringify({
          success: true,
          message: "File updated successfully",
          fileId,
          userImg: base64Img,
        }),
        { status: 200 }
      );
    } else {
      // File doesn't exist, create a new one
      // Convert base64 image to buffer
      const buffer = Buffer.from(base64Img, "base64");

      // Create a readable stream for the buffer
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);

      const createResponse = await drive.files.create({
        requestBody: {
          name: fileName,
          parents: [folderId],
        },
        media: {
          mimeType: fileType,
          body: stream,
        },
      });

      fileId = createResponse.data.id;

      // Update userimg to user db
      const updateUserImg = await pool.query(
        `UPDATE ${db_tables.user.name} SET userimg_id=$1 WHERE id=$2`,
        [fileId, userId]
      )

      return new Response(
        JSON.stringify({
          success: true,
          message: "File created successfully",
          fileId: createResponse.data.id,
          userImg: base64Img,
        }),
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error.message }),
      { status: 500 }
    );
  }
}
