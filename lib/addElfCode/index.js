// const { getTitleFromPath } = require('elven-code').elfUtils;
import { elfUtils } from 'elven-code';
// const { elfUtils } = elvenCode; 
const { getTitleFromPath } = elfUtils;

import { getDataProperties, 
    getFrontMatterData, setMatterStartFields } from './library/index.js';
// const matter = require('gray-matter');

/* Debug Symbols */
const debug = require('debug')('check-md');
// const debugAdd = require('debug')('check-add-elf');

async function addElfCode(fileName, relativePath, elfCodes) {
    const title = getTitleFromPath(fileName);
    const tocStr = `\n\n<!-- toc -->\n<!-- tocstop -->`;
    /*     const elfStr =
        `---
fullPath: ${fileName}
relativePath: ${relativePath}
title: ${title}
debug: First time
creationLocalTime: ${new Date().toLocaleString()}
---`; */

    if (elfCodes.hasElfCode + elfCodes.hasTocCode === 0) {
        debug('aec Has no code');
        // elfCodes.markdown = elfStr + tocStr + '\n\n' + elfCodes.markdown;
        const dataProps = setMatterStartFields(elfCodes, fileName, relativePath, title);
        elfCodes.markdown = `---\n${dataProps}---\n` + tocStr + '\n\n' + elfCodes.markdown;
    } else if (!elfCodes.hasElfCode) {
        debug('aec has no ELF code');
        const dataProps = setMatterStartFields(elfCodes, fileName, relativePath, title);
        elfCodes.markdown = `---\n${dataProps}---\n` + '\n\n' + elfCodes.markdown;
    } else if (!elfCodes.hasTocCode) {
        const debugToc = 'aec has no TOC code';
        const matterInfo = getFrontMatterData(debugToc, elfCodes, fileName, relativePath, title);
        const dataProps = getDataProperties(matterInfo.data);
        if (dataProps.includes('0: f')) throw new Error('Bad header matter');
        elfCodes.data = matterInfo.data;
        elfCodes.markdown = `---\n${dataProps}---\n` + tocStr + matterInfo.content;
    } else {
        const debugBoth = 'aec has both but checking ELF code';
        const matterInfo = getFrontMatterData(debugBoth, elfCodes, fileName, relativePath, title);
        const dataProps = getDataProperties(matterInfo.data);
        if (dataProps.includes('0: f')) throw new Error('Bad header matter');
        elfCodes.data = matterInfo.data;
        elfCodes.markdown = `---\n${dataProps}---\n` + matterInfo.content;
        // elfCodes.markdown = "---\n" + margie + "---\n" + obj.content;
    }
    debug('aec final markdown', elfCodes.markdown);
    return elfCodes;
}

export default addElfCode;
