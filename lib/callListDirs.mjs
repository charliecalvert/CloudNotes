import { listDirs } from 'walk-directories';

import createDebugMessages from 'debug';
const debugListFiles = createDebugMessages('elf-listFiles');

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
