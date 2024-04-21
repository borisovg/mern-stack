import { deepStrictEqual, strictEqual } from 'assert';
import { config, start } from '../../..';
import { createSandbox } from 'sinon';
import { HttpClient } from 'test-helpers';
import { type ServiceRegistry } from '../../../types';

describe('modules/bookmarks/api/list', () => {
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

  it('should return a list of bookmarks', async () => {
    const data = [{ uuid: 'test-uuid-1' }, { uuid: 'test-uuid-2' }];
    const spy = mockCollection.find.returns({ toArray: () => data });

    const { body, statusCode } = await client.get('/api/bookmarks');
    strictEqual(statusCode, 200);
    deepStrictEqual(await body.json(), { results: data });

    strictEqual(spy.callCount, 1);
    deepStrictEqual(spy.firstCall.args[0], {});
  });

  it('should return 500 if model call throws an error', async () => {
    sandbox.stub(sr.bookmarks.model, 'list').throws('Test Error');

    const { statusCode } = await client.get('/api/bookmarks');
    strictEqual(statusCode, 500);
  });
});
