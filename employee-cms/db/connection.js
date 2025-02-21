const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables

// Database connection configuration
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Test the database connection
pool.connect()
    .then(() => console.log("✅ Connected to the database successfully."))
    .catch((err) => console.error("❌ Database connection error:", err));

module.exports = pool;
