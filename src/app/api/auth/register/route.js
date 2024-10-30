import { db_tables, hashing } from "@/lib/constants";
import pool from "@/lib/postgres";
import bcrypt from 'bcryptjs'

export async function POST(req) {
  const { name, email, password } = await req?.json();


  if(!email || !password || !name) {
    return new Response({message: "All fields are required"}, {
      status: 400,
    })
  }

  try {
    const userExits = await pool.query(
      `SELECT * FROM ${db_tables.user.name} WHERE email = $1`,
      [email]
    );

    if (userExits.rowCount) {
      return new Response(JSON.stringify({ message: "User already exists" }));
    }

    const hashedPassword = await bcrypt.hash(password, Number(hashing.saltingNo));

    const newUser = await pool.query(
      `INSERT INTO ${db_tables.user.name} (name, email, password) VALUES ($1, $2, $3)`,
      [name, email, hashedPassword]
    );

    return new Response(
      JSON.stringify({
        message: "User created successfully",
        user: {...newUser.rows[0], password: ""},
      }),
      {
        status: 201,
      },
    );
  } catch (err) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
