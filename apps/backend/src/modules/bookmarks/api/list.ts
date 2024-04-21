import { type ServiceRegistry } from '../../../types';

export function $onRun(sr: ServiceRegistry) {
  sr.express.app.get('/api/bookmarks', async (req, res) => {
    try {
      const results = await sr.bookmarks.model.list();
      res.json({ results });
    } catch (e) {
      sr.express.returnError(req, res, e);
    }
  });
}
