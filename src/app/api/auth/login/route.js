import { db_tables } from "@/lib/constants";
import pool from "@/lib/postgres";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const jwt = cookies().get("token");
    if(!!jwt) {
      return new Response(JSON.stringify({isLoggedIn: true}), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        }
      })
    }
  
    return new Response(JSON.stringify({isLoggedIn: false}), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      }
    }) 
  } catch(error) {
    console.log(error)
    return new Response(JSON.stringify({message: "Something went wrong"}), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      }
    }) 
  }
  
}

export async function POST(req) {
  const { email, password } = await req?.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: "All fields are required" }),
      {
        status: 400,
      }
    );
  }

  try {
    // fethes user
    const user = await pool.query(
      `SELECT * FROM ${db_tables.user.name} WHERE email=$1`,
      [email]
    );

    if (user.rowCount === 0) {
      return new Response(
        JSON.stringify({ message: "Invalid credentials" }),
        {
          status: 401,
        }
      );
    }

    // check password
    const isMatch = bcrypt.compareSync(password, user.rows?.[0]?.password);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ message: "Invalid credentials" }),
        {
          status: 401,
        }
      );
    }

    // jwt signs
    const token = jwt.sign(
      { userId: user.rows[0].id, email: user.rows[0].email, password: user.rows[0].password },
      process.env.JWT_SIGN_PRIVATE_KEY,
      {
        expiresIn: "1h",
      }
    );

    return new Response(
      JSON.stringify({ message: "Login Successfull", jwt: token, user: {...user.rows[0], password: ""} }),
      {
        status: 200,
        headers: {
          'Content-Type': "application/json",
          "Set-Cookie": [
            `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60}`, // 1hr
            `email=${email}; Path=/; Max-Age=${60 * 60}`, // 1hr
          ]
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
      }
    );
  }
}
