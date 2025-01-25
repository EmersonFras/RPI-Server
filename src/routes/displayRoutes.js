const express = require('express');
const router = express.Router();
const displayController = require('../controllers/displayController');

// Define routes
router.get('/', displayController.getDisplay);
router.post('/', displayController.updateDisplay);

module.exports = router;
