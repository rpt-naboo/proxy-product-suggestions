const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

let port = 4201;
if (process.env.NODE_ENV === 'production') {
	port = 3000;
}

require('./routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: `Welcome to the beginning of naboo. env as ${process.env.NODE_ENV}, db name ${process.env.DB_NAME}`,
}));

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Exapmle app listening on port ${port}!`);
  });
}

module.exports = app;
