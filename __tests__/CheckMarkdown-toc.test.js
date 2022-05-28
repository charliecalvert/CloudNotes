/** *************
 * test check-markdown
 **************/

import { getElfCode } from '../lib/getElfCode';

describe('CheckMarkdown TOC Suite', function() {
    'use strict';
    const debug = require('debug')('check-markdown-toc');

    const fileName = './__tests__/About-toc.md';

    test('hasElfCode()', async () => {
        const result = await getElfCode(fileName);
        debug('hasElfCode', result);
        // "hasElfCode": true, "hasTocCode": true
        expect(result.hasElfCode).toBe(false);
    });

    test('hasTocCode', async () => {
        const result = await getElfCode(fileName);
        // "hasElfCode": true, "hasTocCode": true
        expect(result.hasTocCode).toBe(true);
    });

    test('markdown', async () => {
        const result = await getElfCode(fileName);
        expect(result.markdown).not.toContain('title: Hello');
    });

    test('markdown', async () => {
        const result = await getElfCode(fileName);
        expect(result.markdown).not.toContain('margietitle: Hello');
    });
});

