'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFoundHandler = require('./error-handlers/404.js');
const authRoutes = require('./auth/routes.js');
const v1Routes = require('./api/routes/v1.js');
const v2Routes = require('./api/routes/v2.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v2', authRoutes);
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
app.get('/', (req, res) => {
  res.send('Home Page');
});
app.get('/bad', (req, res) => {
  throw new Error();
});

// Catchalls
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`Server Up on ${PORT}`);
    });
  },
};
