import express, { Express } from 'express';
import { ServiceRegistry } from '../../types';
import { makeCtxMiddleware } from './ctx-middleware';
import { makeLogMiddleware } from './log-middleware';

export function makeExpressApp(sr: ServiceRegistry): Express {
  const app = express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(makeCtxMiddleware(sr))
    .use(makeLogMiddleware(sr));

  return app;
}
