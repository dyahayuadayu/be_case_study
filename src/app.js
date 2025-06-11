const express = require('express');
const app = express();
const routes = require('./routes');
const storeIp = require('./middlewares/storeIp');
const requestId = require('./middlewares/requestId');
const requestLogger = require('./middlewares/requestLogger');
const { errorHandler } = require('./middlewares/errorHandler');

app.use(express.json());
app.use(storeIp);
app.use(requestId);
app.use(requestLogger);
app.use('/api', routes);
app.use(errorHandler);

module.exports = app;
