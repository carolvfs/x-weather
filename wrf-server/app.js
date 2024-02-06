// Bring in our dependencies
const express = require('express')
const bodyParser = require("body-parser");
const routes = require('./routes');

// Base application
const app = express();

// request parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Connect all our routes to our application
// const www = express.static('public/build');
const www = express.static('public/build');
app.use(www);
app.use('/', routes);

// Turn on that server!
app.listen(3000, () => {
  console.log('App listening on port 3000');
});
