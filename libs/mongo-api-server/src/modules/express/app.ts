import express from 'express';
import { ServiceRegistry } from '../../types';
import { LogMiddlewareModule } from './log-middleware';

export function $onBind(sr: ServiceRegistry) {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(new LogMiddlewareModule(sr).makeMiddleware());

  sr.express = sr.express || {};
  sr.express.app = app;
}
