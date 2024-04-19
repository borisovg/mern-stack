import type { Request, Response } from 'express';
import { ServiceRegistry } from '../../types';

export function makeCtxMiddleware(sr: ServiceRegistry) {
  return (_req: Request, _res: Response, next: () => void) => {
    sr.ctx.als.run(sr.ctx.make(), next);
  };
}
