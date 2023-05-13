/* eslint-disable no-console */

const fs = require('fs');

const debug = require('debug')('check-listDirs');
const debugDirs = require('debug')('check-listDirs:dirs');

debug('run-list-dirs called');

/**
* Iterate through CloudNotes directories and
* create a list of directory objects
 */
async function getDirectoryList() {
    const { default: listFiles } = await import('./callListDirs.mjs');
    const { default: createSortedDirectoryRecords } = await import('./createDirectoryObjects.mjs');

    // Get a list (array) of all directories in CloudNotes
    const directories = await listFiles();
    debugDirs('Directories:' + directories);

    // Convert directories array to an object
    const sortedDirs = await createSortedDirectoryRecords(directories);

    // Write the object to a file
    fs.writeFileSync('directories.json', JSON.stringify(sortedDirs, null, 4));
}

getDirectoryList();
