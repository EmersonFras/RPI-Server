const displayModel = require('../models/displayModel');

// Get display settings
exports.getDisplay = (req, res) => {
  displayModel.getDisplaySettings((err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch data' });
    }
    res.json(row || { start_time: null, stop_time: null });
  });
};

// Update display settings
exports.updateDisplay = (req, res) => {
  const { start_time, stop_time } = req.body;
  displayModel.updateDisplaySettings(start_time, stop_time, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update data' });
    }
    res.json({ success: changes > 0 });
  });
};
