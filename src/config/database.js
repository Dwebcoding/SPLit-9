const mongoose = require('mongoose');
const env = require('./env');
const logger = require('./logger');

async function connectDatabase() {
  try {
    await mongoose.connect(env.mongoUri);
    logger.info('Connessione a MongoDB completata');
  } catch (error) {
    logger.error('Connessione a MongoDB fallita', error);
    throw error;
  }
}

module.exports = connectDatabase;
