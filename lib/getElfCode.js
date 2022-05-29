// const execProcess = require('./exec-process.js');
import addElfCode from './addElfCode/index.js';

const { readFileAsync } = require('elven-code').elfUtils;

/* Debug Symbols */
const debug = require('debug')('check-md');
const debugCheckGetElfCode = require('debug')('check-get-elf');

async function getElfCode(fileName) {
    const result = {};
    const regexToc = /(?:<!-- toc(?:\s*stop)? -->)/g;
    // const regexElf = /(?:<!-- bar(?:\s*stop)? -->)/g;
    const regexElf = /^---/;
    const markdown = await readFileAsync(fileName);
    debug(markdown);
    if (regexToc.test(markdown)) {
        debugCheckGetElfCode('Has TOC code');
        result.hasTocCode = true;
    } else {
        debugCheckGetElfCode('No TOC code');
        result.hasTocCode = false;
        // result.markdown = markdown;
    }

    if (regexElf.test(markdown)) {
        debugCheckGetElfCode('Has ELF code');
        result.hasElfCode = true;
    } else {
        debugCheckGetElfCode('No ELF code');
        result.hasElfCode = false;
        // if (!result.markdown) result.markdown = markdown;
    }
    result.markdown = markdown;
    return result;
}

async function setupElfCode(fileName, relativePath) {
    const elfCodes = await getElfCode(fileName);
    await addElfCode(fileName, relativePath, elfCodes);
    return elfCodes;
}

export {
    getElfCode,
    setupElfCode,
};

/* exports.getElfCode = getElfCode;
exports.setupElfCode = setupElfCode; */
