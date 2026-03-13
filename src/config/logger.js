const logger = {
  info(message, meta) {
    if (meta) {
      console.log(`[INFO] ${message}`, meta);
      return;
    }

    console.log(`[INFO] ${message}`);
  },
  error(message, meta) {
    if (meta) {
      if (meta instanceof Error) {
        console.error(`[ERROR] ${message}\n`, meta.stack);
      } else {
        console.error(`[ERROR] ${message}`, meta);
      }
      return;
    }

    console.error(`[ERROR] ${message}`);
  }
};

module.exports = logger;
