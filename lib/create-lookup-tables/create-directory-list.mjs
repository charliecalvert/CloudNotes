import { listDirs } from 'walk-directories';

import createDebugMessages from 'debug';
const debugListFiles = createDebugMessages('elf-listFiles');

/**
 * List all the files in a directory
 * @returns {Array} directories
 *
 * For a reference on my walk directories book here:
 *
 * @see https://www.npmjs.com/package/walk-directories
 */
async function listFiles() {
    const directories = [];
    const patheToExplore = `${process.env.HOME}/Git/CloudNotes`;
    const result = await listDirs(patheToExplore).catch(console.error);

    debugListFiles(typeof result);
    debugListFiles(result);

    result.map((fileName, index) => {
        debugListFiles(fileName);
        directories.push(fileName);
        return index;
    });
    debugListFiles(directories.length);
    return directories;
}

export default listFiles;
