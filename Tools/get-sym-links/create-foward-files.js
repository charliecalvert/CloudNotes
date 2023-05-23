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

FILENAME has moved to a [new location](NEW-LOCATION).
`;

function mapSymlinkPairs(writeData = false) {
    debug('mapSymlinkPairs called');
    let symLinks = Object.values(symlinkPairs);

    // symLinks.forEach((link) => console.log(link));
    const result = symLinks.map((linkData, index) => {
        let tempNewData = newData;
        const { fileName, fullPath, linkString, linkPath } = linkData;
        debug('fileName', fileName);
        debug('fullPath', fullPath);
        debug('linkString', linkString);
        debug('linkPath', linkPath);
        // Create a file with frontMatter and a link
        // to the new location
        // read the originalFile and get its frontMatter
        // in tempNewData insert the frontMatter and the link
        // by replacing FRONT-MATTER with the frontMatter
        // by replacing NEW-LOCATION with the fullPath
        const content = fs.readFileSync(linkPath, 'utf8');
        const frontMatter = matter(content).matter
        debugContent('CONTENT A', frontMatter);
        // debugContent('CONTENT D', matter(content).data);
        // remove all path before /Assignments/ and replace with empty string
        const relativePath = fullPath.replace(/.*\/Assignments\//, '');
        // const pathSplit = fullPath.substring('/Assignments/');
        tempNewData = tempNewData.replace(/FILENAME/, fileName);
        tempNewData = tempNewData.replace(/NEW-LOCATION/, relativePath);
        tempNewData = tempNewData.replace(/FRONT-MATTER/, frontMatter);
        debug(`NEW DATA ${index}`, tempNewData);
        if (writeData === true) {
            fs.writeFileSync(
                `${linkPath}`,
                tempNewData
            );
            debug(`Wrote ${linkPath}`);
        }

        return { fn: fileName, nd: tempNewData };
    });
    debug('symLinkFile item:', result.length);
};

mapSymlinkPairs(true);
