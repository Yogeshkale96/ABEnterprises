const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const security = require('./config/security');
const corsOptions = require('./config/cors');
const apiRoutes = require('./routes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(security.helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));
app.use(cookieParser());

app.use('/api/v1', apiLimiter, apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
