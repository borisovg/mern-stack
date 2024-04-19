import { type ServiceRegistry } from '../../types';
import { createBookmarkSchema } from './schemas';
import { fromZodError } from '../../helpers';

export function $onRun(sr: ServiceRegistry) {
  const { model } = sr.bookmarks;

  sr.express.app.get('/api/bookmarks', async (_req, res) => {
    const results = await model.list();
    res.json({ results });
  });

  sr.express.app.post('/api/bookmarks', async (req, res) => {
    try {
      const body = createBookmarkSchema.parse(req.body);
      const result = await model.create(body);
      res.json({ result });
    } catch (e) {
      const error = fromZodError(e);
      res.status(error.status).json({ error: fromZodError(e) });
    }
  });

  sr.express.app.delete('/api/bookmarks/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const deleted = await model.delete(uuid);

    res.json({ result: { uuid, deleted } });
  });
}
