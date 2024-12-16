const mysql = require('mysql2/promise')

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',    // Your database host
      user: 'root',         // Your database username
      password: '', // Your database password
      database: 'pk_db' // Your database name
    });
    console.log('Connected to the MySQL database.');
    return connection;
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
}

module.exports = connectToDatabase;