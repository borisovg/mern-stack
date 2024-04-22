import express, { Express } from 'express';
import { ServiceRegistry } from '../../types';
import { makeCtxMiddleware } from './ctx-middleware';
import { makeLogMiddleware } from './log-middleware';
import { makeTraceMiddleware } from './trace-middleware';

export function makeExpressApp(sr: ServiceRegistry): Express {
  const app = express()
    .use(makeCtxMiddleware(sr))
    .use(makeTraceMiddleware(sr))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(makeLogMiddleware(sr));

  return app;
}
