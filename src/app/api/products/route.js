import { db_tables } from "@/lib/constants"
import pool from "@/lib/postgres"

export async function GET() {
  try {
    const products = await pool.query(`SELECT * FROM ${db_tables.products_desc.name}`)

    return new Response(JSON.stringify(products.rows), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    })
  } catch(error) {
    return new Response({message: "Something went wrong"}, {
      status: 500,
    })
  }
}

export async function POST(req) {
  const { productId } = await req?.json();
  try {
    const products = await pool.query(`SELECT * FROM ${db_tables.products_desc.name} WHERE id=$1`, [productId])

    return new Response(JSON.stringify(products.rows[0]), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    })
  } catch(error) {
    return new Response({message: "Something went wrong"}, {
      status: 500,
    })
  }
}