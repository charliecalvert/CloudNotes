import { getFrontMatter, hasFrontMatter, hasTocCode } from '../lib/getFrontMatter';
import createDebugMessages from 'debug';
const debug = createDebugMessages('check-markdown');

/***************
 * test check-markdown
 **************/

describe('CheckMarkdown ELF Suite', function () {
  'use strict';


// const debug = require('debug')('check-markdown');
const fileName = './__tests__/About-elf.md';

  test('hasElfCode()', async() => {
    const result = await hasFrontMatter(fileName);
    // "hasElfCode": true, "hasTocCode": true
    expect(result).toBe(true);
  });

  test('hasTocCode', async() => {
    const result = await hasTocCode(fileName);
    // "hasElfCode": true, "hasTocCode": true
    expect(result).toBe(false);
  });

  test('markdown', async() => {
    const result = await getFrontMatter(fileName);
    expect(result.markdown).toContain('title: Hello');
  });

  test('markdown', async() => {
    const result = await getFrontMatter(fileName);
    expect(result.markdown).not.toContain('margietitle: Hello');
  });
});

