import { load as loadCore, setLogger } from '@borisovg/service-core';
import { logger } from './logger';
import { ServiceRegistry } from './types';

export type { Handler, Request, Response } from 'express';
export type { Collection } from 'mongodb';
export { config as mongoApiServerConfig } from './modules/config';
export type { ServiceRegistry as MongoApiServerRegistry };

export async function load<T extends ServiceRegistry>(path = '', app?: T) {
  setLogger(logger);
  return loadCore([`${__dirname}/modules`, path], app);
}
