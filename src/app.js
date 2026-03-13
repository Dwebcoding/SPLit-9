const path = require('path');
const express = require('express');
const morgan = require('morgan');
const pagesRouter = require('./routes/pages');
const sopralluoghiRouter = require('./routes/sopralluoghi');
const tecniciRouter = require('./routes/tecnici');
const metricheRouter = require('./routes/metriche');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();
const publicDir = path.join(__dirname, 'public');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDir));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(pagesRouter);
app.use('/api/sopralluoghi', sopralluoghiRouter);
app.use('/api/tecnici', tecniciRouter);
app.use('/api/metriche', metricheRouter);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
