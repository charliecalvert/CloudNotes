// import fs from 'node:fs/promises';
import createDebugMessages from 'debug';

const debug = createDebugMessages('scripts:copy-symlinks');

/* eslint-disable no-console */
function splitEndOffPath(fullPathToSymlink) {
    const index = fullPathToSymlink.lastIndexOf('/');
    const pathToSymlink = fullPathToSymlink.substring(0, index);
    return pathToSymlink;
}

function createWorkStrings(fullPathToSymlink, fileName) {
    let pathToSymlink = '';
    pathToSymlink = splitEndOffPath(fullPathToSymlink);
    pathToSymlink = splitEndOffPath(pathToSymlink);
    debug('pathToSymlink', pathToSymlink);

    const fullPathToWholeFile = `${pathToSymlink}/${fileName}`;
    const copyCommand = `cp ${fullPathToWholeFile} ${fullPathToSymlink}`;
    debug('copyCommand', copyCommand);
    return { fullPathToWholeFile, copyCommand };
}

/**
 * Copy the target (the original whole) file over a symbolic link
 * @param {string} relativePathToWholeFile - The relative path to
 *      the original, whole file
 * @param {string} fullPathToSymlink - The full path to
 *   the SYMBOLIC LINK DESTINATION file
 * @returns {undefined} - Nothing
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_symlink_target_path_type_callback}
 */
function copySymlink(fileName, fullPathToSymlink) {
    const { fullPathToWholeFile, copyCommand } = createWorkStrings(fullPathToSymlink, fileName);
    // const dest = fullPathToSymlink.replace(/\.md$/, '.tmp');
    // renameExt(fullPathToSymlink);
    try {
        // fs.copyFileSync(fullPathToWholeFile, fullPathToSymlink);
        console.log(`Copied ${fullPathToWholeFile} to ${fullPathToSymlink}`);
    } catch (err) {
        console.error('Error copying file', err);
    }
    return copyCommand;
}

export default copySymlink;
