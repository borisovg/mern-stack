import type { Request, Response } from 'express';
import type { EcsModule } from '../ecs';
import type { ServiceRegistry } from '../../types';

type GetEventFn = ReturnType<EcsModule['makeEventFn']>;

export function makeLogMiddleware(sr: ServiceRegistry) {
  function logRequest(req: Request) {
    sr.log.debug({
      http: { request: { method: req.method } },
      message: 'http request',
      url: { path: req.url },
    });
  }

  function logResponse(req: Request, res: Response, getEvent: GetEventFn) {
    sr.log.info({
      event: getEvent('http-response'),
      http: {
        request: { method: req.method },
        response: { status_code: res.statusCode },
      },
      message: 'http response',
      url: { path: req.url, route: req.route.path },
    });
  }

  return (req: Request, res: Response, next: () => void) => {
    const getEvent = sr.ecs.makeEventFn();

    logRequest(req);

    res.once('finish', () => {
      logResponse(req, res, getEvent);
    });

    next();
  };
}
