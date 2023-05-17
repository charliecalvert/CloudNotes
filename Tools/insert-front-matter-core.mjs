import chalk from 'chalk';
import guidePairs from './insert-front-matter/directories.js';
import { findCategory } from './insert-front-matter/find-category.mjs';
import { addFrontMatterToOneFile } from './insert-front-matter/elf-utils.mjs';
import { testMatch } from './insert-front-matter/directorPairsTest.js';
import { findGuidePair } from './insert-front-matter/findGuidePair.js';
// import { fileInfos, debugTestingFdir, debugTestingGp, debug } from './walk-markdown-files.mjs';

import createDebugMessages from 'debug';
export const debug = createDebugMessages('lib:walk-markdown-files');
export const debugTestingFdir = createDebugMessages('lib:walk-markdown-files:fdir');
export const debugTestingGp = createDebugMessages('lib:insert-fm:gp');

/**
 * Write the front matter to a file
 * Push the file information object to an array
 *
 * @param {object} fileInfo
 * @param {array} matters
 * @param {boolean} isMatch
 */
function recordResults(fileInfo, matters) {
    const frontMatter = addFrontMatterToOneFile(fileInfo);
    if (frontMatter) {
        matters.push(frontMatter);
    } else /* if (isMatch) */ {
        // debug(chalk.red(`No front matter: ${fileInfo.fullPath}`));
        matters.push(`No front matter: ${fileInfo.fullPath}\n`);
    }
}

export function walkMarkdownCore(fileInfos) {
    const matters = [];
    for (const fileInfo of fileInfos) {
        fileInfo.category = guidePairs.cssguide.category;
        debugTestingFdir(chalk.red(`Testing fdir : ${fileInfo.directory}`));
        // debugTestingGp(chalk.greenBright(`Testing gp : ${guidePairs.cssGuide.path}`));

        // find the
        const guidePair = findGuidePair(fileInfo.directory, guidePairs);
        if (!guidePair) {
            continue;
        }
        debugTestingGp(chalk.blueBright(`Testing gp : ${guidePair.path}`));
        debugTestingGp(chalk.blueBright(`Testing gp : ${guidePair.category}`));
        debugTestingGp(chalk.blueBright(`Testing gp : ${guidePair.type}`));
        debugTestingGp(chalk.greenBright(`${fileInfo.directory}`));
        // const isMatch = testMatch(fileInfo, guidePair);

        //if (isMatch) {
            // debugTestingGp(chalk.greenBright(`Testing gp : ${fileInfo.directory}`));
            // findCategory(fileInfo);
            fileInfo.category = guidePair.category; // eslint-disable-line no-param-reassign
            debug(chalk.yellowBright(`Found: ${fileInfo.fullPath}`));
            recordResults(fileInfo, matters);
        //}
    }
    return matters;
}


