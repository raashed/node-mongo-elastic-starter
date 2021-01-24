const express = require('express');
const routes = require("./routes");

const app = express();

require("./configs/mongoose");

app.use(routes);

module.exports = app;
