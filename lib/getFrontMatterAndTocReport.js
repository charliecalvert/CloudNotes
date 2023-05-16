import elfUtils from 'elven-code/elf-utils';
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
    return result;
}

function checkForFrontMatter(markdown, result) {
    const regexElf = /^---/;
    // const regexElf = /(?:<!-- bar(?:\s*stop)? -->)/g;
    if (regexElf.test(markdown)) {
        debugCge('Has ELF code');
        result.hasFrontMatter = true;
    } else {
        debugCge('No ELF code');
        result.hasFrontMatter = false;
    }
    return result;
}

async function hasTocCode(fileName) {
    const result = {};
    const markdown = await elfUtils.readFileAsync(fileName);
    debug(markdown);
    checkForToc(markdown, result);
    return result.hasTocCode;
}

async function hasFrontMatter(fileName) {
    const result = {};
    const markdown = await elfUtils.readFileAsync(fileName);
    debug(markdown);
    checkForFrontMatter(markdown, result);
    return result.hasFrontMatter;
}

async function getFrontMatterAndTocReport(fileName) {
    const result = {};

    const markdown = await elfUtils.readFileAsync(fileName);
    debug(markdown);
    checkForToc(markdown, result);
    checkForFrontMatter(markdown, result);
    result.markdown = markdown;
    return result;
}

export { getFrontMatterAndTocReport, hasFrontMatter, hasTocCode };



