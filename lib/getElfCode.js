const fs = require('fs');
const fsp = require('fs').promises;
const execProcess = require("./exec-process.js");

const matter = require('gray-matter');
const { getTitleFromPath, readFileAsync } = require('elven-code').elfUtils;

/* Debug Symbols */
const debugAdd = require('debug')('check-add-elf');
const debug = require('debug')('check-md');
const debugCheckGetElfCode = require('debug')('check-get-elf');

async function gitCall(fileName) {
    const command = "sh git-call.sh " + fileName;
    const result = await execProcess.callProcess(command);
    debug('cm result:', result);
}

async function getElfCode(fileName) {
    let result = {};
    const regexToc = /(?:<!-- toc(?:\s*stop)? -->)/g;
    //const regexElf = /(?:<!-- bar(?:\s*stop)? -->)/g;
    const regexElf = /^---/;
    let markdown = await readFileAsync(fileName);
    debug(markdown);
    if (regexToc.test(markdown)) {
        debugCheckGetElfCode('Has TOC code');
        result.hasTocCode = true;
    } else {
        debugCheckGetElfCode('No TOC code');
        result.hasTocCode = false;
        //result.markdown = markdown;
    }

    if (regexElf.test(markdown)) {
        debugCheckGetElfCode('Has ELF code');
        result.hasElfCode = true;
    } else {
        debugCheckGetElfCode('No ELF code');
        result.hasElfCode = false;
        // if (!result.markdown) result.markdown = markdown;
    }
    result.markdown = markdown;
    return result;
}

async function addElfCode(fileName, relativePath, elfCodes) {
    const title = getTitleFromPath(fileName);
    //const elfStr = `---\nfullPath: ${fileName}\nrelativePath: ${relativePath}\ntitle: ${title}\n---`;
    const elfStr = "---\nfullPath: " + fileName +
        "\nrelativePath: " + relativePath +
        "\ntitle: " + title +
        "\n---";
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
        elfCodes.markdown = "---" + margie + "---" + tocStr + obj.content;
    } else {
        const debugBoth = 'aec has both but checking ELF code';
        getFrontMatterData(debugBoth);
        let margie = getDataProperties();
        if (margie.includes("0: f")) throw new Error("Bad header matter")
        //elfCodes.markdown = `---\n${margie}---\n` + obj.content;
        elfCodes.markdown = "---\n" + margie + "---\n" + obj.content;
    }
    debug('aec final markdown', elfCodes.markdown);
    return elfCodes;

    function getFrontMatterAsJson(obj) {
        const margieJson = JSON.stringify(obj.data);
        debugAdd('margieJson', margieJson);
        return margieJson;
    }

    function getDataProperties() {
        debugAdd('filenameAFTER', obj.data);
        let margie = '';
        for (const property in obj.data) {
            console.log(String(property));
            margie += property + ": " + obj.data[property] + "\n";
        }
        return margie;
    }

    function getFrontMatterData(debugStr) {
        elfCodes.data = {};
        debugAdd('filename', fileName);
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
async function getDocBySlug(slug) {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = join(docsDirectory, `${realSlug}.md`);
    const fileContents = await fsp.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return { slug: realSlug, meta: data, content };
}

async function setupElfCode(fileName, relativePath) {
    const elfCodes = await getElfCode(fileName);
    await addElfCode(fileName, relativePath, elfCodes);
    return elfCodes;
}

exports.getElfCode = getElfCode;
exports.addElfCode = addElfCode;
exports.setupElfCode = setupElfCode;
exports.gitCall = gitCall;