const app = require('./app');
const env = require('./config/env');
const logger = require('./utils/logger');
const { checkConnection } = require('./config/database');

const server = app.listen(env.port, () => {
  logger.info(` http://localhost:${env.port}`);
  checkConnection().catch((err) => {
    logger.warn(`MySQL not reachable at startup: ${err.message}`);
    logger.warn('Run `npm run db:migrate` and `npm run db:seed` after configuring .env');
  });
});

process.on('SIGTERM', () => server.close(() => process.exit(0)));
process.on('SIGINT', () => server.close(() => process.exit(0)));
process.on('unhandledRejection', (err) => logger.error('Unhandled rejection', { stack: err.stack }));
