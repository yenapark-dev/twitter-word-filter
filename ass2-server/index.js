// Load env files from .env file
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');

const app = express();

// Configure CORS settings
const WHITELISTED_ORIGINS = ['http://localhost:3000', 'http://localhost:8080'];
app.use(cors({ origin: WHITELISTED_ORIGINS, credentials: true }));

// Add body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', indexRouter);
app.use(express.static(path.join(__dirname, '../client/build')));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('server is up on port', port);
});
