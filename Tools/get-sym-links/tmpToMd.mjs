// Usage: node --experimental-modules scripts/tmpToMd.mjs
/* eslint-disable no-console */
import fs from 'node:fs/promises';

import createDebugMessages from 'debug';
// eslint-disable-next-line import/extensions
import { walkSimple } from 'walk-directories';

const debug = createDebugMessages('scripts:get-symlinks');
const debugResult = createDebugMessages('scripts:get-symlinks:result');
const debugParams = createDebugMessages('scripts:get-symlinks:params');

async function tmpToMd(pathToExplore, ext = 'tmp') {
    debug('tmpToMd called', pathToExplore);
    const result = await walkSimple(pathToExplore, ext)
        .catch(console.error);

    debugResult('type:', typeof result);
    debugResult('result:', result);

    result.map((data, index) => {
        const { fileName, fullPath, isSymbolicLink } = data;
        debugParams('Data', fileName, isSymbolicLink);

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

const pathToExplore = `${process.env.CLOUDNOTES}/Assignments/`;
tmpToMd(pathToExplore, 'md');

export default tmpToMd;
