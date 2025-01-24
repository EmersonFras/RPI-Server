const db = require('../db/db');

// Create table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS display (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_time TEXT,
    stop_time TEXT
  )`,
  (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table created or already exists.');
    }
  }
);

// Export database queries
module.exports = {
  getDisplaySettings: (callback) => {
    db.get(`SELECT * FROM display LIMIT 1`, [], (err, row) => {
      callback(err, row);
    });
  },
  updateDisplaySettings: (start, stop, callback) => {
    db.run(
      `UPDATE display SET start_time = ?, stop_time = ? WHERE id = 1`,
      [start, stop],
      function (err) {
        callback(err, this.changes);
      }
    );
  },
};
