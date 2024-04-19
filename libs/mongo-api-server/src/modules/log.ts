import { getLogger } from '@borisovg/service-core';
import { ServiceRegistry } from '../types';

export function $onBind(app: ServiceRegistry) {
  app.log = getLogger();
}
