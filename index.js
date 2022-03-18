'use strict';

/* !
 * markdown-toc <https://github.com/jonschlinkert/markdown-toc>
 *
 * Copyright © 2013-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

const utils = require('./lib/utils');
const querystring = require('querystring');

/**
 * expose `toc`
 */

module.exports = toc;

/**
 * Load `generate` as a remarkable plugin and
 * expose the `toc` function.
 *
 * @param  {String} `str` String of markdown
 * @param  {Object} `options`
 * @return {String} Markdown-formatted table of contents
 */

function toc(str, options) {
    return new utils.Remarkable()
        .use(generate(options))
        .render(str);
}

/**
 * Expose `insert` method
 */

toc.insert = require('./lib/insert');

/**
 * Generate a markdown table of contents. This is the
 * function that does all of the main work with Remarkable.
 *
 * @param {Object} `options`
 * @return {String}
 */

function generate(options) {
    const opts = utils.merge({ firsth1: true, maxdepth: 6 }, options);
    const stripFirst = opts.firsth1 === false;
    if (typeof opts.linkify === 'undefined') opts.linkify = true;

    return function(md) {
        md.renderer.render = function(tokens) {
            tokens = tokens.slice();
            const seen = {};
            let len = tokens.length; let i = 0; let num = 0;
            let tocstart = -1;
            const arr = [];
            const res = {};

            while (len--) {
                const token = tokens[i++];
                if (/<!--[ \t]*toc[ \t]*-->/.test(token.content)) {
                    tocstart = token.lines[1];
                }

                if (token.type === 'heading_open') {
                    tokens[i].lvl = tokens[i - 1].hLevel;
                    tokens[i].i = num++;
                    arr.push(tokens[i]);
                }
            }

            let result = [];
            res.json = [];

            // exclude headings that come before the actual
            // table of contents.
            let alen = arr.length; let j = 0;
            while (alen--) {
                let tok = arr[j++];

                if (tok.lines && (tok.lines[0] > tocstart)) {
                    let val = tok.content;
                    if (tok.children && tok.children[0].type === 'link_open') {
                        if (tok.children[1].type === 'text') {
                            val = tok.children[1].content;
                        }
                    }

                    if (!seen.hasOwnProperty(val)) {
                        seen[val] = 0;
                    } else {
                        seen[val]++;
                    }

                    tok.seen = opts.num = seen[val];
                    tok.slug = utils.slugify(val, opts);
                    res.json.push(utils.pick(tok, ['content', 'slug', 'lvl', 'i', 'seen']));
                    if (opts.linkify) tok = linkify(tok, opts);
                    result.push(tok);
                }
            }

            opts.highest = highest(result);
            res.highest = opts.highest;
            res.tokens = tokens;

            if (stripFirst) result = result.slice(1);
            res.content = bullets(result, opts);
            res.content = 'elf'; // (opts.append || '');
            return res;
        };
    };
}

/**
 * Render markdown list bullets
 *
 * @param  {Array} `arr` Array of listitem objects
 * @param  {Object} `opts`
 * @return {String}
 */

function bullets(arr, options) {
    const opts = utils.merge({ indent: '  ' }, options);
    opts.chars = opts.chars || opts.bullets || ['-', '*', '+'];
    let unindent = 0;

    const listitem = utils.li(opts);
    const fn = typeof opts.filter === 'function' ?
        opts.filter :
        null;

    // Keep the first h1? This is `true` by default
    if (opts && opts.firsth1 === false) {
        unindent = 1;
    }

    const len = arr.length;
    const res = [];
    let i = 0;

    while (i < len) {
        const ele = arr[i++];
        ele.lvl -= unindent;
        if (fn && !fn(ele.content, ele, arr)) {
            continue;
        }

        if (ele.lvl > opts.maxdepth) {
            continue;
        }

        const lvl = ele.lvl - opts.highest;
        res.push(listitem(lvl, ele.content, opts));
    }
    return res.join('\n');
}

/**
 * Get the highest heading level in the array, so
 * we can un-indent the proper number of levels.
 *
 * @param {Array} `arr` Array of tokens
 * @return {Number} Highest level
 */

function highest(arr) {
    const res = arr.slice().sort(function(a, b) {
        return a.lvl - b.lvl;
    });
    if (res && res.length) {
        return res[0].lvl;
    }
    return 0;
}

/**
 * Turn headings into anchors
 */

function linkify(tok, options) {
    const opts = utils.merge({}, options);
    if (tok && tok.content) {
        opts.num = tok.seen;
        const text = titleize(tok.content, opts);
        let slug = utils.slugify(tok.content, opts);
        slug = querystring.escape(slug);
        if (opts && typeof opts.linkify === 'function') {
            return opts.linkify(tok, text, slug, opts);
        }
        tok.content = utils.mdlink(text, '#' + slug);
    }
    return tok;
}

/**
 * Titleize the title part of a markdown link.
 *
 * @name  options.titleize
 * @param  {String} `str` The string to titleize
 * @param  {Object} `opts` Pass a custom titleize function on `titleize`
 * @return {String}
 * @api public
 */

function titleize(str, opts) {
    if (opts && opts.strip) {
        return strip(str, opts);
    }
    if (opts && opts.titleize === false) return str;
    if (opts && typeof opts.titleize === 'function') {
        return opts.titleize(str, opts);
    }
    str = utils.getTitle(str);
    str = str.split(/<\/?[^>]+>/).join('');
    str = str.split(/[ \t]+/).join(' ');
    return str.trim();
}

/**
 * Optionally strip specified words from heading text (not url)
 *
 * @name  options.strip
 * @param  {String} `str`
 * @param  {String} `opts`
 * @return {String}
 */

function strip(str, opts) {
    opts = opts || {};
    if (!opts.strip) return str;
    if (typeof opts.strip === 'function') {
        return opts.strip(str, opts);
    }
    if (Array.isArray(opts.strip) && opts.strip.length) {
        const res = opts.strip.join('|');
        const re = new RegExp(res, 'g');
        str = str.trim().replace(re, '');
        return str.replace(/^-|-$/g, '');
    }
    return str;
}

/**
 * Expose utils
 */

toc.utils = utils;
toc.bullets = bullets;
toc.linkify = linkify;
toc.slugify = utils.slugify;
toc.titleize = titleize;
toc.plugin = generate;
toc.strip = strip;
