import { deepStrictEqual, strictEqual } from 'assert';
import { config, start } from '../../..';
import { createSandbox } from 'sinon';
import { HttpClient } from 'test-helpers';
import { type ServiceRegistry } from '../../../types';

describe('modules/bookmarks/api/delete', () => {
  const sr = {} as ServiceRegistry;
  const client = new HttpClient({ port: 10001 });
  const sandbox = createSandbox();
  const mockCollection = {
    deleteOne: sandbox.stub(),
    insertOne: sandbox.stub(),
    find: sandbox.stub(),
  };

  before(async () => {
    sandbox.replace(config.server, 'port', client.port);
    await start(sr);
  });

  beforeEach(() => {
    sandbox.replace(
      sr.bookmarks,
      'collection',
      mockCollection as unknown as typeof sr.bookmarks.collection,
    );
  });

  after(() => sr.core.shutdown.run());

  afterEach(sandbox.restore);

  it('should delete a bookmark', async () => {
    const uuid = 'test-uuid';
    const spy = mockCollection.deleteOne.returns({ deletedCount: 1 });

    const { body, statusCode } = await client.delete(`/api/bookmarks/${uuid}`);
    strictEqual(statusCode, 200);
    deepStrictEqual(await body.json(), { result: { uuid, deleted: true } });

    strictEqual(spy.callCount, 1);
    deepStrictEqual(spy.firstCall.args[0], { uuid });
  });

  it('should return 200 even if nothing was deleted', async () => {
    mockCollection.deleteOne.returns({ deletedCount: 0 });

    const uuid = 'foo';
    const { body, statusCode } = await client.delete(`/api/bookmarks/${uuid}`);
    strictEqual(statusCode, 200);
    deepStrictEqual(await body.json(), { result: { uuid, deleted: false } });
  });

  it('should return 500 if model call throws an error', async () => {
    sandbox.stub(sr.bookmarks.model, 'delete').throws('Test Error');

    const { statusCode } = await client.delete('/api/bookmarks/foo');
    strictEqual(statusCode, 500);
  });
});
