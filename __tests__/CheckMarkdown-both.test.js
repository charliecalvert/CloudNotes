import { getFrontMatterAndTocReport,
  hasFrontMatter, hasTocCode } from 'elven-jekyll-post';
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

  test('hasFrontMatter()', async() => {
    const result = await hasFrontMatter(fileName);
    // "hasElfCode": true, "hasTocCode": true
    expect(result).toBe(true);
  });

  test('hasTocCode', async() => {
    const result = await hasFrontMatter(fileName);
    // "hasElfCode": true, "hasTocCode": true
    expect(result).toBe(true);
  });

  test('markdown', async() => {
    const result = await getFrontMatterAndTocReport(fileName);
    expect(result.markdown).toContain('title: Hello');
  });

  test('markdown', async() => {
    const result = await getFrontMatterAndTocReport(fileName);
    expect(result.markdown).not.toContain('margietitle: Hello');
  });
});

