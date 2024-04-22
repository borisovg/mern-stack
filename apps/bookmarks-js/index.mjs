import { load } from 'mongo-api-server';
import z from 'zod';

const sr = await load();
const collection = sr.mongo.db('test').collection('bookmarks');

const createSchema = z
  .object({
    description: z.string().trim().optional(),
    title: z.string().trim().min(1),
    url: z.string().trim().min(1).url(),
  })
  .strip();

sr.express.app.get('/api/bookmarks', async (req, res) => {
  try {
    const results = await collection
      .find({}, { projection: { _id: 0 } })
      .toArray();
    res.json({ results });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

sr.express.app.post('/api/bookmarks', async (req, res) => {
  try {
    const body = createSchema.parse(req.body);

    try {
      const uuid = sr.uuid.v4();
      await collection.insertOne({ uuid, ...body });
      res.json({ result: { uuid } });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

sr.express.app.delete('/api/bookmarks/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params;
    const { deletedCount } = await collection.deleteOne({ uuid });
    res.json({ result: { uuid, deleted: Boolean(deletedCount) } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
