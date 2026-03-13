const http = require('http');
const app = require('./app');
const env = require('./config/env');
const connectDatabase = require('./config/database');
const logger = require('./config/logger');

async function startServer() {
  try {
    await connectDatabase();

    const server = http.createServer(app);

    server.listen(env.port, () => {
      logger.info(`Server attivo su http://localhost:${env.port}`);
    });
  } catch (error) {
    logger.error('Avvio del server fallito', error);
    process.exit(1);
  }
}

startServer();
