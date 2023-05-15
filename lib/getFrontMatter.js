const elfUtils = require('elven-code').elfUtils;
import createDebugMessages from 'debug';
const debugCge = createDebugMessages('get-elf-code:cge');
const debug = createDebugMessages('get-elf-code');

function checkForToc(markdown, result) {
    const regexToc = /(?:<!-- toc(?:\s*stop)? -->)/g;
    if (regexToc.test(markdown)) {
        debugCge('Has TOC code');
        result.hasTocCode = true;
    } else {
        debugCge('No TOC code');
        result.hasTocCode = false;
    }
}

function checkForFrontMatter(markdown, result) {
    const regexElf = /^---/;
    // const regexElf = /(?:<!-- bar(?:\s*stop)? -->)/g;
    if (regexElf.test(markdown)) {
        debugCge('Has ELF code');
        result.hasElfCode = true;
    } else {
        debugCge('No ELF code');
        result.hasElfCode = false;
    }
}

async function hasTocCode(fileName) {
    const result = {};
    const markdown = await elfUtils.readFileAsync(fileName);
    debug(markdown);
    checkForToc(markdown, result);
    return result;
}

async function hasFrontMatter(fileName) {
    const result = {};
    const markdown = await elfUtils.readFileAsync(fileName);
    debug(markdown);
    checkForFrontMatter(markdown, result);
    return result;
}

async function getFrontMatter(fileName) {
    const result = {};

    const markdown = await elfUtils.readFileAsync(fileName);
    debug(markdown);
    checkForToc(markdown, result);
    checkForFrontMatter(markdown, result);
    result.markdown = markdown;
    return result;
}

export { getFrontMatter, hasFrontMatter, hasTocCode };



