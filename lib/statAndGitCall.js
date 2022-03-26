// const { gitCall } = require("./lib/getElfCode");
const fsp = require('fs').promises;
const execProcess = require('./exec-process.js');
const debug = require('debug')('statAndGit');

async function getStat(fileName) {
    return await fsp.stat(fileName);
}

async function gitCall(fileName) {
    const command = 'sh git-call.sh ' + fileName;
    const result = await execProcess.callProcess(command);
    debug('cm result:', result);
}

async function statAndGit(fileName) {
    debug(await getStat(fileName));

    await gitCall(fileName);
}

exports.gitCall = gitCall;
exports.getStat = getStat;
exports.statAndGit = statAndGit;
