import { db_tables } from "@/lib/constants";
import pool from "@/lib/postgres";
import { tableExists } from "@/utils/db/dbUtils";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const token = cookies().get("token");

    const jwtPayload = atob(token?.value?.split(".")[1]);
    const { userId } = JSON.parse(jwtPayload);

    const orders = await pool.query(
      `SELECT * FROM ${db_tables.orders.name} where user_id=$1`,
      [userId]
    );

    return new Response(JSON.stringify(orders.rows), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      { message: "Something went wrong" },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  const { productId, quantity, size, orderDate, orderAmount, paymentFlag } =
    await req?.json();

  try {
    const token = cookies().get("token");

    const jwtPayload = atob(token?.value?.split(".")[1]);
    const { userId } = JSON.parse(jwtPayload);

    const isTableExists = await tableExists(db_tables.orders.name);

    if (!isTableExists) {
      await pool.query(
        `CREATE TABLE orders (
	        id serial,
	        user_id int,
	        product_id int,

	        order_amount numeric(10, 2),
	        invoice_no serial unique,
	        quantity int,
	        size varchar(10),
	        order_date date,
	        payment_flag varchar(1),
	
	        PRIMARY KEY(id),
	        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
	        FOREIGN KEY(product_id) REFERENCES products_desc(id) ON DELETE CASCADE
        );`
      );
    }

    const insertOrderRes = await pool.query(
      `INSERT INTO ${db_tables.orders.name} SET VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [userId, productId, orderAmount, quantity, size, orderDate, paymentFlag]
    );

    if (insertOrderRes.rowCount === 1) {
      return new Response(
        JSON.stringify({
          message: "Order places successfully",
        }),
        {
          status: 201,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Failed to insert order" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.log(error);
    if (error.code === "23505") {
      // Handle unique constraint violation
      return new Response(JSON.stringify({ message: "Order already exists" }), {
        status: 409,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      // Handle other errors
      return new Response(
        JSON.stringify({ message: "Internal server error" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }
}
