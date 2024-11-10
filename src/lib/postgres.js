import { Pool } from "pg";

const pool = new Pool(
  process.env.PROD_ENV === "false"
    ? {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: Number(process.env.PG_PORT),
        // ssl: { rejectUnauthorized: false }, // Important for Aiven connections
      }
    : {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: Number(process.env.PG_PORT),
        ssl: { rejectUnauthorized: false }, // Important for Aiven connections
      }
);

export default pool;
