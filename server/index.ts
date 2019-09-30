import 'module-alias/register';
import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import nextjs from './lib/next';
import PagesRouter from './routers/pages';
import ExampleRouter from './routers/example';
import { responseErrorHandler } from 'express-response-errors/lib/middleware';

const app: express.Application = express();

nextjs.nextApp.prepare().then(async () => {
  const port = process.env.PORT || 8000;

  app.use(
    morgan(':method :url :status', {
      skip: (req: express.Request) => req.url.startsWith('/_next/'),
    }),
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('public'));

  app.use(PagesRouter);
  app.use(ExampleRouter);

  app.use(responseErrorHandler);

  app.get('*', (req, res) => {
    nextjs.handle(req, res);
  });

  app.listen(port, () => {
    console.log(`\n\nstarted on port ${port}\n\n`); // tslint:disable-line no-console
  });
});
