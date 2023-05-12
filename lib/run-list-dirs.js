/* eslint-disable no-console */
 
const { elfStrings } = require('elven-code');
const debug = require('debug')('check-listDirs');
const debugDirs = require('debug')('check-listDirs:dirs');
const { listDirs } = require('walk-directories');
const fs = require('fs');
const utility = require('node:util');
const util = require('url/util');

debug('run-list-dirs called');
async function listFiles() {
    const directories = [];
    const patheToExplore = `${process.env.HOME}/Git/CloudNotes`;
    const result = await listDirs(patheToExplore, 0).catch(console.error);

    debug(typeof result);
    debug(result);

    result.map((fileName, index) => {
        debug(fileName);
        directories.push(fileName);
        return index;
    });
    debug(directories.length);
    return directories;
}

async function getDirectoryList() {
    const directories = await listFiles();

    // Convert directories array to an object
    const directoriesObject = directories.reduce((acc, cur) => {
        const key = elfStrings.getEndFromCharacter(cur, '/');
        // const keyValue = `\"aaa%s\"`, key;
        // Surround key with quotes
        // const keyValue = utility.format('%s', key);
        acc[key] = { category: utility.format(`%s-guide`, key.toLowerCase()), type: key, path: cur };
        return acc;
    }, {});
    debugDirs(directoriesObject);


    debug(directories);
    // Write directories to a file
    debug(JSON.stringify(directories, null, 4));
    fs.writeFileSync('directories.json', JSON.stringify(directories, null, 4));
}

getDirectoryList();