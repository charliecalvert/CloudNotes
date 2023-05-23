/* eslint-disable no-console */
import * as fs from 'node:fs';
import createDebugMessages from 'debug';
// eslint-disable-next-line import/extensions
import { walkSimple } from 'walk-directories';
import symlinkPairs from './symlink-pairs.mjs';
import symLinkFiles from './symlink-files.mjs';
const debug = createDebugMessages('tools:modify-symlink-source');
const debugResult = createDebugMessages('tools:modify-symlink-source:result');
const debugFind = createDebugMessages('tools:modify-symlink-source:find');


function reduceSymlinkPairs() {
    debug('iterateSymlinkPairs called');
    let symLinks = Object.values(symlinkPairs);

    // symLinks.forEach((link) => console.log(link));
    const result = symLinks.reduce((linkData, index) => {
        const { fileName, fullPath, linkString } = linkData;
        debug('fileName', fileName);
        debug('fullPath', fullPath);
        debug('linkString', linkString);
        const item = symLinkFiles.find((item) => {
            item === fileName;
        });
        return index;
    });
    debugResult('symLinkFile item:', result);
}

function mapSymlinkPairs(writeData = false) {
    debug('iterateSymlinkPairs called');
    let symLinks = Object.values(symlinkPairs);

    // symLinks.forEach((link) => console.log(link));
    const result = symLinks.map((linkData, index) => {
        const { fileName, fullPath, linkString } = linkData;
        debug('fileName', fileName);
        debug('fullPath', fullPath);
        debug('linkString', linkString);
        const item = symLinkFiles.find((item) => {
            debugFind(`item ${index} ${fileName}`, item);
            return item.includes(fileName);
        });
        debugFind(`ITEM RESULT ${index}`, item);
        linkData.linkPath = item; // check this
        return linkData;
    });
    debugResult('symLinkFile item:', result);
    if (writeData === true) {
        fs.writeFileSync(
            './symlink-pairs-new.mjs',
            JSON.stringify(result, null, 4)
        );
    }
};

async function modifySymlinkSource(pathToExplore, ext = 'tmp') {
    debug('modifySymlinkSource called', pathToExplore);
    const result = await walkSimple(pathToExplore, ext)
        .catch(console.error);

    result.map((data, index) => {
        const { fileName, fullPath, isSymbolicLink } = data;
        if (isSymbolicLink === true) {
            debug('SYMBOLIC LINK', fileName, fullPath);
            let dest = '';
            if (ext === 'tmp') {
                dest = fullPath.replace(/\.tmp$/, '.md');
            } else {
                dest = fullPath.replace(/\.md$/, '.tmp');
            }
            fs.rename(fullPath, dest, (err) => {
                if (err) {
                    console.error('Error renaming file', err);
                } else {
                    console.log('File renamed successfully');
                }
            });
        }
        return index;
    });
}

mapSymlinkPairs(true);
