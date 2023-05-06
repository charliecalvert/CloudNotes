import { walkSimple } from 'walk-directories';
import elfUtils from 'elven-code';
import { buildFrontMatter } from 'elven-jekyll-post';

import createDebugMessages from 'debug';
const debug = createDebugMessages('routes:index');
const debugFile = createDebugMessages('routes:index-detail');
const debugCall = createDebugMessages('called');
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { readFileSync, writeFileSync } from 'node:fs';

/*
Walk through a Directory or recursive set of directories 
to see all the files present with a markdown extension, 
and to test if they have front matter or not..
*/

const __filename = fileURLToPath(import.meta.url);

const guides = [
    android-guide, art-guide, cloud-guide,
    csharp-guide, css-guide, database-guide,
    design-guide, expressions-guide, firebase-guide,
    git-guide, html-guide, java-guide,
    javascript-guide, jquery-guide, mobile-guide,
    os-guide, php-guide, python-guide,
    server-guide, slash-guide, tests-guide,
    web-guide
];

const guidePairs = {
    'android-guide': 'Android',
    'art-guide': 'Art',
    'cloud-guide': 'Cloud',
    'csharp-guide': 'C#',
    'css-guide': 'CSS',
    'database-guide': 'Database',
    'design-guide': 'Design',
    'expressions-guide': 'Expressions',
    'firebase-guide': 'Firebase',
    'git-guide': 'Git',
    'html-guide': 'HTML',
    'java-guide': 'Java',
    'javascript-guide': 'JavaScript',
    'jquery-guide': 'jQuery',
    'mobile-guide': 'Mobile',
    'os-guide': 'OS',
    'php-guide': 'PHP',
    'python-guide': 'Python',
    'server-guide': 'Server',
    'slash-guide': 'Slash',
    'tests-guide': 'Tests',
};

const guidePairsArrays = [
    ['android-guide', 'Android'],
    ['art-guide', 'Art'],
    ['cloud-guide', 'Cloud'],
    ['csharp-guide', 'C#'],
    ['css-guide', 'CSS'],
    ['database-guide', 'Database'],
    ['design-guide', 'Design'],
    ['expressions-guide', 'Expressions'],
    ['firebase-guide', 'Firebase'],
    ['git-guide', 'Git'],
    ['html-guide', 'HTML'],
    ['java-guide', 'Java'],
    ['javascript-guide', 'JavaScript'],
    ['jquery-guide', 'jQuery'],
    ['mobile-guide', 'Mobile'],
    ['os-guide', 'OS'],
    ['php-guide', 'PHP'],
    ['python-guide', 'Python'],
    ['server-guide', 'Server'],
    ['slash-guide', 'Slash'],
    ['tests-guide', 'Tests'],
    ['web-guide', 'Web']
];

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

function addFrontMatterToOneFile(fileName) {
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

const directory = `${process.env.HOME}/Git/CloudNotes/elvenware/development/web/CssGuide`;
const ext = '.md';
await iterateFiles();

