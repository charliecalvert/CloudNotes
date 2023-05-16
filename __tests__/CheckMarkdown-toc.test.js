import { getFrontMatterAndTocReport, hasFrontMatter, hasTocCode } from '../lib/getFrontMatterAndTocReport';
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

  test('hasFrontMatter()', async() => {
    const result = await getFrontMatterAndTocReport(fileName);
    // "hasElfCode": true, "hasTocCode": true
    expect(result.hasFrontMatter).toBe(false);
  });

  test('hasTocCode', async() => {
    const result = await getFrontMatterAndTocReport(fileName);
    // "hasElfCode": true, "hasTocCode": true
    expect(result.hasTocCode).toBe(true);
  });

  test('markdown', async() => {
    const result = await getFrontMatterAndTocReport(fileName);
    expect(result.markdown).not.toContain('title: Hello');
  });

  test('markdown', async() => {
    const result = await getFrontMatterAndTocReport(fileName);
    expect(result.markdown).not.toContain('margietitle: Hello');
  });
});

