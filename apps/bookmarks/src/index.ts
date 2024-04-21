import { mongoApiServerConfig as config, load } from 'mongo-api-server';
import type { Registry } from './types';

export { config, type Registry };

export function start(sr?: Registry) {
  return load(`${__dirname}/modules`, sr);
}

if (process.env.NODE_ENV === 'production') {
  void start();
}
