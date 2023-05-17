'use strict';

const toc = require('../../index.js');
const utils = require('../utils.js');

/**
 * Insert a table of contents into a markdown string.
 * This is useful for files that don't have a table of contents,
 * or if you want to update an existing table of contents.
 * This method does not create a heading for the
 * table of contents.
 *
 * The basic idea:
 *
 *  1. when front-matter exists, we need to avoid
 *     turning its properties into headings.
 *  2. We need to detect toc markers on the page.
 *     For now it's a simple HTML code comment
 *     to ensure the markdown is compatible with any parser.
 *
 * @param  {String} `str` Pass a string of markdown
 * @param  {Object} `options` Pass options to toc generation
 * @return {String} Get the same string back with a TOC inserted
 */

module.exports = function insert(str, options) {
    options = options || {};

    const regex = options.regex || /(?:<!-- bar(?:\s*stop)? -->)/g;
    const open = typeof options.open === 'string' ? options.open : '<!-- bar -->\n\n';
    const close = typeof options.close === 'string' ? options.close : '<!-- barstop -->';
    let obj;

    let newlines = '';
    const m = /\n+$/.exec(str);
    if (m) newlines = m[0];

    // does the file have front-matter?
    if (/^---/.test(str)) {
    // extract it temporarily so the syntax
    // doesn't get mistaken for a heading
        obj = utils.matter(str);
        str = obj.content;
    }

    const sections = split(str, regex);
    if (sections.length > 3) {
        throw new Error('markdown-toc only supports one Table of Contents per file.');
    }

    const last = sections[sections.length - 1];
    if (sections.length === 3) {
        sections.splice(1, 1, open + (options.toc || toc(last, options).content));
        sections.splice(2, 0, close);
    }

    if (sections.length === 2) {
        sections.splice(1, 0, open + toc(last, options).content + '\n\n' + close);
    }

    const resultString = sections.join('\n\n') + newlines;
    // if front-matter was found, put it back now
    if (obj) {
        return utils.matter.stringify(resultString, obj.data);
    }
    return resultString;
};

function split(str, re) {
    return str.split(re).map(trim);
}

function trim(str) {
    return str.trim();
}
