import type {
  CoreServiceRegistry as CoreServiceRegistry,
  Logger,
} from '@borisovg/service-core';
import type { CtxModule } from './modules/ctx';
import type { MongoClient } from 'mongodb';
import type { config } from './modules/config';
import type { EcsModule } from './modules/ecs';
import type { ExpressModule } from './modules/express';
import type { UuidModule } from './modules/uuid';

export type ServiceRegistry = CoreServiceRegistry & {
  config: typeof config;
  ctx: CtxModule;
  ecs: EcsModule;
  express: ExpressModule;
  log: Logger;
  mongo: MongoClient;
  uuid: UuidModule;
};
