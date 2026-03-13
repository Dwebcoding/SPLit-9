const mongoose = require('mongoose');
const env = require('./env');
const logger = require('./logger');

let connectionPromise;

async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  try {
    connectionPromise = mongoose.connect(env.mongoUri);
    await connectionPromise;
    logger.info('Connessione a MongoDB completata');
    return mongoose.connection;
  } catch (error) {
    connectionPromise = undefined;
    logger.error('Connessione a MongoDB fallita', error);
    throw error;
  }
}

module.exports = connectDatabase;
