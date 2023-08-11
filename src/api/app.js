const { exec } = require('child_process');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const csrf = require('csurf');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
});

const swaggerUi = require('swagger-ui-express');
const openApiSpecification = require('../../openapi.json');

const COOKIES_SECRET = crypto.randomBytes(32).toString('hex');
const getTime = require('./Time');

const csrfProtect = csrf({ cookie: true });
const app = express();
app.use(helmet());
app.use(cors());
app.use(cookieParser(COOKIES_SECRET));

app.use('/health', limiter, csrfProtect, (_, response) => {
  exec('/usr/bin/test -f "/goss/goss" && /goss/goss validate', (error) => {
    console.log('Health check output', error);

    return response.sendStatus(200);
  });
});

app.use(
  '/api-docs',
  csrfProtect,
  swaggerUi.serve,
  swaggerUi.setup(openApiSpecification),
);

app.get('/api/v1/time/:time', csrfProtect, (req, response) => {
  try {
    return response.status(200).json(getTime(req.params.time));
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

module.exports = app;
