import test from 'node:test';
import assert from 'node:assert';
import { searchUnsplash } from '../controllers/unsplash.controller.ts';

test('searchUnsplash controller returns 400 when query is empty', async () => {
  const req = { query: { query: '' } };
  let status = 200;
  let jsonBody = null;

  const res = {
    status: (s) => {
      status = s;
      return {
        json: (body) => {
          jsonBody = body;
        }
      };
    }
  };

  await searchUnsplash(req, res);
  assert.strictEqual(status, 400);
  assert.deepStrictEqual(jsonBody, { error: 'Query is required and cannot be empty' });
});
