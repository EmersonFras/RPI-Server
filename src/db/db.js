const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const dbPath = path.resolve(__dirname, '../../data/database.sqlite');

// Create or connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Export the database connection
module.exports = db;
