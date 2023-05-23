import fs from 'node:fs/promises';

// Compare this snippet from
//   scripts/get-sym-links/get-symbolic-links.mjs:

function renameExt(fullPathToSymlink) {
    const dest = fullPathToSymlink.replace(/\.tmp$/, '.md');
    fs.rename(fullPathToSymlink, dest, (err) => {
        if (err) {
            console.error('Error renaming file', err);
        } else {
            console.log('File renamed successfully');
        }
    });
}

export default renameExt;
