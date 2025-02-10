import { db_tables, hashing } from "@/lib/constants";
import pool from "@/lib/postgres";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { name, email, password } = await req?.json();

  if (!email || !password || !name) {
    return new Response(
      { message: "All fields are required" },
      {
        status: 400,
      }
    );
  }

  try {
    const userExits = await pool.query(
      `SELECT * FROM ${db_tables.user.name} WHERE email = $1`,
      [email]
    );

    if (userExits.rowCount) {
      return new Response(JSON.stringify({ message: "User already exists" }));
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(hashing.saltingNo)
    );

    const newUser = await pool.query(
      `INSERT INTO ${db_tables.user.name} (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, hashedPassword]
    );

    // jwt signs
    const token = jwt.sign(
      {
        userId: newUser.rows[0].id,
        email: newUser.rows[0].email,
        password: newUser.rows[0].password,
      },
      process.env.JWT_SIGN_PRIVATE_KEY,
      {
        expiresIn: "1h",
      }
    );

    return new Response(
      JSON.stringify({
        message: "User created successfully",
        user: { ...newUser.rows[0], jwt: token, password: "" },
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": [
            `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60}`, // 1hr
            `email=${email}; Path=/; Max-Age=${60 * 60}`, // 1hr
          ],
        },
      }
    );
  } catch (err) {
    console.log("Register Error ===>", err);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
