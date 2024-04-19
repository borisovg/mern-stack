import zod from 'zod';

export const bookmarkSchema = zod
  .object({
    uuid: zod.string(),
    description: zod.string().optional(),
    url: zod.string(),
    title: zod.string(),
  })
  .strip();

export const createBookmarkSchema = bookmarkSchema.omit({ uuid: true }).strip();

export type Bookmark = zod.infer<typeof bookmarkSchema>;
export type CreateBookmarkRequest = zod.infer<typeof createBookmarkSchema>;
