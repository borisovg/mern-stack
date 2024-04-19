import { createSandbox } from 'sinon';
import * as start from './start';
import { strictEqual } from 'assert';

describe('index', () => {
  const sandbox = createSandbox();

  afterEach(sandbox.restore);

  it('should run the start function', () => {
    const spy = sandbox.stub(start, 'start');

    require('./index');
    strictEqual(spy.callCount, 1);
  });
});
