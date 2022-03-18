/** *************
 * test check-markdown
 **************/

describe('AddMarkdown Both Suite', function() {
    'use strict';
    const debug = require('debug')('check-markdown');
    const { getElfCode, setupElfCode } = require('../lib/getElfCode');

    const fileName = './__tests__/About-both.md';
    const relativePath = 'About-both.md';

    /*
   * Generic Pattern Counter
   */
    const patternCounter = (str, regex) => {
        // const re = /pattern/g
        return ((str || '').match(regex) || []).length;
    };

    test('hasElfCode()', async () => {
        const elfCodes = await setupElfCode(fileName, relativePath);
        debug(elfCodes.markdown);
        expect(elfCodes.markdown).toContain('relativePath');
    });

    test('hasElfCode() Twice', async () => {
        let elfCodes = await setupElfCode(fileName, relativePath);
        elfCodes = await setupElfCode(fileName, relativePath);
        debug(elfCodes.markdown);
        // \b Means at the beginning of a word or the end of a word
        // const regex=/\bslug:\shome\b/g;
        // const regex=/\bwith\b/g;
        const regexTitle = /title:/g;
        const regexCharlieTest = /Charlie-TEST/g;

        debug('regexTitle', patternCounter(elfCodes.markdown, regexTitle));
        debug('regexCharlieTest', patternCounter(elfCodes.markdown, regexCharlieTest));
        expect(patternCounter(elfCodes.markdown, regexTitle)).toBe(1);
        expect(patternCounter(elfCodes.markdown, regexCharlieTest)).toBe(1);
        expect(elfCodes.markdown).toContain('relativePath');
    });

    test('hasTocCode', async () => {
        const result = await getElfCode(fileName);
        // "hasElfCode": true, "hasTocCode": true
        expect(result.hasTocCode).toBe(true);
    });

    test('markdown', async () => {
        const result = await getElfCode(fileName);
        expect(result.markdown).toContain('title: Hello');
    });

    test('markdown', async () => {
        const result = await getElfCode(fileName);
        expect(result.markdown).not.toContain('margietitle: Hello');
    });
});

