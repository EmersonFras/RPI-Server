const db = require('../db/db');

// Create table if it doesn't exist
db.run(
    `CREATE TABLE IF NOT EXISTS display (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      start_time TEXT DEFAULT '00:00',
      stop_time TEXT DEFAULT '23:59'
    )`,
    (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table created or already exists.');
        
        // Insert a row with default values if no rows exist
        db.get("SELECT COUNT(*) AS count FROM display", (err, row) => {
          if (err) {
            console.error('Error checking row count:', err.message);
          } else if (row.count === 0) {
            db.run(
              `INSERT INTO display (start_time, stop_time) VALUES ('00:00', '23:59')`,
              (err) => {
                if (err) {
                  console.error('Error inserting default row:', err.message);
                } else {
                  console.log('Default row inserted.');
                }
              }
            );
          }
        });
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
