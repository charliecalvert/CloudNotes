/* eslint-disable no-console */
import * as fs from 'node:fs';
import createDebugMessages from 'debug';
import matter from 'gray-matter';
import symlinkPairs from './symlink-pairs.mjs';
const debug = createDebugMessages('tools:create-forward-files');
const debugContent = createDebugMessages('tools:create-forward-files:content');

let newData = `---FRONT-MATTER
---

## Overview

This file has moved to a [new location](NEW-LOCATION).

`;

function mapSymlinkPairs(writeData = false) {
    debug('mapSymlinkPairs called');
    let symLinks = Object.values(symlinkPairs);

    // symLinks.forEach((link) => console.log(link));
    const result = symLinks.map((linkData, index) => {
        const { fileName, fullPath, linkString, linkPath } = linkData;
        debug('fileName', fileName);
        debug('fullPath', fullPath);
        debug('linkString', linkString);
        debug('linkPath', linkPath);
        // Create a file with frontMatter and a link
        // to the new location
        // read the originalFile and get its frontMatter
        // in newData insert the frontMatter and the link
        // by replacing FRONT-MATTER with the frontMatter
        // by replacing NEW-LOCATION with the fullPath
        const content = fs.readFileSync(linkPath, 'utf8');
        const frontMatter = matter(content).matter
        debugContent('CONTENT A', frontMatter);
        // debugContent('CONTENT D', matter(content).data);
        // const pathSplit = fullPath.split('/');
        newData = newData.replace(/NEW-LOCATION/, fullPath);
        newData = newData.replace(/FRONT-MATTER/, frontMatter);
        debug(`NEW DATA ${index}`, newData);
        if (writeData === true) {
            fs.writeFileSync(
                `${linkPath}`,
                newData
            );
            debug(`Wrote ${linkPath}`);
        }

        return { fn: fileName, nd: newData };
    });
    debug('symLinkFile item:', result.length);
};

mapSymlinkPairs(true);
