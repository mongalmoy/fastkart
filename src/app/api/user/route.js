import { db_tables } from "@/lib/constants";
import pool from "@/lib/postgres";
import { google } from "googleapis";

export async function GET(req) {
  const emailObj = await req.cookies.get("email");
  const email = emailObj?.value;

  if (!email) {
    return new Response(
      JSON.stringify({ message: "Ensure the email cookie is present" }),
      {
        status: 400,
      }
    );
  }

  try {
    const result = await pool.query(
      `SELECT * FROM ${db_tables.user.name} WHERE email=$1`,
      [email]
    );

    if (result.rows?.length === 0) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // The fileId for the userImg
    const fileId = result.rows[0].userimg_id;

    // Decode google drive service account base64 from env
    const base64Key = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_BASE64;

    if (!base64Key) {
      throw new Error("Missing Google Service Account environment variable.");
    }

    // Parse the JSON from the Base64 string
    const serviceAccount = JSON.parse(
      Buffer.from(base64Key, "base64").toString("utf8")
    );

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
    const streamToBuffer = async (stream) => {
      return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(chunks)));
        stream.on("error", (err) => reject(err));
      });
    };

    const buffer = await streamToBuffer(response.data); // response.data is the stream
    const base64 = buffer.toString("base64");

    // Dynamically detect the file's MIME type if needed, here assuming png
    const mimeType = "image/png";

    // Properly format the Base64 data URL
    const base64Image = `data:${mimeType};base64,${base64?.slice(20)}`;

    return new Response(
      JSON.stringify({
        ...result.rows[0],
        userImg: base64Image,
        password: "",
        userimg_id: "",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}

export async function PATCH(req) {
  const { name, dob, country, city, contact, address, email } =
    await req?.json();

  try {
    const result = await pool.query(
      `UPDATE ${db_tables.user.name} SET name=$1, dob=$2, country=$3, city=$4, contact=$5, address=$6 WHERE email=$7`,
      [name, dob, country, city, contact, address, email]
    );
    const findRow = await pool.query(
      `SELECT * FROM ${db_tables.user.name} WHERE email=$1`,
      [email]
    );

    console.log("rows effected", result.rows[0]);

    return new Response(
      JSON.stringify({
        message: "User details updated successfully",
        user: { ...findRow.rows[0], password: "" },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  const emailObj = req?.cookies?.get("email");
  const email = emailObj?.value;

  try {
    await pool.query(`DELETE FROM ${db_tables.user.name} WHERE email=$1`, [
      email,
    ]);

    return new Response(
      JSON.stringify({ message: "User account deleted successfully." }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
