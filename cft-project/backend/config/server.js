const cors = require('cors');

const express = require('express');

const consign = require('consign');

const bodyParser = require('body-parser');

const app = express();

// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

consign()
    .include('./backend/server/routes')
    .then('./backend/config/dbConnection.js')
    .then('./backend/server/models')
    .then('./backend/server/controllers')
    .into(app)

module.exports = app;
