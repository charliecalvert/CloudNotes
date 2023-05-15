import checkMarkdown from '../lib/getFrontMatter';
import createDebugMessages from 'debug';
const debug = createDebugMessages('check-markdown');
/***************
 * test check-markdown
 **************/

describe('CheckMarkdown Both Suite', function () {
  'use strict';
  /* const debug = require('debug')('check-markdown');
  const checkMarkdown = require('../CheckMarkdown'); */

  const fileName = './__tests__/About-both.md';

  test('hasElfCode()', async() => {
    const result = await checkMarkdown.hasFrontMatter(fileName);
    // "hasElfCode": true, "hasTocCode": true
    expect(result.hasElfCode).toBe(true);
  });

  test('hasTocCode', async() => {
    const result = await checkMarkdown.hasFrontMatter(fileName);
    // "hasElfCode": true, "hasTocCode": true
    expect(result.hasTocCode).toBe(true);
  });

  test('markdown', async() => {
    const result = await checkMarkdown.getFrontMatter(fileName);
    expect(result.markdown).toContain('title: Hello');
  });

  test('markdown', async() => {
    const result = await checkMarkdown.getFrontMatter(fileName);
    expect(result.markdown).not.toContain('margietitle: Hello');
  });
});

