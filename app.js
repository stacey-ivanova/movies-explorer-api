const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

const router = require('./routes/index');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
const { PORT = 3000 } = process.env;

app.use(requestLogger);
app.use(cors);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.listen(PORT);