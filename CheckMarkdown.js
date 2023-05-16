import * as fs from 'fs';
import { unlink } from 'node:fs/promises';
// const fsp = require('fs').promises;
import * as path from 'path';
// const path = require('path');
import createDebugMessages from 'debug';
const debug = createDebugMessages('check-markdown');
// const debug = require('debug')('check-md');
import elfUtils from 'elven-code';
import matter from 'gray-matter';

const walk = function (dir, done) {
    let results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        let i = 0;
        (function next() {
            let file = list[i++];
            if (!file) return done(null, results);
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (err) throw err;
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        if (err) throw err;
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

/*
 * The function* (function keyword plus asterisk) is a
 * generator function, that returns a Generator object.
 * - see mdn (https://mzl.la/3MbWmiM)
 * yield can be treated like an array, you can iterate
 * over it one item at a time. Use next() or for loop.
 */
async function * walker(dir) {
    for await (const d of await fs.promises.opendir(dir)) {
        const entry = path.join(dir, d.name);
        if (d.isDirectory()) {
            yield * walker(entry);
        } else if (d.isFile() && elfUtils.getExtension(d.name) === 'md') {
            yield entry;
        }
    }
}

const ep = require("./exec-process.js");
const { getFrontMatterAndTocReport } = require("./lib/getFrontMatterAndTocReport.js");




async function addElfCode(fileName, elfCodes) {
    // const elfStr = `\n<!-- bar -->\n<!-- barstop -->`;

    const title = getTitleFromPath(fileName);
    const elfStr = `\n---\nfullPath=${fileName}\ntitle=${title}\n---`;
    const tocStr = `\n\n<!-- toc -->\n<!-- tocstop -->`;

    if (elfCodes.hasElfCode + elfCodes.hasTocCode === 0) {
        debug('aec Has no code');
        elfCodes.markdown = elfStr + tocStr + '\n\n' + elfCodes.markdown;
    } else if (!elfCodes.hasElfCode) {
        debug('aec has no ELF code');
        elfCodes.markdown = elfStr + '\n\n' + elfCodes.markdown;
    } else if (!elfCodes.hasTocCode) {
        debug('aec has no TOC code');
        // elfCodes.markdown = tocStr + '\n\n' + elfCodes.markdown;
        const obj = matter(elfCodes.markdown);
        obj.data.fullPath = fileName;
        if (!obj.data.title) obj.data.title = title;
        let margie = '';
        for (const property in obj.data) {
            margie += `${property}: ${obj.data[property]}\n`;
        }
        elfCodes.markdown = `\n---\n${margie}---` + tocStr + obj.content;
    } else {
        debug('aec has both but checking ELF code');
        // elfCodes.markdown = tocStr + '\n\n' + elfCodes.markdown;
        const obj = matter(elfCodes.markdown);
        obj.data.fullPath = fileName;
        if (!obj.data.title) obj.data.title = title;
        let margie = '';
        for (const property in obj.data) {
            margie += `${property}: ${obj.data[property]}\n`;
        }
        // const margie = JSON.stringify(obj.data);
        elfCodes.markdown = `\n---\n${margie}---\n` + obj.content;
    }
    debug('aec final markdown', elfCodes.markdown);
}

function getDocBySlug(slug) {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = `docsDirectory ${realSlug}.md`;
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return { slug: realSlug, meta: data, content };
}

// Then, use it with a simple async for loop
async function main() {
    const p = walker('elvenware').then((result) => {
        debug('walker result', result);
    }).catch(console.error);

    const { fileName, elfCodes } = await runCore(p);
    await addElfCode(fileName, elfCodes);
}

async function runCore(p) {
    const fileName = process.env.HOME + '/Git/CloudNotes/' + p;
    debug(getTitleFromPath(fileName));
    const stats = await fsp.stat(fileName);
    debug(stats);
    // execProcess();
    const command = "sh git-call.sh " + fileName;
    // const result = await ep.callExec(command);
    const result = await ep.result(command);
    debug('cm result:', result);
    const elfCodes = await getElfCode(fileName);
    return { fileName, elfCodes };
}

// ls01('.').catch(console.error)
// ls02('.').catch(console.error)
// lsDirs('.').catch(console.error)
/* walk('elvenware', (err,b) => {
    if (err) throw err;
    debug(b)
}); */

// main().catch(console.error);

function testUnusedCode() {
    const { lsDirs, ls02, ls01 } = require("./lib/lsDirs.js");

    lsDirs('.').catch(console.error);
    ls02('.').catch(console.error);
    ls01('.').catch(console.error);
    walk('elvenware', (err, b) => {
        if (err) throw err;
        debug(b);
    });
    getDocBySlug('elvenware/development/web/CssGuide/TestCss.md');
    main().catch(console.error);
}

exports.getElfCode = { getElfCode, tests: testUnusedCode };
