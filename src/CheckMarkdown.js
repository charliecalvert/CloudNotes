import { writeFile } from 'node:fs/promises';
import pkg from 'walk-directories/index.js';
const { walker } = pkg;
import { setupFileName, setMatterData } from './utils.js';

import createDebugMessages from 'debug';
const debugMain = createDebugMessages('check-main');
// import debugDetail from 'debug')('check-main-detail');
import { setupElfCode } from '../lib/getElfCode.js';


// Then, use it with a simple async for loop
// https://stackoverflow.com/a/36856787/253576
async function main() {
    let count = 0;
    const matterData = [];
    for await (const relativePath of walker('.')) {
        const fileName = setupFileName(relativePath);
        if (shouldProcess(relativePath, fileName)) {
            count++;
            
            const elfCodes = await setupElfCode(fileName, relativePath);

            setMatterData(elfCodes, count, matterData);
            await writeFile(fileName, elfCodes.markdown, 'utf8');
            debugMain('count', count);
        }
    }
    // if (count === 100) {
     const json = JSON.stringify(matterData, null, 4);
    await writeFile('all-matter.json', json, 'utf8');

    function shouldProcess(relativePath, fileName) {

        let valid = true;

        if (fileName.includes('About-toc.md')) {
            valid = false;
        }

        if (fileName.includes('About-elf.md')) {
            valid = false;
        }

        if (relativePath.includes('node_modules')) {
            valid = false;
        }
        return valid;
    }
}

export default main;
main().catch(console.error);


