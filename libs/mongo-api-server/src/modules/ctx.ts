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
  trace: {
    spanId?: string;
    traceId?: string;
    traceparent?: string;
  };
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

  getTraceMeta(ctx?: Context) {
    ctx = ctx || this.get();
    return ctx
      ? { trace: { id: ctx.trace.traceId }, span: { id: ctx.trace.spanId } }
      : {};
  }

  make() {
    const ctx: Context = {
      mongoQueries: new Map(),
      trace: {},
    };

    return ctx;
  }
}
