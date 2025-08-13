require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });

const { Client } = require('pg');
const databaseUrl = process.env.DATABASE_URL;

console.log("DATABASE_URL:", databaseUrl);

async function testConnection() {
  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined.");
    return;
  }

  const client = new Client({ connectionString: databaseUrl });

  try {
    await client.connect();
    console.log("Successfully connected to the database!");
    const res = await client.query('SELECT 1 + 1 AS result');
    console.log("Query result:", res.rows[0].result);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  } finally {
    await client.end();
  }
}

testConnection();