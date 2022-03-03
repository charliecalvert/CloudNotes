/***************
 * test check-markdown
 **************/

describe('CheckMarkdown ELF Suite', function () {
  'use strict';
  const debug = require('debug')('check-markdown');
  const checkMarkdown = require('../CheckMarkdown');

  const fileName = './__tests__/About-elf.md';

  test('hasElfCode()', async() => {
    const result = await checkMarkdown.getElfCode(fileName);
    // "hasElfCode": true, "hasTocCode": true
    expect(result.hasElfCode).toBe(true);
  });

  test('hasTocCode', async() => {
    const result = await checkMarkdown.getElfCode(fileName);
    // "hasElfCode": true, "hasTocCode": true
    expect(result.hasTocCode).toBe(false);
  });

  test('markdown', async() => {
    const result = await checkMarkdown.getElfCode(fileName);
    expect(result.markdown).toContain('title: Hello');
  });

  test('markdown', async() => {
    const result = await checkMarkdown.getElfCode(fileName);
    expect(result.markdown).not.toContain('margietitle: Hello');
  });
});

