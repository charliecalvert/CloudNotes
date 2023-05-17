import chalk from 'chalk';
import { walkMarkdownCore } from './insert-front-matter-core.mjs';
import { getReportOnFilesInDirectories } from './insert-front-matter/elf-utils.mjs';

import createDebugMessages from 'debug';
const debugSummary = createDebugMessages('lib:walk-markdown-files:summary');
const debugFileInfos = createDebugMessages('lib:walk-markdown-files:fileInfos');


/*
Walk through a Directory or recursive set of directories
to see all the files present with a markdown extension,
and to test if they have front matter or not.
*/

const directory = `${process.env.HOME}/Git/CloudNotes/elvenware/development`;
const ext = '.md';

export const fileInfos = await getReportOnFilesInDirectories(directory, ext);
debugFileInfos(fileInfos);

const matters = walkMarkdownCore(fileInfos);
debugSummary(chalk.yellowBright(matters));

