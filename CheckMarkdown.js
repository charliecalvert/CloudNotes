const fsp = require('fs').promises;
const elfUtils = require('elven-code').elfUtils;

const walker = require('walk-directories').walker;
const debugMain = require('debug')('check-main');
const debugDetail = require('debug')('check-main-detail');
const { setupElfCode } = require("./lib/getElfCode");




// Then, use it with a simple async for loop
// https://stackoverflow.com/a/36856787/253576
async function main() {
    let count = 0;
    const matterData = [];
    for await (const relativePath of walker('elvenware')) {
        count++;
        const fileName = elfUtils.ensureEndsWithPathSep(__dirname) + relativePath;
        debugMain('fileName', fileName);
        debugMain('getTitle', elfUtils.getTitleFromPath(fileName));

        const elfCodes = await setupElfCode(fileName, relativePath);
        if (elfCodes.data) {
            elfCodes.data.id = count;
            matterData.push(elfUtils.objectToJson(elfCodes.data));
            await fsp.writeFile(fileName, elfCodes.markdown, "utf8");
            debugMain('count', count);
        }
    }
    //if (count === 100) {
    //const fsp = require('fs').promises;
    const json = JSON.stringify(matterData, null, 4);
    await fsp.writeFile('all-matter.data', json, "utf8");
    //return;
    //}
}

exports.main = main;
main().catch(console.error);




