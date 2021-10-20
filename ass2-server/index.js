// Load env files from .env file
require('dotenv').config();

const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');

const app = express();

app.use('/api', indexRouter);
app.use(express.static(path.join(__dirname, '../client/build')));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('server is up on port', port);
});
