import type { Request, Response } from 'express';
import type { EcsModule } from '../ecs';
import type { ServiceRegistry } from '../../types';

type GetEventFn = ReturnType<EcsModule['makeEventFn']>;

export class LogMiddlewareModule {
  constructor(private sr: ServiceRegistry) {}

  logRequest(req: Request) {
    this.sr.log.debug({
      http: { request: { method: req.method } },
      message: 'http request',
      url: { path: req.url },
    });
  }

  logResponse(req: Request, res: Response, getEvent: GetEventFn) {
    this.sr.log.info({
      event: getEvent('http-response'),
      http: {
        request: { method: req.method },
        response: { status_code: res.statusCode },
      },
      message: 'http response',
      url: { path: req.url },
    });
  }

  makeMiddleware() {
    return (req: Request, res: Response, next: () => void) => {
      const getEvent = this.sr.ecs.makeEventFn();

      this.logRequest(req);

      res.once('finish', () => {
        this.logResponse(req, res, getEvent);
      });

      next();
    };
  }
}
