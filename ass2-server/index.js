// Load env files from .env file
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');

const app = express();

// const WHITELISTED_ORIGINS = ['http://localhost:3000', 'http://localhost:8081'];// Configure CORS settings

// app.use(cors({ origin: WHITELISTED_ORIGINS, credentials: true }));

// Add body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', indexRouter);
app.use(express.static(path.join(__dirname, '../ass2-client/build')));

app.get('/*', (_, res) =>
  res.sendFile(path.join(__dirname, '../ass2-client/build', 'index.html'))
);

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log('server is up on port', port);
});
