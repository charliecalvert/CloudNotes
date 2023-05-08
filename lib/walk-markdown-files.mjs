import elfStrings from 'elven-code';
import { guidePairs } from './guide-objects-caps.mjs';
import { findCategory } from './find-category.mjs';
import { addFrontMatterToOneFile, getReportOnFilesInDirectories } from './elf-utils.mjs';
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
console.log(fileInfos);
const matters = [];
for (const fileInfo of fileInfos) {
    fileInfo.category = guidePairs.cssGuide.category;
    console.log(chalk.red(`Testing fdir : ${fileInfo.directory}`));
    console.log(chalk.greenBright(`Testing gp : ${guidePairs.cssGuide.path}`));
    const isMatch = (
        fileInfo.directory === guidePairs.cssGuide.path ||
        fileInfo.directory === guidePairs.databaseGuide.path
    )
    // fileInfo.directory.includes(guidePairs.cssGuide.path)
    if (isMatch) {
        findCategory(fileInfo);
        console.log(chalk.yellowBright(`Found: ${fileInfo.fullPath}`));
        const frontMatter = addFrontMatterToOneFile(fileInfo);
        if (frontMatter) {
            matters.push(frontMatter);
        } else if (isMatch) {
            // console.log(chalk.red(`No front matter: ${fileInfo.fullPath}`));
            matters.push(`No front matter: ${fileInfo.fullPath}\n`);
        }
    }
}
console.log(chalk.yellowBright(matters));
