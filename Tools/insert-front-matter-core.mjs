import chalk from 'chalk';
import guidePairs from './insert-front-matter/directories.js';
import { addFrontMatterToOneFile } from './insert-front-matter/elf-utils.mjs';
import { findGuidePair } from './insert-front-matter/findGuidePair.js';
// import { fileInfos, debugTestingFdir, debugTestingGp, debug } from './walk-markdown-files.mjs';

import createDebugMessages from 'debug';
export const debug = createDebugMessages('lib:walk-markdown-files');
export const debugTestingFdir = createDebugMessages('lib:walk-markdown-files:fdir');
export const debugTestingGp = createDebugMessages('lib:walk-markdown-files:gp');
export const debugTestingNoGp = createDebugMessages('lib:walk-markdown-files:nogp');

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
        if (fileInfo.fullPath.includes('Linux')) {
            debugTestingFdir(chalk.red(`Testing fdir : ${fileInfo.directory}`));
        }

        const guidePair = findGuidePair(fileInfo.directory, guidePairs);
        if (!guidePair) {
            debugTestingNoGp(chalk.red(`No guide pair: ${fileInfo.directory}`));
            continue;
        }
        debugTestingGp(chalk.blueBright(`Testing gp : ${guidePair.path}`));
        debugTestingGp(chalk.blueBright(`Testing gp : ${guidePair.category}`));
        debugTestingGp(chalk.blueBright(`Testing gp : ${guidePair.type}`));
        debugTestingGp(chalk.greenBright(`${fileInfo.directory}`));

        fileInfo.category = guidePair.category; // eslint-disable-line no-param-reassign

        if (fileInfo.fullPath.includes('Linux')) {
            debug(chalk.yellowBright(`Found: ${fileInfo.fullPath}`));
        }
        // recordResults(fileInfo, matters);

    }
    return matters;
}


