import { type ServiceRegistry } from '../../../types';

export function $onRun(sr: ServiceRegistry) {
  sr.express.app.delete('/api/bookmarks/:uuid', async (req, res) => {
    try {
      const uuid = req.params.uuid;
      const deleted = await sr.bookmarks.model.delete(uuid);

      res.json({ result: { uuid, deleted } });
    } catch (e) {
      sr.express.returnError(req, res, e);
    }
  });
}
