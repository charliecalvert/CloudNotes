import { walkSimple } from 'walk-directories';
import createDebugMessages from 'debug';
const debug = createDebugMessages('routes:index');
const debugFile = createDebugMessages('routes:index-detail');
const debugCall = createDebugMessages('called');
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { readFileSync } from 'node:fs';

/*
It provides an example of how to walk through 
a Directory or recursive set of directories to 
see all the files present with a markdown extension, 
and to test if they have front matter or not..

*/

const __filename = fileURLToPath(import.meta.url);


async function getFileInfos(directory, ext) {
    debugCall('GET FILE INFOS', __filename);
    const fileInfos = await walkSimple(directory, ext)
        .catch((error) => {
            debug('ERROR', error);
            throw new UserException('no infos');
        });

    if (fileInfos.length === 0) {
        throw new UserException('We received nothing');
    }
    debugFile('WALK_SIMPLE FILEINFOS', fileInfos);
    return fileInfos;
}

const directory = `${process.env.HOME}/Git/CloudNotes/elvenware/development/web/CssGuide`;
const ext = '.md';
const fileInfos = await getFileInfos(directory, ext);
console.log(fileInfos);
const fileName = fileInfos[0].fullPath;
console.log(fileName);
const content = readFileSync(fileName, 'utf8');
const result = matter.test(content);
console.log(result);

