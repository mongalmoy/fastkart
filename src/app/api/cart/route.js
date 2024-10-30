import { db_tables } from "@/lib/constants";
import pool from "@/lib/postgres";
import { tableExists } from "@/utils/db/dbUtils";
import { cookies } from "next/headers";

export async function GET(req) {
  const { searchParams } = new URL(req?.url)
  const action = searchParams.get("action")

  try {
    const token = cookies().get("token");

    const jwtPayload = atob(token?.value?.split(".")[1]);
    const { userId } = JSON.parse(jwtPayload);

    if(action==="getCartItems") {
      const cartItems = await pool.query(
        `SELECT SUM(product_quantity) FROM ${db_tables.user_cart.name} WHERE user_id=$1`,
        [userId]
      );

      return new Response(JSON.stringify({count: cartItems.rows[0]?.sum}), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const cartListRes = await pool.query(
      `SELECT * FROM ${db_tables.user_cart.name} WHERE user_id=$1`,
      [userId]
    );

    return new Response(JSON.stringify(cartListRes.rows), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  const { productId, quantity, size, condition } = await req?.json();

  try {
    const token = cookies().get("token");

    if (!token) {
      return new Response(
        JSON.stringify({
          message: "User is not authorized. Please login again...",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const jwtPayload = atob(token?.value?.split(".")[1]);
    const { userId } = JSON.parse(jwtPayload);

    const isTableExists = await tableExists(db_tables.user_cart.name);

    if (!isTableExists) {
      await pool.query(
        `CREATE TABLE user_cart (
	        id serial,
	        user_id int,
	        product_id int,
	        product_quantity int,
	        product_size varchar(10),
	
	        PRIMARY KEY(id),
	        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
	        FOREIGN KEY(product_id) REFERENCES products_desc(id)
        );`
      );
    }

    const cartListRes = await pool.query(
      `SELECT * FROM ${db_tables.user_cart.name} WHERE user_id=$1 AND product_id=$2 AND product_size=$3`,
      [Number(userId), Number(productId), size]
    );

    if (cartListRes.rows.length === 0) {
      if (condition === "add") {
        await pool.query(
          `INSERT INTO ${db_tables.user_cart.name} (user_id, product_id, product_quantity, product_size) VALUES($1, $2, $3, $4)`,
          [Number(userId), Number(productId), Number(quantity), size]
        );
        return new Response(
          JSON.stringify({ message: "Item added to cart successfully" }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        return new Response(JSON.stringify({ message: "Item not found" }), {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    }

    const itemCount =
      condition === "add"
        ? Number(cartListRes.rows[0].product_quantity) + Number(quantity)
        : Number(cartListRes.rows[0].product_quantity) > Number(quantity)
        ? Number(cartListRes.rows[0].product_quantity) - Number(quantity)
        : 0;

    const updateRes = itemCount
      ? await pool.query(
          `UPDATE ${db_tables.user_cart.name} SET product_quantity=$1 WHERE user_id=$2 AND product_id=$3 AND product_size=$4`,
          [itemCount, Number(userId), Number(productId), size]
        )
      : await pool.query(
          `DELETE FROM ${db_tables.user_cart.name} WHERE user_id=$1 AND product_id=$2 AND product_size=$3`,
          [Number(userId), Number(productId), size]
        );

    return new Response(
      JSON.stringify({
        message:
          condition === "add"
            ? "Items added to cart successfully"
            : "Items deleted from the cart successfully",
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
  const data = await req?.json();

  try {
    const token = cookies().get("token");

    const jwtPayload = atob(token?.value?.split(".")[1]);
    const { userId } = JSON.parse(jwtPayload);

    await Promise.all(
      data?.map(async (el) => {
        const res = await pool.query(
          `DELETE from ${db_tables.user_cart.name} WHERE user_id=$1 AND product_id=$2 AND product_size=$3`,
          [Number(userId), Number(el?.product_id), el?.product_size]
        );
        return res;
      })
    );
    return new Response(
      JSON.stringify({ message: "User cart deleted successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("user_cart delete", error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}