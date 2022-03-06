const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const debug = require('debug')('check-md');
const execProcess = require("./exec-process.js");
const walker = require('walk-directories').walker;
const debugCge = require('debug')('check-get-elf');
const debugAdd = require('debug')('check-add-elf');
const debugMain = require('debug')('check-main');
const elfUtils = require('elven-code').elfUtils;
//const utils = require('./lib/utils');
const matter = require('gray-matter');

async function getElfCode(fileName) {
    let result = {};
    const regexToc = /(?:<!-- toc(?:\s*stop)? -->)/g;
    //const regexElf = /(?:<!-- bar(?:\s*stop)? -->)/g;
    const regexElf = /^---/
    let markdown = await elfUtils.readFileAsync(fileName);
    debug(markdown);
    if (regexToc.test(markdown)) {
        debugCge('Has TOC code');
        result.hasTocCode = true;
    } else {
        debugCge('No TOC code');
        result.hasTocCode = false;
        //result.markdown = markdown;
    }

    if (regexElf.test(markdown)) {
        debugCge('Has ELF code');
        result.hasElfCode = true;
    } else {
        debugCge('No ELF code');
        result.hasElfCode = false;
       // if (!result.markdown) result.markdown = markdown;
    }
    result.markdown = markdown;
    return result;
}

const getTitleFromPath = function (fileName) {
    const str = elfUtils.getEndFromCharacter(fileName, '/')
    debug(str);
    var result = str.replace( /([A-Z])/g, "$1" );
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return elfUtils.stripExtension(finalResult);
};

async function addElfCode(fileName, relativePath, elfCodes) {
    //const elfStr = `\n<!-- bar -->\n<!-- barstop -->`;
    
    const title = getTitleFromPath(fileName);
    const elfStr = `---\nfullPath=${fileName}\nrelativePath=${relativePath}\ntitle=${title}\n---`;
    const tocStr = `\n\n<!-- toc -->\n<!-- tocstop -->`;
    
    if (elfCodes.hasElfCode + elfCodes.hasTocCode === 0) {
        debug('aec Has no code');
        elfCodes.markdown = elfStr + tocStr + '\n\n' + elfCodes.markdown;
    } else if (!elfCodes.hasElfCode) {
        debug('aec has no ELF code');
        elfCodes.markdown = elfStr + '\n\n' + elfCodes.markdown;
    } else if (!elfCodes.hasTocCode) {
        const debugToc = 'aec has no TOC code';
        getFrontMatterData(debugToc);
        let margie = getDataProperties(); 
        elfCodes.markdown = `---\n${margie}---` + tocStr + obj.content;
    } else {
        const debugBoth='aec has both but checking ELF code';
        getFrontMatterData(debugBoth);
        let margie = getDataProperties(); 
        elfCodes.markdown = `---\n${margie}---\n` + obj.content;
    }
    debug('aec final markdown', elfCodes.markdown);
    return elfCodes;

    function getFrontMatterAsJson(obj) {
        const margieJson = JSON.stringify(obj.data);
        debugAdd('margieJson', margieJson);
        return margieJson;
    }

    function getDataProperties() {
        let margie = '';
        for (const property in obj.data) {
            margie += `${property}: ${obj.data[property]}\n`;
        }
        return margie;
    }

    function getFrontMatterData(debugStr) {
        debugAdd(debugStr);
        obj = matter(elfCodes.markdown);
        debugAdd('obj.data', obj.data);
        obj.data.fullPath = fileName;
        obj.data.relativePath = relativePath;
        if (!obj.data.title)
            obj.data.title = title;
        obj.data.debug = debugStr;
        obj.data.creationLocalTime = new Date().toLocaleString();
    }
}

function getDocBySlug(slug) {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = join(docsDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return { slug: realSlug, meta: data, content }
}

async function setupElfCode(fileName, relativePath) {
    const elfCodes = await getElfCode(fileName);
    await addElfCode(fileName, relativePath, elfCodes);
    return elfCodes;
}
// Then, use it with a simple async for loop
async function main() {
    for await (const relativePath of walker('elvenware')) {
        const fileName = process.env.HOME + 
            '/Git/CloudNotes/' + relativePath
        debug(getTitleFromPath(fileName));
        const stats = await fsp.stat(fileName);
        debug(stats);
        // execProcess();
        const command = "sh git-call.sh " + fileName;
        //const result = await ep.callExec(command);
        const result = await execProcess.callProcess(command);
        debug('cm result:', result);
        const elfCodes = await setupElfCode(fileName, relativePath);
        debugMain(`ELF codes:\n${elfCodes.markdown}`);
        fsp.writeFile(fileName, elfCodes.markdown, "utf8");
        return;
    }
}

main().catch(console.error);

exports.getElfCode = getElfCode;
exports.addElfCode = addElfCode;
exports.setupElfCode = setupElfCode;


