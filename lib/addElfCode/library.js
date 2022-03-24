const matter = require('gray-matter');
const path = require('path');
const { getFileNameFromPath, swapExtension, endsWith, removeFromEndAtCharacter } = require('elven-code').elfUtils;

/* Debug Symbols */
const debug = require('debug')('check-add-liba');
const debugAdd = require('debug')('check-add-libb');

function getDataProperties(matterData) {
    debugAdd('filenameAFTER', matterData);
    let dataProperties = '';
    for (const property in matterData) {
        dataProperties += property + ': ' + matterData[property] + '\n';
    }
    return dataProperties;
}

function getFrontMatterData(debugStr, elfCodes, fileName, relativePath, title) {
    // elfCodes.data = {};
    debugAdd('filename', fileName);
    const matterInfo = matter(elfCodes.markdown);
    matterInfo.data.image = "./course/course-javascript.jpg"
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

function getSubject(fullPath) {
    if (endsWith(fullPath, path.sep)) {
        throw new Error('Path must not end with a path separator.', fullPath)
    }
    debug('GET_SUBJECT_PATH', fullPath);
    const parts = fullPath.split(path.sep);
    debug('GET_SUBJECT_PARTS', parts);
    return parts[parts.length - 2];
    // return __dirname.substring(0, __dirname.indexOf('__tests__'));
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
    matterInfo.data.image = "./course/course-node.jpg";
    debug('SETTING IMAGE', matterInfo.data.image);
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
            matterInfo.data.subject = getSubject(matterInfo.data.fullPath);
        };
    };
}

function setQueryPath(matterInfo) {
    if (matterInfo.data.relativePath.includes('web/JavaScript')) {
        matterInfo.data.queryPath = '/javascript-guide/';
    } else {
        let queryPath = removeFromEndAtCharacter(matterInfo.data.relativePath, path.sep);
        queryPath = queryPath + path.sep;
        matterInfo.data.queryPath = queryPath;
    }
}

exports.getFrontMatterData = getFrontMatterData;
exports.getSubject = getSubject;
exports.getDataProperties = getDataProperties;
exports.setMatterStartFields = setMatterStartFields;
exports.setPathsAndTitle = setPathsAndTitle;
exports.setQueryPath = setQueryPath;
exports.setSubject = setSubject;
exports.setHtmlMmarkdown = setHtmlMmarkdown;