import chalk from 'chalk';
import guidePairs from './insert-front-matter/directories.js';
import { findCategory } from './insert-front-matter/find-category.mjs';
import { addFrontMatterToOneFile } from './insert-front-matter/elf-utils.mjs';
import { testMatch } from './insert-front-matter/directorPairsTest.js';
import { findGuidePair } from './insert-front-matter/findGuidePair.js';
// import { fileInfos, debugTestingFdir, debugTestingGp, debug } from './walk-markdown-files.mjs';

import createDebugMessages from 'debug';
import { walkMarkdownCore } from './insert-front-matter-core.mjs';
export const debug = createDebugMessages('lib:walk-markdown-files');
export const debugTestingFdir = createDebugMessages('lib:walk-markdown-files:fdir');
export const debugTestingGp = createDebugMessages('lib:walk-markdown-files:gp');

export function walkMarkdownCore(fileInfos) {
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
    return matters;
}
