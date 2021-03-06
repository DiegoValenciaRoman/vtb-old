const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// rutas
app.use('/api', routes);


module.exports = app;