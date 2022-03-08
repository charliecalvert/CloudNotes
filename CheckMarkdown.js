const fs = require('fs');
const fsp = require('fs').promises;
const elfUtils = require('elven-code').elfUtils;

const walker = require('walk-directories').walker;
const debugMain = require('debug')('check-main');
const debugDetail = require('debug')('check-main-detail');
const { getElfCode, addElfCode, setupElfCode, gitCall } = require("./lib/getElfCode");

async function getStat(fileName) {
    return await fsp.stat(fileName);
}

// Then, use it with a simple async for loop
async function main() {
    let count = 0;
    const matterData = [];
    for await (const relativePath of walker('elvenware')) {
        count++;
        const fileName = elfUtils.ensureEndsWithPathSep(__dirname) + relativePath;
        debugMain('fileName', fileName);
        debugMain('getTitle', elfUtils.getTitleFromPath(fileName));
        //debugDetail(await getStat(fileName));

        //await gitCall(fileName);
        
        const elfCodes = await setupElfCode(fileName, relativePath);
        // debugDetail(`ELF codes:\n${elfCodes.markdown}`);
        matterData.push(elfUtils.objectToJson(elfCodes.data));
        //debugDetail('<code data-main>', );
        await fsp.writeFile(fileName, elfCodes.markdown, "utf8");
        debugMain('count', count);
        if (count === 10) {
            const json = JSON.stringify(matterData);
            fsp.writeFile('all-matter.data', json, "utf8");
            return;
        }

        // https://stackoverflow.com/a/36856787/253576
    }
    
}
exports.main = main;
main().catch(console.error);




