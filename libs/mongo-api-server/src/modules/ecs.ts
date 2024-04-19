import type { ServiceRegistry } from '../types';

export function $onBind(app: ServiceRegistry) {
  app.ecs = new EcsModule(app);
}

export class EcsModule {
  constructor(private app: ServiceRegistry) {}

  makeEventFn() {
    const timer = this.app.core.timing.makeTimerNs();
    return (id: string) => ({ id, duration: timer() });
  }
}
