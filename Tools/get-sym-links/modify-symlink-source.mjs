/* eslint-disable no-console */
import fs from 'node:fs/promises';

import createDebugMessages from 'debug';
// eslint-disable-next-line import/extensions
import { walkSimple } from 'walk-directories';
import symlinkPairs from './symlink-pairs.mjs';
import symLinkFiles from './symlink-files.mjs';
const debug = createDebugMessages('tools:modify-symlink-source');
const debugResult = createDebugMessages('tools:modify-symlink-source:result');

function iterateSymlinkPairs() {
    debug('iterateSymlinkPairs called');
    let symLinks = Object.values(symlinkPairs);

    symLinks.forEach((link) => console.log(link));
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

iterateSymlinkPairs();