/** *************
 * test check-markdown
 **************/

describe('CheckMarkdown Both Suite', function() {
    'use strict';
    const { readFileAsync, endsWith } = require('elven-code').elfUtils;
    const debug = require('debug')('check-markdown-both');
    const { getElfCode } = require('../lib/getElfCode');
    const { getSubject } = require('../lib/addElfCode/library');
    const path = require('path');

    const fileName = './__tests__/About-both.md';

    test('hasElfCode()', async () => {
        const result = await getElfCode(fileName);
        // "hasElfCode": true, "hasTocCode": true
        expect(result.hasElfCode).toBe(true);
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

    function cleanName() {
        debug('__DIRNAME', __dirname);
        return __dirname.substring(0, __dirname.indexOf('__tests__'));
    }

    const getMatters = async () => {
        const fileName = cleanName() + '/all-matter.json';
        let matters = await readFileAsync(fileName);
        matters = JSON.parse(matters);
        return matters;
    };

    const allFields = ['id', 'queryPath', 'relativePath', 'subject', 
        'debug', 'creationLocalTime', 'fullPath', 'title',
        'fileNameMarkdown', 'fileNameHTML'];

    test('check for all fields', async () => {
        const matters = await getMatters();
        let count = 0;
        
        if (matters.length > 0) {
            const hasAllFields = matters.every((matter, index, matterArray) => {
                // expect(matter).toContain(allFields[0]);
                debug('CHECK_ALL_FIELDS_INDEX', index);
                let innerCount = 0;
                allFields.every((field, innerIndex, fieldArray) => {
                    try {
                        expect(matter).toHaveProperty(field);
                    } catch (error) {
                        debug('BAD MATTER: ', matter);
                        debug('MISSING FIELD', field);
                        return false;
                    }
                    innerCount++;
                    debug('CHECK_ALL_FIELDS_INNER_INDEX', innerIndex);
                    return true;
                })
                expect(innerCount).toBe(allFields.length);
                count++;
                debug('CHECK_ALL_FIELDS_COUNT', count);
                return true;
            });
            debug('CHECK_ALL_FIELDS_RESULT', hasAllFields);
            expect(hasAllFields).toBeTruthy();
        } else {
            throw new Error('retrieved empty all-matters.json array.');
        }
    });

    test('get subject', () => {
        const fullPath = '/home/ubuntu/Git/CloudNotes/javascript-guide/BasicSyntax.md';
        const subject = getSubject(fullPath);
        const expected = 'javascript-guide';
        expect(subject).toBe(expected);
    });
});

