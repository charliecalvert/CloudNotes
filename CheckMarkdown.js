const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const elfUtils = require('elven-code').elfUtils;
//const utils = require('./lib/utils');
const matter = require('gray-matter');

async function ls01(path) {
    const dir = await fs.promises.opendir(path)
    for await (const dirent of dir) {
        console.log(dirent);
        console.log(dirent.name);
        console.log('Directory', dirent.isDirectory());
        console.log('File', dirent.isFile());
        console.log('BlockDevice', dirent.isBlockDevice());
        console.log('isCharacterDevice', dirent.isCharacterDevice());
        console.log('isSymbolicLink', dirent.isSymbolicLink());
        console.log('isFIFO', dirent.isFIFO());
        console.log('isSocket', dirent.isSocket());
    }
}

async function ls02(path) {
    const dir = await fs.promises.opendir(path)
    for await (const dirent of dir) {
        console.log(dirent);
        console.log(dirent.name);
        if (dirent.isDirectory()) {
            console.log('isDirectory');
        } else if (dirent.isFile()) {
            console.log('File', dirent.isFile());
        } else if (dirent.isBlockDevice()) {
            console.log('BlockDevice', dirent.isBlockDevice());
        } else if (dirent.isCharacterDevice()) {
            console.log('isCharacterDevice', dirent.isCharacterDevice());
        } else if (dirent.isSymbolicLink()) {
            console.log('isSymbolicLink', dirent.isSymbolicLink());
        } else if (dirent.isFIFO()) {
            console.log('isFIFO', dirent.isFIFO());
        } else if (dirent.isSocket()) {
            console.log('isSocket', dirent.isSocket());
        };
    }
}

async function lsDirs(path) {
    const dir = await fs.promises.opendir(path)
    for await (const dirent of dir) {
        if (dirent.isDirectory()) {
            console.log(dirent);
            console.log(dirent.name);
            lsDirs(dirent.name).catch(console.error)
        }
    }
}



var walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};


/* 
 * The function* (function keyword plus asterisk) is a 
 * generator function, that returns a Generator object. 
 * - see mdn (https://mzl.la/3MbWmiM)
 * yield can be treated like an array, you can iterate
 * over it one item at a time. Use next() or for loop.
 */
async function* walker(dir) {
    for await (const d of await fs.promises.opendir(dir)) {
        const entry = path.join(dir, d.name);
        if (d.isDirectory()) {
            yield* walker(entry);
        }
        else if (d.isFile() && elfUtils.getExtension(d.name) === 'md') {
            yield entry;
        }
    }
}



var ep = require("./exec-process.js");

async function hasElfCode(fileName) {
    let result = {};
    const regexToc = /(?:<!-- toc(?:\s*stop)? -->)/g;
    //const regexElf = /(?:<!-- bar(?:\s*stop)? -->)/g;
    const regexElf = /^---/
    let markdown = await elfUtils.readFileAsync(fileName);
    // console.log(markdown);
    if (regexToc.test(markdown)) {
        console.log('Has TOC code');
        result.hasTocCode = true;
    } else {
        console.log('No TOC code');
        result.hasTocCode = false;
        result.markdown = markdown;
    }

    if (regexElf.test(markdown)) {
        console.log('Has ELF code');
        result.hasElfCode = true;
    } else {
        console.log('No ELF code');
        result.hasElfCode = false;
        if (!result.markdown) result.markdown = markdown;
    }
    return result;
}

async function addElfCode(fileName, elfCodes) {
    //const elfStr = `\n<!-- bar -->\n<!-- barstop -->`;
    const elfStr = `\n---\nfullpath=${fileName}\n---`;
    const tocStr = `\n\n<!-- toc -->\n<!-- tocstop -->`;

    if (elfCodes.hasElfCode + elfCodes.hasTocCode === 0) {
        console.log('aec Has no code');
        elfCodes.markdown = elfStr + tocStr + '\n\n' + elfCodes.markdown;
    } else if (!elfCodes.hasElfCode) {
        console.log('aec Has no elf code', elfStr);
        elfCodes.markdown = elfStr + '\n\n' + elfCodes.markdown;
    } else {
        obj = matter(elfCodes.markdown);
        let margie = '';
        for (const property in obj.data) {
            margie += `${property}: ${obj.data[property]}\n`;
        }
        //const margie = JSON.stringify(obj.data);
        elfCodes.markdown = `\n---\n${margie}---` + tocStr + obj.content;
    }
    console.log('aec markdown', elfCodes.markdown);
}

function getDocBySlug(slug) {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = join(docsDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return { slug: realSlug, meta: data, content }
}

// Then, use it with a simple async for loop
async function main() {
    for await (const p of walker('elvenware')) {
        const fileName = process.env.HOME + '/Git/CloudNotes/' + p
        console.log(fileName);
        const stats = await fsp.stat(fileName);
        console.log(stats);
        // execProcess();
        const command = "sh git-call.sh " + fileName;
        //const result = await ep.callExec(command);
        const result = await ep.result(command);
        console.log('cm result:', result);
        const elfCodes = await hasElfCode(fileName);
        // console.log('health codes', elfCodes);
        if ((elfCodes.hasElfCode) + (elfCodes.hasTocCode) <= 1) {
            console.log('needs work');
            await addElfCode(fileName, elfCodes);
        }
        /*  {
             if(!err){
                 console.log(response);
             }else {
                 console.log(err);
             }
         }); */
        return;
    }
}

//ls01('.').catch(console.error)
//ls02('.').catch(console.error)
//lsDirs('.').catch(console.error)
/* walk('elvenware', (err,b) => { 
    if (err) throw err;
    console.log(b)
}); */

main().catch(console.error);