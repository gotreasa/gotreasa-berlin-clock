const { exec } = require('child_process');
const express = require('express');
const helmet = require('helmet');

const swaggerUi = require('swagger-ui-express');
const openApiSpecification = require('../../openapi.json');
const getTime = require('./Time');

const app = express();
app.use(helmet());

app.use('/health', (_, response) => {
  exec('/usr/bin/test -f "/goss/goss" && /goss/goss validate', (error) => {
    console.log('Health check output', error);

    return response.sendStatus(200);
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification));

app.get('/api/v1/time/:time', (req, response) => {
  try {
    return response.status(200).json(getTime(req.params.time));
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

module.exports = app;
