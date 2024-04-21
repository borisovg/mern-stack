import { validateBody } from '../../../validate-body';
import { type ServiceRegistry } from '../../../types';
import { createBookmarkSchema } from '../schemas';

export function $onRun(sr: ServiceRegistry) {
  sr.express.app.post('/api/bookmarks', async (req, res) => {
    try {
      const body = validateBody(createBookmarkSchema, req.body);

      try {
        const result = await sr.bookmarks.model.create(body);
        res.json({ result });
      } catch (e) {
        sr.express.returnError(req, res, e);
      }
    } catch (e) {
      sr.express.returnError(req, res, e, 400);
    }
  });
}
