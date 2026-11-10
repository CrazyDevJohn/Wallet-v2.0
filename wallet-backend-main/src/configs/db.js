import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export const initDb = async () => {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transections (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(50) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT Now()
    )`;

    await sql`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_DATE
    )`;

    console.log("Table TRANSACTIONS and USERS created successfully.");
  } catch (error) {
    console.error("Error creating TRANSACTIONS table:", error);
    process.exit(1);
  }
};

export default sql;
