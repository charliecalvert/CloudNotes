import { walkSimple } from 'walk-directories';
import elfUtils from 'elven-code';

import { buildFrontMatter } from 'elven-jekyll-post';
import { DateTime } from 'luxon';
import { format } from 'node:util';

import createDebugMessages from 'debug';
const debug = createDebugMessages('routes:index');
const debugFile = createDebugMessages('routes:index-detail');
const debugCall = createDebugMessages('called');
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { readFileSync, writeFileSync } from 'node:fs';

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
 * console.log(fileInfos);
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
            throw new UserException('no infos');
        });

    if (fileInfos.length === 0) {
        throw new elfUtils.UserException('We received nothing');
    }
    debugFile('WALK_SIMPLE FILEINFOS', fileInfos);
    return fileInfos;
}

function addFrontMatterToOneFileA(fileName) {
    const content = readFileSync(fileName, 'utf8');
    const result = matter.test(content);

    if (result) {
        console.log('has front matter');
    } else {
        console.log('Building front matter');
        const frontMatter = buildFrontMatter('message01', 'misc');
        console.log(frontMatter);
        const contentWithFrontMatter = frontMatter + content;
        writeFileSync(fileName, contentWithFrontMatter, 'utf8');
    }
}

const getEndFromCharacter = function (value, char) {
    return value.substring(value.lastIndexOf(char) + 1, value.length);
};

function buildMatter(fileInfo) {
    const dt = DateTime.now();
    const dateString = format(`%s`, dt.toFormat('yyyy-MM-dd hh:mm:ss ZZZ'));
    console.log(dateString);
    const fullPath = fileInfo.fullPath;
    const category = fileInfo.category;
    const directoryPath = fileInfo.directory;
    const fileName = fileInfo.fileName;
    const relativePath = fileInfo.relativePath;
    const title = fileName.replace('.md', '');
    const directoryName = getEndFromCharacter(directoryPath, '/');
    const frontMatter = format(`---
layout: post
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
    const fileName = fileInfo.fullPath;
    const content = readFileSync(fileName, 'utf8');
    const result = matter.test(content);

    if (result) {
        console.log('has front matter');
        return null;
    } else {
        console.log('Building front matter');
        const frontMatter = buildMatter(fileInfo);
        console.log(frontMatter);

        const contentWithFrontMatter = frontMatter + content;
        writeFileSync(fileName, contentWithFrontMatter, 'utf8');
        return frontMatter
    }
}

async function iterateFiles(directory, ext) {

    const fileInfos = await getReportOnFilesInDirectories(directory, ext);
    console.log(fileInfos);
    const fileName = fileInfos[0].fullPath;
    console.log(fileName);

    for (const fileInfo of fileInfos) {
        console.log(fileInfo.fullPath);
        addFrontMatterToOneFile(fileName);
    }
}

async function iterateDirectories() {
    const directory = `${process.env.HOME}/Git/CloudNotes/elvenware/development/web/CssGuide`;
    const ext = '.md';
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