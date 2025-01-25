const express = require('express');
const bodyParser = require('body-parser');
const displayRoutes = require('./routes/displayRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/display', displayRoutes);

module.exports = app;
