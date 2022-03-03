/***************
 * test check-markdown
 **************/

describe('CheckMarkdown Suite', function () {
  'use strict';
  const debug = require('debug')('check-markdown');
  const checkMarkdown = require('../CheckMarkdown');

  test('hasElfCode()', async() => {
    const result = await checkMarkdown.getElfCode('./__tests__/About.md');
    // "hasElfCode": true, "hasTocCode": true
    expect(result.hasElfCode).toBe(true);
  });

  test('hasTocCode', async() => {
    const result = await checkMarkdown.getElfCode('./__tests__/About.md');
    // "hasElfCode": true, "hasTocCode": true
    expect(result.hasTocCode).toBe(true);
  });

  test('markdown', async() => {
    const result = await checkMarkdown.getElfCode('./__tests__/About.md');
    // "hasElfCode": true, "hasTocCode": true
    expect(result.markdown).toContain('title: Hello');
  });

  test('markdown', async() => {
    const result = await checkMarkdown.getElfCode('./__tests__/About.md');
    // "hasElfCode": true, "hasTocCode": true
    expect(result.markdown).not.toContain('atitle: Hello');
  });
});