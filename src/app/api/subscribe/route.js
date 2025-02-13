import pool from "@/lib/postgres";
import { db_tables } from "@/lib/constants";

export async function POST(req) {
  const { email } = await req.json();

  console.log("Received email:", email);
  console.log("Table Name:", db_tables.subscriber_table.name); // Debugging

  try {
    const tableName = db_tables.subscriber_table.name; // Ensure it's a string
    if (typeof tableName !== "string") {
      throw new Error("Invalid table name: " + JSON.stringify(tableName));
    }

    // ✅ Check if the table exists
    const tableCheckQuery = `
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = $1
      )
    `;
    const result = await pool.query(tableCheckQuery, [tableName]);

    // ✅ Create table only if it does not exist
    if (!result.rows[0].exists) {
      console.log("Table does not exist, creating...");
      const createTableQuery = `
        CREATE TABLE ${tableName} (
          id SERIAL PRIMARY KEY,
          email VARCHAR(100) UNIQUE NOT NULL,
          createdAt TIMESTAMP DEFAULT NOW()
        )
      `;
      await pool.query(createTableQuery);
    }

    // ✅ Check if email is already registered
    const emailExistsQuery = `SELECT COUNT(*) FROM "${tableName}" WHERE email = $1`;
    const emailExists = await pool.query(emailExistsQuery, [email]);

    if (parseInt(emailExists.rows[0].count, 10) > 0) {
      return new Response(
        JSON.stringify({ message: "Subscriber email already registered." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Insert new subscriber
    const insertQuery = `INSERT INTO "${tableName}" (email) VALUES ($1)`;
    await pool.query(insertQuery, [email]);

    return new Response(
      JSON.stringify({ message: "Successfully subscribed." }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Subscribe API error:", error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
