import pool from "@/lib/postgres"; // Make sure this path points to your pool or db connection file

export const tableExists = async (tableName) => {
  const result = await pool.query(`
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = $1
    );
  `, [tableName]);
  
  return result.rows[0].exists;
};
