/** *************
 * test check-markdown
 **************/
import { getElfCode } from '../lib/getElfCode';

describe('CheckMarkdown ELF Suite', function() {
    'use strict';
    // const debug = require('debug')('check-markdown');

    const fileName = './__tests__/About-elf.md';

    test('hasElfCode()', async () => {
        const result = await getElfCode(fileName);
        // "hasElfCode": true, "hasTocCode": true
        expect(result.hasElfCode).toBe(true);
    });

    test('hasTocCode', async () => {
        const result = await getElfCode(fileName);
        // "hasElfCode": true, "hasTocCode": true
        expect(result.hasTocCode).toBe(false);
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

