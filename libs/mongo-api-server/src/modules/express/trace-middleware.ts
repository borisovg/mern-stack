import type { Request, Response } from 'express';
import { ServiceRegistry } from '../../types';
import { traceparent } from 'tctx';

export function makeTraceMiddleware(sr: ServiceRegistry) {
  return (req: Request, _res: Response, next: () => void) => {
    const tpHeader = req.header('traceparent');
    const tp = tpHeader
      ? traceparent.parse(tpHeader) || traceparent.make()
      : traceparent.make();

    const ctx = sr.ctx.get();
    if (ctx) {
      ctx.trace = {
        spanId: tp.parent_id,
        traceId: tp.trace_id,
        traceparent: tp.toString(),
      };
    }

    next();
  };
}
