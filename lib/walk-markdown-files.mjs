import chalk from 'chalk';
// import { guidePairs } from './guide-objects-caps.mjs';
import guidePairs from './directories.js';
import { findCategory } from './find-category.mjs';
import { addFrontMatterToOneFile, getReportOnFilesInDirectories } from './elf-utils.mjs';
import { testMatch } from './directorPairsTest.js';
import { findGuidePair } from './findGuidePair.js';
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

const directory = `${process.env.HOME}/Git/CloudNotes/elvenware/development`;
const ext = '.md';
const fileInfos = await getReportOnFilesInDirectories(directory, ext);
debugFileInfos(fileInfos);
const matters = [];
for (const fileInfo of fileInfos) {
    fileInfo.category = guidePairs.cssguide.category;
    debugTestingFdir(chalk.red(`Testing fdir : ${fileInfo.directory}`));
    // debugTestingGp(chalk.greenBright(`Testing gp : ${guidePairs.cssGuide.path}`));
    const guidePair = findGuidePair(fileInfo.directory, guidePairs);
    const isMatch = testMatch(fileInfo, guidePair);

    if (isMatch) {
        debugTestingGp(chalk.greenBright(`Testing gp : ${fileInfo.directory}`));
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
