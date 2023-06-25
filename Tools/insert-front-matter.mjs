import chalk from 'chalk';
import { walkMarkdownCore } from './insert-front-matter-core.mjs';
import { getReportOnFilesInDirectories as getReports } from './insert-front-matter/elf-utils.mjs';

import createDebugMessages from 'debug';
const debugSummary = createDebugMessages('lib:walk-markdown-files:summary');
const debugFileInfos = createDebugMessages('lib:walk-markdown-files:fileInfos');

/*
Walk through a Directory or recursive set of directories
to see all the files present with a markdown extension,
and to test if they have front matter or not.

Be sure to set the directory or directories to walk through
in the directoryOptions array.

Note the call to recordResults() in the walkMarkdownCore() file.

@see package.json for the run variable InsertFrontMatterNotWorking2

The function getReportOnFilesInDirectories() aka getReports() returns
an array of objects that contain the following properties:

{
   directory: '/home/ubuntu/Git/CloudNotes/Assignments/Heroku',
   fullPath: '/home/ubuntu/Git/CloudNotes/Assignments/Heroku/Summary.md',
   fileName: 'Summary.md',
   isSymbolicLink: false,
   isFile: true,
   isDirectory: false,
   isSocket: false,
   isChacterDevice: false,
   isBlockDevice: false,
   isFIFO: false,
   relativePath: '/Summary.md',
   walkData: {
     origDir: '/home/ubuntu/Git/CloudNotes/Assignments/Heroku',
     startDirectory: '/home/ubuntu/Git/CloudNotes/Assignments/Heroku',
     dirs: [Circular *1],
     wildcard: '.md'
   },
   dirent: Dirent { name: 'Summary.md', [Symbol(type)]: 1 }
}
*/

const directoryOptions = () => {
    const elvenware = `${process.env.CLOUDNOTES}/elvenware/development`;
    const assignments = `${process.env.CLOUDNOTES}/Assignments`;
    const ecmascript = `${process.env.CLOUDNOTES}/Assignments/EcmaScript`;
    const heroku = `${process.env.CLOUDNOTES}/Assignments/Heroku`;
    return { elf: elvenware, asign: assignments, es: ecmascript, heroku };
}

const dirs = directoryOptions();
const ext = '.md';

const fileInfos = await getReports(dirs.heroku, ext);
debugFileInfos(fileInfos);

const matters = walkMarkdownCore(fileInfos);
debugSummary(chalk.yellowBright(matters));

