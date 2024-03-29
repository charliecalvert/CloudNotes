//const toc = require('markdown-toc');

const insert = require('./lib/insert.js');

const elfUtils = require('elven-code').elfUtils;
const fileName = './CloudNotes.md';
const elf = require('markdown-elf');
const toc = require('markdown-toc');

async function getFile(str, options) {
    var regex = options.regex || /(?:<!-- toc(?:\s*stop)? -->)/g;
    var open = typeof options.open === 'string' ? options.open : '<!-- toc -->\n\n';
    var close = typeof options.close === 'string' ? options.close : '<!-- tocstop -->';

    let markdown = await elfUtils.readFileAsync(fileName);
    console.log(open);
    console.log(close);
    console.log(insert(markdown));
}

async function getMarkdown(str, options) {
   

    let markdown = await elfUtils.readFileAsync(fileName);
    markdown = toc.insert(markdown)
    console.log(insert(markdown));
}
/* getFile('foobar', {
    open: '<!-- bar -->',
    close: '<!-- barstop -->',
    regex: /(?:<!-- bar(?:\s*stop)? -->)/g
}); */

getMarkdown('foobar');