import { deepStrictEqual, strictEqual } from 'assert';
import { config, start } from '../../start';
import { request } from 'undici';
import { createSandbox } from 'sinon';
import * as helpers from '../../helpers';
import { type ServiceRegistry } from '../../types';

describe('modules/bookmarks/api', () => {
  const sr = {} as ServiceRegistry;
  const port = 10001;
  const baseUrl = `http://localhost:${port}`;
  const sandbox = createSandbox();
  const mockCollection = {
    deleteOne: sandbox.stub(),
    insertOne: sandbox.stub(),
    find: sandbox.stub(),
  };

  before(async () => {
    sandbox.replace(config.server, 'port', port);
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

  describe('POST /api/bookmarks', () => {
    it('should add a bookmark', async () => {
      const data = { title: 'test-title', url: 'test-url' };
      const uuid = 'test-uuid';

      sandbox.stub(helpers, 'makeUuid').returns(uuid);

      const { body, statusCode } = await request(`${baseUrl}/api/bookmarks`, {
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
        method: 'POST',
      });
      strictEqual(statusCode, 200);
      deepStrictEqual(await body.json(), { result: { uuid } });

      const spy = mockCollection.insertOne;
      strictEqual(spy.callCount, 1);
      deepStrictEqual(spy.firstCall.args[0], { ...data, uuid });
    });

    it('should validate request', async () => {
      const { statusCode } = await request(`${baseUrl}/api/bookmarks`, {
        body: JSON.stringify({ foo: 'bar' }),
        headers: { 'content-type': 'application/json' },
        method: 'POST',
      });
      strictEqual(statusCode, 400);
    });
  });

  describe('GET /api/bookmarks', () => {
    it('should return a list of bookmarks', async () => {
      const data = [{ uuid: 'test-uuid-1' }, { uuid: 'test-uuid-2' }];
      const spy = mockCollection.find.returns({ toArray: () => data });

      const { body, statusCode } = await request(`${baseUrl}/api/bookmarks`);
      strictEqual(statusCode, 200);
      deepStrictEqual(await body.json(), { results: data });

      strictEqual(spy.callCount, 1);
      deepStrictEqual(spy.firstCall.args[0], {});
    });
  });

  describe('DELETE /api/bookmarks/:id', () => {
    it('should delete a bookmark', async () => {
      const uuid = helpers.makeUuid();
      const spy = mockCollection.deleteOne.returns({ deletedCount: 1 });

      const { body, statusCode } = await request(
        `${baseUrl}/api/bookmarks/${uuid}`,
        {
          method: 'DELETE',
        },
      );
      strictEqual(statusCode, 200);
      deepStrictEqual(await body.json(), { result: { uuid, deleted: true } });

      strictEqual(spy.callCount, 1);
      deepStrictEqual(spy.firstCall.args[0], { uuid });
    });

    it('should return 200 even if nothing was deleted', async () => {
      mockCollection.deleteOne.returns({ deletedCount: 0 });

      const uuid = 'foo';
      const { body, statusCode } = await request(
        `${baseUrl}/api/bookmarks/${uuid}`,
        {
          method: 'DELETE',
        },
      );
      strictEqual(statusCode, 200);
      deepStrictEqual(await body.json(), { result: { uuid, deleted: false } });
    });
  });
});
