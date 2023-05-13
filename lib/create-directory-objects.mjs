
import elfStrings from 'elven-code';
import utility from 'node:util';
import createDebugMessages from 'debug';
const debugObj = createDebugMessages('lib:create-directory-objects:obj');
const debugDirs = createDebugMessages('lib:create-directory-objects:dirs');
const debugCall = createDebugMessages('lib:create-directory-objects:call');

const notWanted = [
    '.vscode', '__tests__', 'node_modules', 'bin',
    'lib', 'test', 'dist',
    'coverage', 'docs', 'public',
    'src', 'build'];

/**
 * Called by reduce to create a list of directory objects
 *
 * @param {object} directoryInfoAccumulator A list of directory objects
 * @param {string} currentDirectory A directory name
 * @returns
 */
function getDirs(directoryInfoAccumulator, currentDirectory) {
    debugCall('myfunc called', directoryInfoAccumulator, currentDirectory);

    const key = elfStrings.getEndFromCharacter(currentDirectory, '/');
    const obj = {
        category: utility.format(`%s-guide`, key.toLowerCase()),
        type: key,
        path: currentDirectory,
        originalPath: currentDirectory,
        notes: ''
    };
    debugObj(obj);

    if (!notWanted.includes(key)) {
        directoryInfoAccumulator[key.toLowerCase()] = obj;
    }
    return directoryInfoAccumulator;
}

async function createSortedDirectoryRecords(directories) {
    const { default: sortIt } = await import('./sorting.mjs');

    const directoriesObject = directories.reduce(getDirs, {});
    debugDirs(directoriesObject);
    const sortedDirs = sortIt(directoriesObject);
    return sortedDirs;
}

export default createSortedDirectoryRecords;
