import { db_tables, hashing } from "@/lib/constants"
import pool from "@/lib/postgres"
import bcrypt from 'bcryptjs'

export async function PATCH(req) {
  const emailObj = await req.cookies.get("email");
  const email = emailObj?.value;

  const { oldPassword, confirmPassword } = await req?.json()
  
  try {
    const result = await pool.query(`SELECT * FROM ${db_tables.user.name} WHERE email=$1`, [email]);
    console.log("result", result)

    const isMatch = bcrypt.compareSync(oldPassword, result.rows[0].password);
    console.log("isMatch", isMatch)

    if(!isMatch) {
      return new Response(JSON.stringify({message: "Old password did not match"}), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        }
      })
    }

    const confirmHashedPassword = bcrypt.hashSync(confirmPassword, Number(hashing.saltingNo))
    console.log("confirmHashedPassword", confirmHashedPassword)

    const updateResult = await pool.query(`UPDATE ${db_tables.user.name} SET password=$1 WHERE email=$2`, 
      [confirmHashedPassword, email]
    )

    return new Response(JSON.stringify({message: "Password updated successfully"}), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    })
    
  } catch(error) {
    return new Response(JSON.stringify({message: "Something went wrong"}), {
      status: 500,
    })
  }
}