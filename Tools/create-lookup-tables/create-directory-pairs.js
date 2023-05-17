/* eslint-disable no-console */

// const fs = require('fs');
import { writeFileSync } from 'node:fs';
// import createSortedDirectoryRecords from './create-directory-objects.mjs';
import guidePairs from './directories.js';
import util from 'node:util';

import createDebugMessages from 'debug';
import { findGuidePair } from './findGuidePair.js';

const debug = createDebugMessages('lib:run-listDirs');
export const debugCall = createDebugMessages('lib:run-listDirs:call');
const debugDirs = createDebugMessages('lib:run-listDirs:dirs');
const debugFindGuidePair = createDebugMessages('lib:run-listDirs:findGuidePair');
debug('run-list-dirs called');

/**
 * Create a list of directory objects
 * @param {Array} directories
 * @param {Array} guidePairs
 * @returns {Array} directoryPairs
 */
function createDirectoryPairs(directories) {
    const directoryPairs = [];
    let directorIncludes = '';
    for (const directory of directories) {
        const guidePair = findGuidePair(directory, guidePairs);
        if (!guidePair) {
            continue;
        } else {
            directorIncludes +=
                util.format(`fileInfo.directory.includes(guidePair.%s.path) ||\n`, guidePair.type);
            const directoryPair = {
                name: directory,
                path: directory
            };
            directoryPairs.push(directoryPair);
        }
    }
    return { directoryPairs, directorIncludes };
}

/**
* Iterate through CloudNotes directories and
* create a list of directory objects
 */
async function findDirectoryList() {
    const { default: listFiles } = await import('./callListDirs.mjs');
    // const { default: createSortedDirectoryRecords } = await import('./createDirectoryObjects.mjs');

    // Get a list (array) of all directories in CloudNotes
    const directories = await listFiles();
    debugDirs('Directories:' + directories);

    // Convert directories array to an object
    const pairList = await createDirectoryPairs(directories);

    // Write the object to a file
    const start = `export default const isMatch = (
        fileInfo.directory.includes(guidePairs.android.path) ||
        fileInfo.directory.includes(guidePairs.cloud.path)
    );`;
    writeFileSync('directorPairs.json', JSON.stringify(pairList.directoryPairs, null, 4));
    writeFileSync('directorPairs.js', util.format(`export default %s`, pairList.directorIncludes));
}

findDirectoryList();
