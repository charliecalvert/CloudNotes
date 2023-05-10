import elfStrings from 'elven-code';
import { guidePairs } from './guide-objects-caps.mjs';
import { findCategory } from './find-category.mjs';
import { addFrontMatterToOneFile, getReportOnFilesInDirectories } from './elf-utils.mjs';

import createDebugMessages from 'debug';
const debug = createDebugMessages('lib:walk-markdown-files');
const debugTestingFdir = createDebugMessages('lib:walk-markdown-files:fdir');
const debugFileInfos = createDebugMessages('lib:walk-markdown-files:fileInfos');
const debugTestingGp = createDebugMessages('lib:walk-markdown-files:gp');
const debugSummary = createDebugMessages('lib:walk-markdown-files:summary');

/*
Walk through a Directory or recursive set of directories 
to see all the files present with a markdown extension, 
and to test if they have front matter or not.
*/


// await iterateDirectories();
// const util = require('util')
// import util from 'util';
import chalk from 'chalk';
import { log } from 'node:console';
const directory = `${process.env.HOME}/Git/CloudNotes/elvenware/development`;
const ext = '.md';
const fileInfos = await getReportOnFilesInDirectories(directory, ext);
debugFileInfos(fileInfos);
const matters = [];
for (const fileInfo of fileInfos) {
    fileInfo.category = guidePairs.cssGuide.category;
    debugTestingFdir(chalk.red(`Testing fdir : ${fileInfo.directory}`));
    debugTestingGp(chalk.greenBright(`Testing gp : ${guidePairs.cssGuide.path}`));
    const isMatch = (
        fileInfo.directory === guidePairs.cloudGuide.path ||
        fileInfo.directory === guidePairs.cssGuide.path ||
        fileInfo.directory.includes(guidePairs.databaseGuide.path)
    )
    // fileInfo.directory.includes(guidePairs.cssGuide.path)
    if (isMatch) {
        findCategory(fileInfo);
        debug(chalk.yellowBright(`Found: ${fileInfo.fullPath}`));
        const frontMatter = addFrontMatterToOneFile(fileInfo);
        if (frontMatter) {
            matters.push(frontMatter);
        } else if (isMatch) {
            // debug(chalk.red(`No front matter: ${fileInfo.fullPath}`));
            matters.push(`No front matter: ${fileInfo.fullPath}\n`);
        }
    }
}
debugSummary(chalk.yellowBright(matters));
