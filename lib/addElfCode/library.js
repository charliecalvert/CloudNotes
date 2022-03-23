const matter = require('gray-matter');
const { getFileNameFromPath, swapExtension } = require('elven-code').elfUtils;

/* Debug Symbols */
const debug = require('debug')('check-add-liba');
const debugAdd = require('debug')('check-add-libb');

function getFrontMatterData(debugStr, elfCodes, fileName, relativePath, title) {
    // elfCodes.data = {};
    debugAdd('filename', fileName);
    const matterInfo = matter(elfCodes.markdown);
    debugAdd('matterInfo.data', matterInfo.data);
    setPathsAndTitle(matterInfo, fileName, relativePath, title);
    setHtmlMmarkdown(matterInfo, relativePath);
    setSubject(matterInfo);
    setQueryPath(matterInfo);
    matterInfo.data.debug = debugStr;
    if (!matterInfo.data.creationLocalTime) {
        matterInfo.data.creationLocalTime = new Date().toLocaleString();
    };
    return matterInfo;
}

function setPathsAndTitle(matterInfo, fileName, relativePath, title) {
    matterInfo.data.fullPath = fileName;
    matterInfo.data.relativePath = relativePath;
    if (!matterInfo.data.title)
        matterInfo.data.title = title;
}

function setHtmlMmarkdown(matterInfo, relativePath) {
    matterInfo.data.fileNameMarkdown = getFileNameFromPath(relativePath);
    matterInfo.data.fileNameHTML = swapExtension(matterInfo.data.fileNameMarkdown, '.html');
}

function setMatterStartFields(elfCodes, fileName, relativePath, title) {
    const matterInfo = matter(elfCodes.markdown);
    matterInfo.data.creationLocalTime = new Date().toLocaleString();
    matterInfo.data.debug = 'First Time';
    setPathsAndTitle(matterInfo, fileName, relativePath, title);
    setQueryPath(matterInfo);
    setSubject(matterInfo);
    setHtmlMmarkdown(matterInfo, relativePath);
    const dataProps = getDataProperties(matterInfo.data);
    elfCodes.data = matterInfo.data;
    return dataProps;
}

function setSubject(matterInfo) {
    if (!matterInfo.data.subject) {
        if (matterInfo.data.relativePath.includes('web/JavaScript')) {
            matterInfo.data.subject = 'JavaScript';
        } else {
            matterInfo.data.subject = 'unknown';
        };
    };
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
    let dataProperties = '';
    for (const property in matterData) {
        dataProperties += property + ': ' + matterData[property] + '\n';
    }
    return dataProperties;
}

exports.getFrontMatterData = getFrontMatterData;
exports.setQueryPath = setQueryPath;
exports.getDataProperties = getDataProperties;
exports.setMatterStartFields = setMatterStartFields;
exports.setPathsAndTitle = setPathsAndTitle;
exports.setSubject = setSubject;
exports.setHtmlMmarkdown = setHtmlMmarkdown;