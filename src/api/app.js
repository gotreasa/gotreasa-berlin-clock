const express = require('express');
const helmet = require('helmet');

const swaggerUi = require('swagger-ui-express');
const openApiSpecification = require('../../openapi.json');
const getTime = require('./Time');

const app = express();
app.use(helmet());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification));
app.get('/api/v1/time/:time', async (req, response) => {
  try {
    return response.status(200).json(getTime(req.params.time));
  } catch (error) {
    console.log('The error is ', error.message);

    return response.status(400).json({ message: error.message });
  }
});

module.exports = app;
