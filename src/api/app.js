import { exec } from 'child_process';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import csrf from 'csurf';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { readFileSync } from 'fs';
import swaggerUi from 'swagger-ui-express';
import { getTime } from './Time.js';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
});
const openApiSpecification = JSON.parse(readFileSync('openapi.json'));

const COOKIES_SECRET = crypto.randomBytes(32).toString('hex');

const csrfProtect = csrf({ cookie: { secure: true } });
const app = express();
app.use(helmet());

const corsOptions = {
  origin: ['localhost', /\.okteto\.net$/], // Compliant
};
app.use(cookieParser(COOKIES_SECRET));
app.set('trust proxy', 1);

app.use('/health', limiter, cors(corsOptions), csrfProtect, (_, response) => {
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

app.get(
  '/api/v1/time/:time',
  cors(corsOptions),
  csrfProtect,
  (req, response) => {
    try {
      return response.status(200).json(getTime(req.params.time));
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  },
);

export default app;
