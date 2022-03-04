/***************
 * test check-markdown
 **************/

describe('AddMarkdown Both Suite', function () {
  'use strict';
  const debug = require('debug')('check-markdown');
  const checkMarkdown = require('../CheckMarkdown');

  const fileName = './__tests__/About-both.md';
  const relativePath = 'About-both.md';

  test.only('hasElfCode()', async () => {
    const elfCodes = await checkMarkdown.getElfCode(fileName);
    await checkMarkdown.addElfCode(fileName, relativePath, elfCodes);
    debug(elfCodes.markdown);
    expect(elfCodes.markdown).toContain('relativePath');
  });

  test.only('hasElfCode() Twice', async () => {
    const elfCodes = await checkMarkdown.getElfCode(fileName);
    await checkMarkdown.addElfCode(fileName, relativePath, elfCodes);
    await checkMarkdown.addElfCode(fileName, relativePath, elfCodes);
    debug(elfCodes.markdown);
    // \b Means at the beginning of a word or the end of a word
    //const regex=/\bslug:\shome\b/g;
    //const regex=/\bwith\b/g;
    const regex=/title:/g
    debug('regex', elfCodes.markdown.match(regex).length);
    expect(elfCodes.markdown.match(regex).length).toBe(1);

    expect(elfCodes.markdown).toContain('relativePath');
  });

  test('hasTocCode', async () => {
    const result = await checkMarkdown.getElfCode(fileName);
    // "hasElfCode": true, "hasTocCode": true
    expect(result.hasTocCode).toBe(true);
  });

  test('markdown', async () => {
    const result = await checkMarkdown.getElfCode(fileName);
    expect(result.markdown).toContain('title: Hello');
  });

  test('markdown', async () => {
    const result = await checkMarkdown.getElfCode(fileName);
    expect(result.markdown).not.toContain('margietitle: Hello');
  });
});

