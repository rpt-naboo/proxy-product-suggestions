const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 8080;

require('./routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of naboo.',
}));

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Exapmle app listening on port ${port}!`);
  });
}

module.exports = app;
