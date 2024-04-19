import { MongoClient } from 'mongodb';
import { ServiceRegistry } from '../types';

export async function $onBind(sr: ServiceRegistry) {
  sr.mongo = new MongoClient(sr.config.mongo.uri);
}

export async function $onShutdown(sr: ServiceRegistry) {
  return sr.mongo.close();
}
