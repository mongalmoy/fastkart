import { Pool } from "pg";

const poolObj = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
};

const pool = new Pool(
  process.env.PROD_ENV === "true"
    ? {
        ...poolObj,
        ssl: { rejectUnauthorized: false }, // Important for Aiven connections
      }
    : {
        ...poolObj,
        port: Number(process.env.PG_PORT),
      }
);

export default pool;
