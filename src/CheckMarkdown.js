// import path from 'path';
import { writeFile } from 'node:fs/promises';
import fs from 'node:fs';
// import pkg from 'walk-directories/index.js';
import { walkSimple } from 'walk-directories/src/walking.js';
import { setupFileName, setMatterData, __dirname } from './utils.js';

import createDebugMessages from 'debug';
const debug = createDebugMessages('check-main');
// debug.log = console.log.bind(console);
// import debugDetail from 'debug')('check-main-detail');
import { setupElfCode } from '../lib/getElfCode.js';

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

/* function debugStream(fileName) {
    const wstream = fs.createWriteStream(fileName);
    // Node.js 0.10+ emits finish when complete
    wstream.on('finish', function() {
        console.log(`${fileName} has been written`);
    });
    return wstream;
} */

// Then, use it with a simple async for loop
// https://stackoverflow.com/a/36856787/253576
async function main() {
    let count = 0;
    const matterData = [];
    // const debugData = [];

    const serverDir = __dirname.substring(0, __dirname.indexOf('src'));
    debug('CHECKMARKDOWN', serverDir);
    // const wstream = debugStream('walk-main.txt');

    const dirs = await walkSimple(serverDir, '.md');
    for (const dir of dirs) {
        // dirs.forEach(async(dir) => {
        debug('MAIN DIR ENTRY RELATIVE PATH', dir.relativePath);

        const fileName = setupFileName(dir.relativePath);
        if (shouldProcess(dir.relativePath, fileName)) {
            count++;

            const elfCodes = await setupElfCode(fileName, dir.relativePath, count);

            setMatterData(elfCodes, count, matterData);
            await writeFile(fileName, elfCodes.markdown, 'utf8');
            debug(`count: ${count}, ${fileName}\n`)
                // debugData.push(`count: ${count}, ${fileName}\n`);
        }
    };
    // wstream.end();
    // if (count === 100) {
    const json = JSON.stringify(matterData, null, 4);
    await writeFile('all-matter.json', json, 'utf8');
    // console.log(debugData);
    // await writeFile('debug-walk-main.txt', debugData, 'utf8');
}

export default main;
main().catch(console.error);