import type { Collection, MongoApiServerRegistry } from 'mongo-api-server';
import type { BookmarksModel } from './modules/bookmarks/models';

export type ServiceRegistry = MongoApiServerRegistry & {
  bookmarks: {
    collection: Collection;
    model: BookmarksModel;
  };
};
