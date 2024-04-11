const { Pool } = require("pg");

// Veritabanı bağlantısı için yapılandırma
const pool = new Pool({
  user: "your_database_user",
  host: "localhost",
  database: "your_database_name",
  password: "your_database_password",
  port: 5432, // Varsayılan PostgreSQL portu
});

module.exports = pool;
