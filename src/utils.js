const debugUtil = require('debug')('check-util');
const elfUtils = require('elven-code').elfUtils;

function cleanName() {
    debugUtil('__DIRNAME IN CLEAN-NAME', __dirname);
    return __dirname.substring(0, __dirname.indexOf('src'));
}

function setupFileName(relativePath) {
    debugUtil('SETUP-FILENAME', cleanName());
    const fileName = elfUtils.ensureEndsWithPathSep(cleanName(__dirname)) + relativePath;

    debugUtil('SETUP-FILENAME fileName', fileName);
    debugUtil('SETUP-FILENAME getTitle', elfUtils.getTitleFromPath(fileName));
    if (fileName.includes('About.md')) {
        debugUtil('SETUP-FILENAME', fileName);
    }
    return fileName;
}

function setMatterData(elfCodes, count, matterData) {
    if (elfCodes.data) {
        elfCodes.data.id = count;
        matterData.push(elfUtils.objectToJson(elfCodes.data));
    }
}

exports.cleanName = cleanName;
exports.setupFileName = setupFileName;
exports.setMatterData = setMatterData;