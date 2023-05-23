#!/usr/bin/env node

/* eslint-disable no-console */
// import fs from 'node:fs/promises';
import * as fs from 'node:fs';
import inquirer from 'inquirer';
import { elfFiles } from 'elven-code';
import createDebugMessages from 'debug';

/* const debug = require('debug')('scripts:get-symlinks');

exports.debug = debug;
const debugResult = require('debug')('scripts:get-symlinks:result');
const debugParams = require('debug')('scripts:get-symlinks:params'); */

// eslint-disable-next-line import/extensions
import { walkSimple } from 'walk-directories';
import copySymlink from './copySymlink.mjs';

const debug = createDebugMessages('scripts:get-symlinks');
const debugResult = createDebugMessages('scripts:get-symlinks:result');
const debugParams = createDebugMessages('scripts:get-symlinks:params');

function writeResults(buildPairsString, symlinkPairs, copyCommands) {
    if (buildPairsString === true) {
        fs.writeFileSync(
            'symlink-pairs.js',
            `module.exports = {${symlinkPairs} };`,
        );
        console.log('Wrote symlink-pairs.js');
    } else {
        fs.writeFileSync('copy-commands.sh', copyCommands.join('\n'));
        console.log('Wrote copy-commands.sh');
    }
}

/**
 * Build a string that can be used to create a JavaScript object
 * that contains the symbolic link pairs
 * @param {string} fileName - The name of the file
 * @param {string} fullPath - The full path to the file
 * @param {string} linkString - The full path to the symbolic link
 * @returns {string} - A string that can be used to create a JavaScript object
 */
function buildSymlinkDescription(fileName, fullPath, linkString) {
    const bareName = elfFiles.stripExtension(fileName);
    const symlinkPairs = `\n    ${bareName}: {
        fileName: '${fileName}',
        fullPath: '${fullPath}',
        linkString: '${linkString}',
    },`;
    return symlinkPairs;
}

debug('get-symlinks called');

async function listFiles(pathToExplore, ext = 'md') {
    let symlinkPairs = '';
    const copyCommands = [];
    const buildPairsString = false;
    debug('listFiles called', pathToExplore);
    const result = await walkSimple(pathToExplore, ext)
        .catch(console.error);

    debugResult('type:', typeof result);
    debugResult('result:', result);

    result.map((data, index) => {
        const { fileName, fullPath, isSymbolicLink } = data;
        debugParams('Data', fileName, isSymbolicLink);

        if (isSymbolicLink === true) {
            debug('SYMBOLIC LINK', fileName, fullPath);

            if (buildPairsString === true) {
                const linkString = fs.readlinkSync(fullPath);
                debug('LINK STRING', linkString);
                symlinkPairs += buildSymlinkDescription(fileName, fullPath, linkString);
            } else {
                const copyCommand = copySymlink(fileName, fullPath);
                copyCommands.push(copyCommand);
            }
        }
        return index;
    });
    debug('RESULTS', symlinkPairs);
    writeResults(buildPairsString, symlinkPairs, copyCommands);
}

const options = {
    a: 'walk-directories/scripts',
    b: 'CloudNotes/elvenware',
    c: 'CloudNotes/Assignments',
};
inquirer.prompt([
    {
        type: 'list',
        name: 'pathToExplore',
        message: 'Which is better?',
        choices: [
            options.c,
            options.b,
            options.a,
        ],
    },
])
    .then((answers) => {
        let pathToExplore = '';
        let ext = 'md';
        console.info('Answer:', answers);
        console.info('Answer:', answers.pathToExplore);

        if (answers.patheToExplore === options.a) {
            pathToExplore = `${process.env.GIT_HOME}/walk-directories/scripts/level01/`;
            ext = 'txt';
        } else if (answers.pathToExplore === options.b) {
            pathToExplore = `${process.env.CLOUDNOTES}/elvenware/`;
            ext = 'md';
        } else if (answers.pathToExplore === options.c) {
            pathToExplore = `${process.env.CLOUDNOTES}/Assignments/`;
            ext = 'md';
        }

        listFiles(pathToExplore, ext);
    });
