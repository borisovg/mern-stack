import { Registry } from '../../types';

export function $onRun(sr: Registry) {
  sr.express.app.get('/api/bookmarks', async (req, res) => {
    try {
      const results = await sr.bookmarks.list();
      res.json({ results });
    } catch (e) {
      sr.express.returnError(req, res, e);
    }
  });
}
