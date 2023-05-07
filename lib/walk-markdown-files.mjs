import { walkSimple } from 'walk-directories';
import elfUtils from 'elven-code';
import elfStrings from 'elven-code';
import { buildFrontMatter } from 'elven-jekyll-post';
import { DateTime } from 'luxon';
import { format } from 'node:util';

import createDebugMessages from 'debug';
const debug = createDebugMessages('routes:index');
const debugFile = createDebugMessages('routes:index-detail');
const debugCall = createDebugMessages('called');
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { readFileSync, writeFileSync } from 'node:fs';

/*
Walk through a Directory or recursive set of directories 
to see all the files present with a markdown extension, 
and to test if they have front matter or not.
*/

const __filename = fileURLToPath(import.meta.url);

// , ([^-]*)-([^, ]*)
// const guideRegex = /([^-]*)-([^, ]*)/g;
// , "$1$2"

const guides = [
    "androidGuide", "artGuide", "cloudGuide",
    "csharpGuide", "cssGuide", "databaseGuide",
    "designGuide", "expressionsGuide", "firebaseGuide",
    "gitGuide", "htmlGuide", "javaGuide",
    "javascriptGuide", "jqueryGuide", "mobileGuide",
    "osGuide", "phpGuide", "pythonGuide",
    "serverGuide", "slashGuide", "testsGuide",
    "webGuide"
];

const guidePairs = {
    'androidGuide': 'Android',
    'artGuide': 'Art',
    'cloudGuide': 'Cloud',
    'csharpGuide': 'C#',
    cssGuide: {type:'CSS', path:'/home/ubuntu/Git/CloudNotes/elvenware/development/web/CssGuide'},
    'databaseGuide': 'Database',
    'designGuide': 'Design',
    'expressionsGuide': 'Expressions',
    'firebaseGuide': 'Firebase',
    'gitGuide': 'Git',
    'htmlGuide': 'HTML',
    'javaGuide': 'Java',
    'javascriptGuide': 'JavaScript',
    'jqueryGuide': 'jQuery',
    'mobileGuide': 'Mobile',
    'osGuide': 'OS',
    'phpGuide': 'PHP',
    'pythonGuide': 'Python',
    'serverGuide': 'Server',
    'slashGuide': 'Slash',
    'testsGuide': 'Tests',
};

const guidePairsArrays = [
    ['androidGuide', 'Android'],
    ['artGuide', 'Art'],
    ['cloudGuide', 'Cloud'],
    ['csharpGuide', 'C#'],
    ['cssGuide', '/home/ubuntu/Git/CloudNotes/elvenware/development/web/CssGuide'],
    ['databaseGuide', 'Database'],
    ['designGuide', 'Design'],
    ['expressionsGuide', 'Expressions'],
    ['firebaseGuide', 'Firebase'],
    ['gitGuide', 'Git'],
    ['htmlGuide', 'HTML'],
    ['javaGuide', 'Java'],
    ['javascriptGuide', 'JavaScript'],
    ['jqueryGuide', 'jQuery'],
    ['mobileGuide', 'Mobile'],
    ['osGuide', 'OS'],
    ['phpGuide', 'PHP'],
    ['pythonGuide', 'Python'],
    ['serverGuide', 'Server'],
    ['slashGuide', 'Slash'],
    ['testsGuide', 'Tests'],
    ['webGuide', 'Web']
];

/**
 * Get file information for all files of type 
 * in a directory
 * @param {string} directory 
 * @param {string} ext 
 * @returns object with file information  
 * 
 * @example   
 * const fileInfos = await getReportOnFilesInDirectories(directory, ext);
 * console.log(fileInfos);
 * 
 * Sample output: [{
 *    relativePath: '/TestCss.md',
 *    directory: '/home/ubuntu/Git/CloudNotes/elvenware/development/web/CssGuide',
 *    fullPath: '/home/ubuntu/Git/CloudNotes/elvenware/development/web/CssGuide/TestCss.md',
 *    fileName: 'TestCss.md'
 * }]
 */
async function getReportOnFilesInDirectories(directory, ext) {
    debugCall('GET FILE INFOS', __filename);
    const fileInfos = await walkSimple(directory, ext)
        .catch((error) => {
            debug('ERROR', error);
            throw new UserException('no infos');
        });

    if (fileInfos.length === 0) {
        throw new elfUtils.UserException('We received nothing');
    }
    debugFile('WALK_SIMPLE FILEINFOS', fileInfos);
    return fileInfos;
}

function addFrontMatterToOneFileA(fileName) {
    const content = readFileSync(fileName, 'utf8');
    const result = matter.test(content);

    if (result) {
        console.log('has front matter');
    } else {
        console.log('Building front matter');
        const frontMatter = buildFrontMatter('message01', 'misc');
        console.log(frontMatter);
        const contentWithFrontMatter = frontMatter + content;
        writeFileSync(fileName, contentWithFrontMatter, 'utf8');
    }
}

const getEndFromCharacter = function (value, char) {
    return value.substring(value.lastIndexOf(char) + 1, value.length);
};

function buildMatter(fileInfo) {
    const dt = DateTime.now();
    const dateString = format(`%s`, dt.toFormat('yyyy-MM-dd hh:mm:ss ZZZ'));
    console.log(dateString);
    const fullPath = fileInfo.fullPath;
    const directory = fileInfo.directory;
    const fileName = fileInfo.fileName;
    const relativePath = fileInfo.relativePath;
    const title = fileName.replace('.md', '');
    const category = getEndFromCharacter(directory, '/');
    const frontMatter = format(`---
layout: post
date: %s
fullPath: %s
directory: %s
fileName: %s
relativePath: %s
title: %s
category : %s
---%s
`, dateString, fullPath, directory, fileName, relativePath, title, category, '\n');
    return frontMatter;
}

function addFrontMatterToOneFile(fileInfo) {
    const fileName = fileInfo.fullPath;
    const content = readFileSync(fileName, 'utf8');
    const result = matter.test(content);

    if (result) {
        console.log('has front matter');
    } else {
        console.log('Building front matter');
        const frontMatter = buildMatter(fileInfo);
        console.log(frontMatter);
        const contentWithFrontMatter = frontMatter + content;
        writeFileSync(fileName, contentWithFrontMatter, 'utf8');
    }
}

async function iterateFiles(directory, ext) {
    
    const fileInfos = await getReportOnFilesInDirectories(directory, ext);
    console.log(fileInfos);
    const fileName = fileInfos[0].fullPath;
    console.log(fileName);
    
    for (const fileInfo of fileInfos) {
        console.log(fileInfo.fullPath);
        addFrontMatterToOneFile(fileName);
    }
}

async function iterateDirectories() {
    const directory = `${process.env.HOME}/Git/CloudNotes/elvenware/development/web/CssGuide`;
    const ext = '.md';
    await iterateFiles();
}

// await iterateDirectories();
// const util = require('util')
// import util from 'util';
import chalk from 'chalk';
const directory = `${process.env.HOME}/Git/CloudNotes/elvenware/development/web`;
const ext = '.md';
const fileInfos = await getReportOnFilesInDirectories(directory, ext);
console.log(fileInfos);
for (const fileInfo of fileInfos) {
    console.log(chalk.red(`Testing fdir : ${fileInfo.directory}`));
    console.log(chalk.greenBright(`Testing gp : ${guidePairs.cssGuide.path}`));
    if (fileInfo.directory.includes(guidePairs.cssGuide.path)) {
        console.log(chalk.yellowBright(`Found: ${fileInfo.fullPath}`));
        addFrontMatterToOneFile(fileInfo);
    }   
    
}
