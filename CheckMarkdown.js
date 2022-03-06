const fsp = require('fs').promises;
const elfUtils = require('elven-code').elfUtils;

const walker = require('walk-directories').walker;
const debugMain = require('debug')('check-main');
const { getElfCode, addElfCode, setupElfCode, gitCall } = require("./lib/getElfCode");

async function getStat(fileName) {
    return await fsp.stat(fileName);
}

// Then, use it with a simple async for loop
async function main() {
    for await (const relativePath of walker('elvenware')) {
        const fileName = process.env.HOME + '/Git/CloudNotes/' + relativePath;
        debugMain(elfUtils.getTitleFromPath(fileName));
        debugMain(await getStat(fileName));

        await gitCall(fileName);
        
        const elfCodes = await setupElfCode(fileName, relativePath);
        debugMain(`ELF codes:\n${elfCodes.markdown}`);
        fsp.writeFile(fileName, elfCodes.markdown, "utf8");
        return;
    }
}
exports.main = main;
main().catch(console.error);




