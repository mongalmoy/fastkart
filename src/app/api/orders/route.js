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

    const totalOrders = await Promise.all(orders?.rows?.map(async (el) => {
      const orderDescriptionList = await pool.query(
        `SELECT * FROM ${db_tables.orders_desc.name} WHERE order_id=$1`, [
          el?.id || ""
        ]
      )
      el["orderDescription"] = orderDescriptionList?.rows;
      return el;
    }))

    return new Response(JSON.stringify(totalOrders), {
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

// export async function POST(req) {
//   const {
//     checkoutList,
//     billingAddress,
//     paymentDetails,
//     orderSummery,
//     orderdate,
//     paymentFlag,
//   } = await req?.json();

//   try {
//     const token = cookies().get("token");

//     const jwtPayload = atob(token?.value?.split(".")[1]);
//     const { userId } = JSON.parse(jwtPayload);

//     const isTableExists = await tableExists(db_tables.orders.name);

//     if (!isTableExists) {
//       await pool.query(
//         `CREATE TABLE ${db_tables.orders.name} (
// 	        id serial,
// 	        user_id int,
// 	        invoice_no serial unique,
// 	        order_amount numeric(10, 2),
// 	        order_date date,
// 	        payment_flag varchar(1),
// 	        primary key(id),
// 	        foreign key(user_id) references users(id) ON DELETE CASCADE
//         );`
//       );

//       await pool.query(
//         `CREATE TABLE ${db_tables.orders_desc.name} (
// 	        id serial,
// 	        order_id int,
// 	        product_id int,
// 	        imageurl text,
// 	        name varchar(50),
// 	        type varchar(50),
// 	        price numeric(10,2),
// 	        currency varchar(10),
// 	        color varchar(20),
// 	        gender varchar(10),
// 	        description varchar(200),
// 	        size varchar(10),

// 	        primary key(id),
// 	        foreign key(order_id) references orders(id) ON DELETE CASCADE,
// 	        foreign key(product_id) references products_desc(id) ON DELETE CASCADE
//         );`
//       );

//       await pool.query(
//         `CREATE TABLE ${db_tables.delivery_address.name} (
// 	        id serial,
// 	        order_id int,
// 	        fullname varchar(50),
// 	        address varchar(300),
// 	        city varchar(50),
// 	        pincode varchar(6),
// 	        country varchar(20),

// 	        primary key(id),
// 	        foreign key(order_id) references orders(id) ON DELETE CASCADE
//         );`
//       );

//       await pool.query(
//         `CREATE TABLE ${db_tables.payment_address.name} (
// 	        id serial,
// 	        order_id int,
// 	        card_no varchar(16),
// 	        exp_date varchar(7),
// 	        cvv varchar(3),

// 	        primary key(id),
// 	        foreign key(order_id) references orders(id) ON DELETE CASCADE
//         );`
//       );
//     }

//     // inserting into orders table
//     const insertOrderRes = await pool.query(
//       `INSERT INTO ${db_tables.orders.name} (user_id, order_amount, order_date, payment_flag) VALUES($1, $2, $3, $4) RETURNING *`,
//       [userId, orderSummery?.orderTotal || "", orderdate, paymentFlag]
//     );

//     // inserting all checkout items into order_desc_tx table
//     await Promise.all(
//       checkoutList?.map(async (orderedItem) => {
//         console.log("orderedItem=================", orderedItem)
//         console.log(insertOrderRes?.rows[0])
//         const {
//           id, imageurl, name, type, price, currency, color, gender, description, size } = orderedItem;
//         return pool.query(
//           `INSERT INTO ${db_tables.orders_desc.name} (order_id, product_id, imageurl, name, type, price, currency, color, gender, description, size) 
//         VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
//           [
//             insertOrderRes?.rows[0]?.id, id, imageurl, name, type, price, currency, color, gender, description, size,
//           ]
//         );
//       })
//     );

//     // inserting billing address into delivery_address_tx table
//     const { fullname, address, city, pincode, country } = billingAddress;
//     await pool.query(
//       `INSERT INTO ${db_tables.delivery_address.name} (order_id, fullname, address, city, pincode, country)
//       VALUES ($1, $2, $3, $4, $5, $6)`,
//       [insertOrderRes?.rows[0]?.id, fullname, address, city, pincode, country]
//     );

//     // inserting card details into payemnt_address_tx
//     const { cardNo, expDate, cvv } = paymentDetails;
//     await pool.query(
//       `INSERT INTO ${db_tables.payment_address.name} (order_id, card_no, exp_date, cvv)
//       VALUES ($1, $2, $3, $4, $5, $6)`,
//       [insertOrderRes?.rows[0]?.id, cardNo, expDate, cvv]
//     );

//     return new Response(
//       JSON.stringify({
//         message: "Your orders has been placed successfully",
//       }),
//       {
//         status: 201,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     if (error.code === "23505") {
//       // Handle unique constraint violation
//       return new Response(JSON.stringify({ message: "Order already exists" }), {
//         status: 409,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//     } else {
//       // Handle other errors
//       return new Response(
//         JSON.stringify({ message: "Internal server error" }),
//         {
//           status: 500,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }
//   }
// }



export async function POST(req) {
  const {
    checkoutList,
    billingAddress,
    paymentDetails,
    orderSummery,
    orderdate,
    paymentFlag,
  } = await req?.json();

  console.log("=================")
  console.log(checkoutList)
  console.log("=================")

  try {
    const token = cookies().get("token");
    const jwtPayload = atob(token?.value?.split(".")[1]);
    const { userId } = JSON.parse(jwtPayload);

    const isTableExists = await tableExists(db_tables.orders.name);

    // Create tables if they don’t exist
    if (!isTableExists) {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS ${db_tables.orders.name} (
          id serial PRIMARY KEY,
          user_id int REFERENCES users(id) ON DELETE CASCADE,
          invoice_no serial UNIQUE,
          order_amount numeric(10, 2),
          order_date date,
          payment_flag varchar(1)
        );
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS ${db_tables.orders_desc.name} (
          id serial PRIMARY KEY,
          order_id int REFERENCES ${db_tables.orders.name}(id) ON DELETE CASCADE,
          product_id int REFERENCES products_desc(id) ON DELETE CASCADE,
          imageurl text,
          name varchar(50),
          type varchar(50),
          price numeric(10,2),
          currency varchar(10),
          color varchar(20),
          gender varchar(10),
          description varchar(200),
          size varchar(10)
        );
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS ${db_tables.delivery_address.name} (
          id serial PRIMARY KEY,
          order_id int REFERENCES ${db_tables.orders.name}(id) ON DELETE CASCADE,
          fullname varchar(50),
          address varchar(300),
          city varchar(50),
          pincode varchar(6),
          country varchar(20)
        );
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS ${db_tables.payment_address.name} (
          id serial PRIMARY KEY,
          order_id int REFERENCES ${db_tables.orders.name}(id) ON DELETE CASCADE,
          card_no varchar(16),
          exp_date varchar(7),
          cvv varchar(3)
        );
      `);
    }

    // Insert into orders table
    const insertOrderRes = await pool.query(
      `INSERT INTO ${db_tables.orders.name} (user_id, order_amount, order_date, payment_flag)
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [userId, orderSummery?.orderTotal || 0, orderdate, paymentFlag]
    );

    const orderId = insertOrderRes?.rows[0]?.id;

    // Insert all items in checkout list
    await Promise.all(
      checkoutList.map((item) => {
        const { id, imageurl, name, type, price, currency, color, gender, description, size } = item;
        return pool.query(
          `INSERT INTO ${db_tables.orders_desc.name} 
          (order_id, product_id, imageurl, name, type, price, currency, color, gender, description, size) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [orderId, id, imageurl, name, type, price, currency, color, gender, description, size]
        );
      })
    );

    // Insert billing address into delivery address table
    const { fullname, address, city, pincode, country } = billingAddress;
    await pool.query(
      `INSERT INTO ${db_tables.delivery_address.name} 
      (order_id, fullname, address, city, pincode, country)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [orderId, fullname, address, city, pincode, country]
    );

    // Insert payment details into payment address table
    const { cardNo, expDate, cvv } = paymentDetails;
    await pool.query(
      `INSERT INTO ${db_tables.payment_address.name} 
      (order_id, card_no, exp_date, cvv)
      VALUES ($1, $2, $3, $4)`,
      [orderId, cardNo, expDate, cvv]
    );

    // deleting the item from the cart table
    await Promise.all(
      checkoutList.map((item) => {
        const { cartId } = item;
        return pool.query(
          `DELETE FROM ${db_tables.user_cart.name} WHERE id=$1`, [
            cartId
          ]
        );
      })
    );

    return new Response(JSON.stringify({ message: "Your order has been placed successfully" }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    if (error.code === "23505") {
      return new Response(JSON.stringify({ message: "Order already exists" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ message: "Internal server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}
