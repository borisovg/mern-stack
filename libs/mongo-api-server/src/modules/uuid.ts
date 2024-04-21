import { v4 } from 'uuid';
import { ServiceRegistry } from '../types';

export async function $onBind(sr: ServiceRegistry) {
  sr.uuid = new UuidModule();
}

export class UuidModule {
  v4: () => string;

  constructor() {
    this.v4 = v4;
  }
}
