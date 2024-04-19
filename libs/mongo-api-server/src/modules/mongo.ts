import { MongoClient } from 'mongodb';
import { ServiceRegistry } from '../types';

export async function $onBind(sr: ServiceRegistry) {
  sr.mongo = new MongoClientModule(sr);
}

export async function $onShutdown(sr: ServiceRegistry) {
  return sr.mongo.close();
}

export class MongoClientModule extends MongoClient {
  constructor(sr: ServiceRegistry) {
    super(sr.config.mongo.uri, { monitorCommands: true });

    this.on('commandStarted', (ev) => {
      const ctx = sr.ctx.get();
      if (!ctx) {
        return;
      }

      ctx.mongoQueries.set(ev.requestId, {
        cmd: ev.commandName,
        collection: ev.command[ev.commandName],
        data: {
          deletes: ev.command.deletes,
          filter: ev.command.filter,
        },
        getEvent: sr.ecs.makeEventFn(),
      });
    });

    this.on('commandSucceeded', (ev) => {
      const meta = sr.ctx.get()?.mongoQueries.get(ev.requestId);
      if (!meta) {
        return;
      }

      sr.log.debug({
        data: meta.data,
        event: {
          ...meta.getEvent('mongo-response'),
          action: meta.cmd,
          dataset: meta.collection,
        },
        message: 'mongo response',
      });
    });

    this.on('commandFailed', (ev) => {
      const meta = sr.ctx.get()?.mongoQueries.get(ev.requestId);
      if (!meta) {
        return;
      }

      sr.log.error({
        data: meta.data,
        error: {
          id: ev.failure.name,
          message: ev.failure.message,
        },
        event: {
          ...meta.getEvent('mongo-response'),
          action: meta.cmd,
          dataset: meta.collection,
        },
        message: 'mongo error response',
      });
    });
  }
}
