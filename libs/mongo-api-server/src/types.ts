import type { Server } from 'http';
import type {
  CoreServiceRegistry as CoreServiceRegistry,
  Logger,
} from '@borisovg/service-core';
import type { Express } from 'express';
import type { MongoClient } from 'mongodb';
import type { config } from './modules/config';
import type { EcsModule } from './modules/ecs';

export type ServiceRegistry = CoreServiceRegistry & {
  config: typeof config;
  ecs: EcsModule;
  express: {
    app: Express;
    server: Server;
  };
  log: Logger;
  mongo: MongoClient;
};
