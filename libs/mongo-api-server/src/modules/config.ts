import { config as coreConfig } from '@borisovg/service-core';

import type { LoggerOptions } from 'pino';
import { ServiceRegistry } from '../types';

const {
  HTTP_PORT = '8000',
  LOG_LEVEL = 'info',
  MONGO_DB = 'test',
  MONGO_URI = 'mongodb://localhost:27017/test',
} = process.env;

const pinoOptions: LoggerOptions = {};

export function $onBind(app: ServiceRegistry) {
  app.config = config;
}

export const config = {
  core: coreConfig,
  http: {
    staticDir: './public',
  },
  logger: {
    ecsConfig: {},
    level: LOG_LEVEL,
    pinoOptions,
  },
  mongo: {
    db: MONGO_DB,
    uri: MONGO_URI,
  },
  server: {
    port: parseInt(HTTP_PORT, 10),
  },
};
