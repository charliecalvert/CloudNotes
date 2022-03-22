const matter = require('gray-matter');
const { getFileNameFromPath, swapExtension } = require('elven-code').elfUtils;

/* Debug Symbols */
const debug = require('debug')('check-add-liba');
const debugAdd = require('debug')('check-add-libb');

function getFrontMatterData(debugStr, elfCodes, fileName, relativePath) {
    // elfCodes.data = {};
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
    setQueryPath(matterInfo);
    matterInfo.data.debug = debugStr;
    if (!matterInfo.data.creationLocalTime) {
        matterInfo.data.creationLocalTime = new Date().toLocaleString();
    };
    return matterInfo;
}

function setQueryPath(matterInfo) {
    if (matterInfo.data.relativePath.includes('web/JavaScript')) {
        matterInfo.data.queryPath = '/javascript-guide/';
    } else {
        matterInfo.data.queryPath = matterInfo.data.relativePath;
    }
}

function getDataProperties(matterData) {
    debugAdd('filenameAFTER', matterData);
    let margie = '';
    for (const property in matterData) {
        margie += property + ': ' + matterData[property] + '\n';
    }
    return margie;
}

exports.getFrontMatterData = getFrontMatterData;
exports.setQueryPath = setQueryPath;
exports.getDataProperties = getDataProperties;