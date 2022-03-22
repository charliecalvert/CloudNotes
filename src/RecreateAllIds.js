const fsp = require('fs').promises;
const elfUtils = require('elven-code').elfUtils;
const { setupFileName, setMatterData } = require('./utils');

const walker = require('walk-directories').walker;
const debugMain = require('debug')('check-main');
const debugDetail = require('debug')('check-main-detail');
const { setupElfCode } = require('../lib/getElfCode');


// Then, use it with a simple async for loop
// https://stackoverflow.com/a/36856787/253576
async function main() {
    let count = 0;
    const matterData = [];
    count = await runWalker(count, matterData);
    const json = JSON.stringify(matterData, null, 4);
}

exports.main = main;
main().catch(console.error);


async function runWalker(count, matterData) {
    for await (const relativePath of walker('.')) {
        if (!relativePath.includes('node_modules')) {
            count++;
            const fileName = setupFileName(relativePath);
            const elfCodes = await setupElfCode(fileName, relativePath);
            setMatterData(elfCodes, count, matterData);
            // await fsp.writeFile(fileName, elfCodes.markdown, 'utf8');
            debugMain('count', count);
        }
    }
    return count;
}
