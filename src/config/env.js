const dotenv = require('dotenv');

dotenv.config();

const env = {
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/split9'
};

module.exports = env;
