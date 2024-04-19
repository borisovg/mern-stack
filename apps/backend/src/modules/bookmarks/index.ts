import type { ServiceRegistry } from '../../types';
import { BookmarksModel } from './models';

export async function $onBind(sr: ServiceRegistry) {
  sr.bookmarks = {
    collection: sr.mongo.db().collection('bookmarks'),
    model: new BookmarksModel(sr),
  };
}
