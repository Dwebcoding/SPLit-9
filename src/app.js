const path = require('path');
const express = require('express');
const morgan = require('morgan');
const pagesRouter = require('./routes/pages');
const sopralluoghiRouter = require('./routes/sopralluoghi');
const tecniciRouter = require('./routes/tecnici');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();
const publicDir = path.join(__dirname, 'public');

console.log('Static publicDir =', publicDir);
console.log('app __dirname =', __dirname);
console.log('process.cwd() =', process.cwd());
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
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
