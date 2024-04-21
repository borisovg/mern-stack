import type { ServiceRegistry } from '../../types';
import type { Bookmark, CreateBookmarkRequest } from './schemas';

export class BookmarksModel {
  constructor(private sr: ServiceRegistry) {}

  async create(doc: CreateBookmarkRequest) {
    const uuid = this.sr.uuid.v4();

    await this.sr.bookmarks.collection.insertOne({ ...doc, uuid });
    return { uuid };
  }

  async delete(uuid: string) {
    const res = await this.sr.bookmarks.collection.deleteOne({ uuid });
    return Boolean(res.deletedCount);
  }

  async list() {
    return this.sr.bookmarks.collection
      .find<Bookmark>({}, { projection: { _id: 0 } })
      .toArray();
  }
}
