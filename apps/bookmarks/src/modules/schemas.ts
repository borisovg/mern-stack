import * as z from 'zod';

export const bookmarkSchema = z.object({
  description: z.string().trim().optional(),
  title: z.string().trim().min(1),
  url: z.string().trim().min(1).url(),
  uuid: z.string(),
});

export const createBookmarkSchema = bookmarkSchema.omit({ uuid: true }).strip();

export type CreateBookmarkBody = z.infer<typeof createBookmarkSchema>;

export type Bookmark = z.infer<typeof bookmarkSchema>;
