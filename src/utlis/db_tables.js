import pool from "./database.js";
const query = `
    --DROP TABLE IF EXISTS products;
    CREATE TABLE IF NOT EXISTS
        products(
            product_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR(50) NOT NULL,
            description TEXT NOT NULL,
            brand VARCHAR(50) NOT NULL,
            image_url VARCHAR(100) NOT NULL,
            price FLOAT NOT NULL,
            category VARCHAR(50) NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        
`;

const createDbTables = async () => {
  try {
    await pool.query(query);
    console.log("tables created");
  } catch (error) {
    console.log(error);
  }
};

export default createDbTables;
