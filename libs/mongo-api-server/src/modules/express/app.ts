import express from 'express';
import { ServiceRegistry } from '../../types';
import { makeCtxMiddleware } from './ctx-middleware';
import { makeLogMiddleware } from './log-middleware';

export function $onBind(sr: ServiceRegistry) {
  const app = express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(makeCtxMiddleware(sr))
    .use(makeLogMiddleware(sr));

  sr.express = sr.express || {};
  sr.express.app = app;
}
