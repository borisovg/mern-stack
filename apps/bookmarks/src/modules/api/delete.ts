import { Registry } from '../../types';

export function $onRun(sr: Registry) {
  sr.express.app.delete('/api/bookmarks/:uuid', async (req, res) => {
    try {
      const result = await sr.bookmarks.delete(req.params.uuid);
      res.json({ result });
    } catch (e) {
      sr.express.returnError(req, res, e);
    }
  });
}
