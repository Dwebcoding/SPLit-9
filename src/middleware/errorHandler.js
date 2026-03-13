const logger = require('../config/logger');

function notFoundHandler(req, res) {
  res.status(404).json({
    message: 'Risorsa non trovata'
  });
}

function errorHandler(error, req, res, next) {
  logger.error('Errore non gestito', error);

  if (res.headersSent) {
    return next(error);
  }

  return res.status(500).json({
    message: 'Errore interno del server'
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
