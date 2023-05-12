/* eslint-disable no-console */

const fs = require('fs');
const utility = require('node:util');

const { elfStrings } = require('elven-code');

// const sortIt = require('./sorting.mjs');


const debug = require('debug')('check-listDirs');
const debugDirs = require('debug')('check-listDirs:dirs');
const debugObj = require('debug')('check-listDirs:obj');
const debugCall = require('debug')('check-listDirs:call');

debug('run-list-dirs called');

function myFunc(total, num) {
    return total - num;
}

function getDirs(acc, cur) {
    debugCall('myfunc called', acc, cur);
    // acc = {};    
    const key = elfStrings.getEndFromCharacter(cur, '/');
    const obj = {
        category: utility.format(`%s-guide`, key.toLowerCase()),
        type: key,
        path: cur
    };
    debugObj(obj);
    const notWanted = [
        '.vscode', '__tests__', 'node_modules', 'bin', 
        'lib', 'test', 'dist', 
        'coverage', 'docs', 'public', 
        'src', 'build'];
    if (!notWanted.includes(key)) {
        acc[key.toLowerCase()] = obj;
    }
    return acc;
}

async function getDirectoryList() {
    const { default: listFiles } = await import('./callListDirs.mjs');
    const { default: sortIt } = await import('./sorting.mjs');
    const directories = await listFiles();
    debugCall('Directories:', directories);
    debugDirs('Directories:' + directories);
    // console.log('Directories:', directories);
    // Convert directories array to an object
    // const numbers = [175, 50, 25];

    //const directoriesObject = numbers.reduce(myFunc);
    const directoriesObject = directories.reduce(getDirs, {});
    debugDirs(directoriesObject);
    const sortedDirs = sortIt(directoriesObject);
    fs.writeFileSync('directories.json', JSON.stringify(sortedDirs, null, 4));
}

getDirectoryList();


