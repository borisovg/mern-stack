import { type Collection } from 'mongo-api-server';
import { type Registry } from '../types';
import { type CreateBookmarkBody, type Bookmark } from './schemas';

export function $onBind(sr: Registry) {
  sr.bookmarks = new BookmarkModel(sr);
}

export class BookmarkModel {
  collection: Collection;

  constructor(private sr: Registry) {
    this.collection = sr.mongo.db(sr.config.mongo.db).collection('bookmarks');
  }

  async create(data: CreateBookmarkBody) {
    const uuid = this.sr.uuid.v4();
    await this.collection.insertOne({ ...data, uuid });
    return { uuid };
  }

  async delete(uuid: string) {
    const res = await this.collection.deleteOne({ uuid });
    return { uuid, deleted: Boolean(res.deletedCount) };
  }

  list() {
    return this.collection
      .find<Bookmark>({}, { projection: { _id: 0 } })
      .toArray();
  }
}
