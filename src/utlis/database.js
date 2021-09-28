import pg from "pg";

const { Pool } = pg;
const { DATABASE_URL } = process.env.DATABASE_URL;
const pool = new Pool({
  DATABASE_URL,
});

export default pool;
