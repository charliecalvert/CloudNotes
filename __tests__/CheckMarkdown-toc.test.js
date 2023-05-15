import checkMarkdown from '../CheckMarkdown';
import createDebugMessages from 'debug';
const debug = createDebugMessages('check-markdown');
/***************
 * test check-markdown
 **************/

describe('CheckMarkdown TOC Suite', function () {
  'use strict';
  /* const debug = require('debug')('check-markdown');
  const checkMarkdown = require('../CheckMarkdown'); */

  const fileName = './__tests__/About-toc.md';

  test('hasElfCode()', async() => {
    const result = await checkMarkdown.getElfCode(fileName);
    // "hasElfCode": true, "hasTocCode": true
    expect(result.hasElfCode).toBe(false);
  });

  test('hasTocCode', async() => {
    const result = await checkMarkdown.getElfCode(fileName);
    // "hasElfCode": true, "hasTocCode": true
    expect(result.hasTocCode).toBe(true);
  });

  test('markdown', async() => {
    const result = await checkMarkdown.getElfCode(fileName);
    expect(result.markdown).not.toContain('title: Hello');
  });

  test('markdown', async() => {
    const result = await checkMarkdown.getElfCode(fileName);
    expect(result.markdown).not.toContain('margietitle: Hello');
  });
});

