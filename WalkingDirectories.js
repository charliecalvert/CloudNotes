const fs = require('fs');
const fsp = require('fs').promises;
const elfUtils = require('elven-code').elfUtils;
const path = require('path');
const debugCge = require('debug')('walking-dirs');

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
 * Walk directories recursively
 *
 ^ The function* (function keyword plus asterisk) is a 
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

exports.walker = walker;
exports.walk = walk;

//ls01('.').catch(console.error)
//ls02('.').catch(console.error)
//lsDirs('.').catch(console.error)
/* walk('elvenware', (err,b) => { 
    if (err) throw err;
    debug(b)
}); */