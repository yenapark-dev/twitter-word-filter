// Load env files from .env file
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');

const app = express();

// Add body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', indexRouter);
app.use(express.static(path.join(__dirname, '../ass2-client/build')));

app.get('/*', (_, res) =>
  res.sendFile(path.join(__dirname, '../ass2-client/build', 'index.html'))
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('server is up on port', port);
});
