import { AsyncLocalStorage } from 'async_hooks';
import { ServiceRegistry } from '../types';

type Context = {
  mongoQueries: Map<
    number,
    {
      cmd: string;
      collection: unknown;
      data: unknown;
      getEvent: ReturnType<ServiceRegistry['ecs']['makeEventFn']>;
    }
  >;
};

export function $onBind(sr: ServiceRegistry) {
  sr.ctx = new CtxModule();
}

export class CtxModule {
  als: AsyncLocalStorage<Context>;

  constructor() {
    this.als = new AsyncLocalStorage();
  }

  get() {
    return this.als.getStore();
  }

  make() {
    const ctx: Context = {
      mongoQueries: new Map(),
    };

    return ctx;
  }
}
