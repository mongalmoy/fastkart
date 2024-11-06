import { db_tables } from "@/lib/constants";
import pool from "@/lib/postgres";

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

    return new Response(
      JSON.stringify({
        ...result.rows[0],
        password: "",
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
