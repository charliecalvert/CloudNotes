import createDebugMessages from 'debug';
const debugUtil = createDebugMessages('check-util');
import { elfUtils } from 'elven-code';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const  { elfUtils } = elvenCode; 
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

function testJavaScript(elfCodes) {
    try {
        if (elfCodes.data.fullPath.includes('/development/web/JavaScript/')) {
            debugUtil(elfCodes.data.fullPath);
        }
    } catch (error) {
        debugUtil(error, elfCodes);
    }
}

export {
    cleanName,
    setMatterData,
    setupFileName,
    testJavaScript,
    __dirname,
    __filename,
};

/* exports.cleanName = cleanName;
exports.setupFileName = setupFileName;
exports.setMatterData = setMatterData;
exports.testJavaScript = testJavaScript */