//const { gitCall } = require("./lib/getElfCode");

async function getStat(fileName) {
    return await fsp.stat(fileName);
}

async function gitCall(fileName) {
    const command = "sh git-call.sh " + fileName;
    const result = await execProcess.callProcess(command);
    debug('cm result:', result);
}

async function statAndGit() {
    debugDetail(await getStat(fileName));

    await gitCall(fileName);
}

exports.gitCall = gitCall;
exports.getStat = getStat;