const { getTitleFromPath, getFileNameFromPath, swapExtension } = require('elven-code').elfUtils;
const matter = require('gray-matter');

/* Debug Symbols */
const debug = require('debug')('check-md');
const debugAdd = require('debug')('check-add-elf');

async function addElfCode(fileName, relativePath, elfCodes) {
    const title = getTitleFromPath(fileName);
    const tocStr = `\n\n<!-- toc -->\n<!-- tocstop -->`;
    const elfStr =
        `---
fullPath: ${fileName}
relativePath: ${relativePath}
title: ${title}
debug: First time
creationLocalTime: ${new Date().toLocaleString()}
---`;

    if (elfCodes.hasElfCode + elfCodes.hasTocCode === 0) {
        debug('aec Has no code');
        elfCodes.markdown = elfStr + tocStr + '\n\n' + elfCodes.markdown;
        elfCodes.data = matter(elfCodes.markdown).data;
    } else if (!elfCodes.hasElfCode) {
        debug('aec has no ELF code');
        elfCodes.markdown = elfStr + '\n\n' + elfCodes.markdown;
    } else if (!elfCodes.hasTocCode) {
        const debugToc = 'aec has no TOC code';
        const matterInfo = getFrontMatterData(debugToc);
        let dataProps = getDataProperties();
        if (dataProps.includes("0: f")) throw new Error("Bad header matter");
        elfCodes.data = matterInfo.data;
        elfCodes.markdown = "---" + dataProps + "---" + tocStr + matterInfo.content;
    } else {
        const debugBoth = 'aec has both but checking ELF code';
        const matterInfo = getFrontMatterData(debugBoth);
        let dataProps = getDataProperties(matterInfo.data);
        if (dataProps.includes("0: f")) throw new Error("Bad header matter");
        elfCodes.data = matterInfo.data;
        elfCodes.markdown = `---\n${dataProps}---\n` + matterInfo.content;
        //elfCodes.markdown = "---\n" + margie + "---\n" + obj.content;
    }
    debug('aec final markdown', elfCodes.markdown);
    return elfCodes;

    function getDataProperties(matterData) {
        debugAdd('filenameAFTER', matterData);
        let margie = '';
        for (const property in matterData) {
            margie += property + ": " + matterData[property] + "\n";
        }
        return margie;
    }

    function getFrontMatterData(debugStr) {
        //elfCodes.data = {};
        debugAdd('filename', fileName);
        const matterInfo = matter(elfCodes.markdown);
        debugAdd('matterInfo.data', matterInfo.data);
        matterInfo.data.fullPath = fileName;
        matterInfo.data.fileNameMarkdown = getFileNameFromPath(relativePath);
        matterInfo.data.fileNameHTML = swapExtension(matterInfo.data.fileNameMarkdown, '.html');

        matterInfo.data.relativePath = relativePath;
        if (!matterInfo.data.title) matterInfo.data.title = title;
        if (!matterInfo.data.subject) {
            if (matterInfo.data.relativePath.includes('web/JavaScript')) {
                matterInfo.data.subject = 'JavaScript';
            };
        };
        if (matterInfo.data.relativePath.includes('web/JavaScript')) {
            matterInfo.data.queryPath = '/javascript-guide/';
        }
        matterInfo.data.debug = debugStr;
        matterInfo.data.creationLocalTime = new Date().toLocaleString();
        return matterInfo;
    }
}

exports.addElfCode = addElfCode;