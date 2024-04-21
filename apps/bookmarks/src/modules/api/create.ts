import { Registry } from '../../types';
import { createBookmarkSchema } from '../schemas';

export function $onRun(sr: Registry) {
  sr.express.app.post('/api/bookmarks', async (req, res) => {
    try {
      const body = createBookmarkSchema.parse(req.body);

      try {
        const result = await sr.bookmarks.create(body);
        res.json({ result });
      } catch (e) {
        sr.express.returnError(req, res, e);
      }
    } catch (e) {
      sr.express.returnError(req, res, e, 400);
    }
  });
}
