import { mongoApiServerConfig as config, load } from 'mongo-api-server';
import type { ServiceRegistry } from './types';

export { config };

export async function start(sr?: ServiceRegistry) {
  return load(`${__dirname}/modules`, sr);
}

if (process.env.NODE_ENV === 'production') {
  void start();
}
