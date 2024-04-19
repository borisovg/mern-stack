import { createServer } from 'http';
import { ServiceRegistry } from '../../types';

export function $onBind(sr: ServiceRegistry) {
  sr.express = sr.express || {};
  sr.express.server = createServer(sr.express.app);
}

export function $onLoad(sr: ServiceRegistry) {
  return new Promise<void>((resolve) => {
    const { port } = sr.config.server;

    sr.express.server.listen(port, () => {
      sr.log.info({ message: 'server listening', server: { port } });
      resolve();
    });
  });
}

export function $onShutdown(sr: ServiceRegistry) {
  return new Promise<void>((resolve, reject) => {
    sr.express.server.close((err) => (err ? reject(err) : resolve()));
  });
}
