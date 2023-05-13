import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { readFileSync, writeFileSync } from 'node:fs';
import { walkSimple } from 'walk-directories';
import elfUtils from 'elven-code';

import { DateTime } from 'luxon';
import { format } from 'node:util';

import createDebugMessages from 'debug';
const debug = createDebugMessages('routes:index');
const debugFile = createDebugMessages('elf-utils:files');
const debugCall = createDebugMessages('elf-utils-called');

const __filename = fileURLToPath(import.meta.url);

/**
 * Get file information for all files of type
 * in a directory
 * @param {string} directory
 * @param {string} ext
 * @returns object with file information
 *
 * @example
 * const fileInfos = await getReportOnFilesInDirectories(directory, ext);
 * debug(fileInfos);
 *
 * Sample output: [{
 *    relativePath: '/TestCss.md',
 *    directory: '/home/ubuntu/Git/CloudNotes/elvenware/development/web/CssGuide',
 *    fullPath: '/home/ubuntu/Git/CloudNotes/elvenware/development/web/CssGuide/TestCss.md',
 *    fileName: 'TestCss.md'
 * }]
 */
async function getReportOnFilesInDirectories(directory, ext) {
    debugCall('GET FILE INFOS', __filename);
    const fileInfos = await walkSimple(directory, ext)
        .catch((error) => {
            debug('ERROR', error);
            throw new elfUtils.UserException('no infos');
        });

    if (fileInfos.length === 0) {
        throw new elfUtils.UserException('We received nothing');
    }
    debugFile('WALK_SIMPLE FILEINFOS', fileInfos);
    return fileInfos;
}

/* function addFrontMatterToOneFileA(fileName) {
    debugCall('ADD FRONT MATTER TO ONE FILE', __filename);
    const content = readFileSync(fileName, 'utf8');
    const result = matter.test(content);

    if (result) {
        debug('has front matter');
    } else {
        debug('Building front matter');
        const frontMatter = buildFrontMatter('message01', 'misc');
        debug(frontMatter);
        const contentWithFrontMatter = frontMatter + content;
        writeFileSync(fileName, contentWithFrontMatter, 'utf8');
    }
} */

const getEndFromCharacter = function (value, char) {
    debugCall('GET END FROM CHARACTER', __filename);
    return value.substring(value.lastIndexOf(char) + 1, value.length);
};

function buildMatter(fileInfo) {
    debugCall('BUILD MATTER', __filename);
    const dt = DateTime.now();
    const dateString = format(`%s`, dt.toFormat('yyyy-MM-dd hh:mm:ss ZZZ'));
    debug(dateString);
    const fullPath = fileInfo.fullPath;
    const category = fileInfo.category;
    const directoryPath = fileInfo.directory;
    const fileName = fileInfo.fileName;
    const relativePath = fileInfo.relativePath;
    const title = fileName.replace('.md', '');
    const directoryName = getEndFromCharacter(directoryPath, '/');
    const frontMatter = format(`---
layout: page
date: %s
fullPath: %s
directoryPath: %s
fileName: %s
relativePath: %s
title: %s
directoryName: %s
category : %s
---%s
`, dateString, fullPath, directoryPath,
    fileName, relativePath, title,
    directoryName, category, '\n'
    );
    return frontMatter;
}

function addFrontMatterToOneFile(fileInfo) {
    debugCall('ADD FRONT MATTER TO ONE FILE', __filename);
    const fileName = fileInfo.fullPath;
    const content = readFileSync(fileName, 'utf8');
    const result = matter.test(content);

    if (result) {
        debug('has front matter');
        return null;
    } else {
        debug('Building front matter');
        const frontMatter = buildMatter(fileInfo);
        debug(frontMatter);

        const contentWithFrontMatter = frontMatter + content;
        writeFileSync(fileName, contentWithFrontMatter, 'utf8');
        return frontMatter;
    }
}

async function iterateFiles(directory, ext) {
    debugCall('ITERATE FILES', __filename);
    const fileInfos = await getReportOnFilesInDirectories(directory, ext);
    debug(fileInfos);
    const fileName = fileInfos[0].fullPath;
    debug(fileName);

    for (const fileInfo of fileInfos) {
        debug(fileInfo.fullPath);
        addFrontMatterToOneFile(fileName);
    }
}

async function iterateDirectories() {
    debugCall('ITERATE DIRECTORIES', __filename);
    // const directory = `${process.env.HOME}/Git/CloudNotes/elvenware/development/web/CssGuide`;
    // const ext = '.md';
    await iterateFiles();
}

export {
    iterateDirectories,
    iterateFiles,
    getReportOnFilesInDirectories,
    addFrontMatterToOneFile,
    buildMatter,
    getEndFromCharacter
};
