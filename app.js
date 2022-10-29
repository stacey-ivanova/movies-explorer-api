require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { cors } = require('./middlewares/cors');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/handleError');
const { limiter } = require('./utils/rateLimiter');
const dataBaseUrlDev = require('./utils/constants');

const { PORT = 3000, NODE_ENV, DB_ENV } = process.env;

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? DB_ENV : dataBaseUrlDev);

app.use(requestLogger);

app.use(cors);

app.use(limiter);

app.use(helmet());

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
