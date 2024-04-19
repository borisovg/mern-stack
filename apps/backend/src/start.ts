import { mongoApiServerConfig, load } from 'mongo-api-server';
import type { ServiceRegistry } from './types';

export { mongoApiServerConfig as config };

export async function start(sr?: ServiceRegistry) {
  return load(`${__dirname}/modules`, sr);
}
