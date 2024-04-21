import { createServer, type Server } from 'http';
import { ServiceRegistry } from '../../types';
import { makeExpressApp } from './app';
import { Request, Response } from 'express';
import { makeError } from './return-error';

export function $onBind(sr: ServiceRegistry) {
  sr.express = new ExpressModule(sr);
}

export function $onLoad(sr: ServiceRegistry) {
  return new Promise<void>((resolve) => {
    const { port } = sr.config.server;

    sr.express.server.listen(port, () => {
      sr.log.info({ message: 'server listening', server: { port } });
      resolve();
    });
  });
}

export function $onShutdown(sr: ServiceRegistry) {
  return new Promise<void>((resolve, reject) => {
    sr.express.server.close((err) => (err ? reject(err) : resolve()));
  });
}

export class ExpressModule {
  app: ReturnType<typeof makeExpressApp>;
  server: Server;

  constructor(private sr: ServiceRegistry) {
    const app = makeExpressApp(sr);

    this.app = app;
    this.server = createServer(app);
  }

  returnError(req: Request, res: Response, err: unknown, statusCode?: number) {
    const error = makeError(err, statusCode);

    this.sr.log.warn({
      error,
      http: {
        request: { method: req.method },
        response: { status_code: error.statusCode },
      },
      message: 'http request error',
      url: { path: req.url },
    });

    res.status(error.statusCode).json({ error });
  }
}
