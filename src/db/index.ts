import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined.');
}

const client = postgres(connectionString);

// Test connection
try {
  await client`SELECT 1`;
  console.log('Database connected successfully.');
} catch (err) {
  console.error('Database connection failed:', err);
  process.exit(1);
}

const db = drizzle(client);

export { db, client };
