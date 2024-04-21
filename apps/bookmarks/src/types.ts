import { type MongoApiServerRegistry } from 'mongo-api-server';
import { BookmarkModel } from './modules/model';

export type Registry = MongoApiServerRegistry & {
  bookmarks: BookmarkModel;
};
