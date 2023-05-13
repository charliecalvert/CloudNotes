/* eslint-disable no-console */

const fs = require('fs');

// const { elfStrings } = require('elven-code');

// const sortIt = require('./sorting.mjs');

const debug = require('debug')('check-listDirs');
const debugDirs = require('debug')('check-listDirs:dirs');

debug('run-list-dirs called');

async function getDirectoryList() {
    const { default: listFiles } = await import('./callListDirs.mjs');
    const { default: createSortedDirectoryRecords } = await import('./createDirectoryObjects.mjs');

    // Get a list (array) of all directories in CloudNotes
    const directories = await listFiles();
    debugDirs('Directories:' + directories);

    // Convert directories array to an object
    const sortedDirs = await createSortedDirectoryRecords(directories);
    fs.writeFileSync('directories.json', JSON.stringify(sortedDirs, null, 4));
}

getDirectoryList();
