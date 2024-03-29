const util = require('util');
var exec = util.promisify(require('child_process').exec);

async function callExec(command) {
    try {
        const { stdout, stderr } = await exec(command);
       /*  console.log('stdout:', stdout);
        console.log('stderr:', stderr); */
        if (typeof (stderr) != "string") {
            throw new Error(stderr);
        } else {
            return stdout;
        }
    } catch (e) {
        console.error(e); // should contain code (exit code) and signal (that caused the termination).
    }
}
// https://stackoverflow.com/a/29655902/253576
var result = function (command) {
    return new Promise((resolve, reject) => {
        var child = exec(command, (err, stdout, stderr) => {
           /*  console.log('stdout:', stdout);
            console.log('stderr:', stderr);
            console.log('err:', err); */
            if (err != null) {
                reject(new Error(err), null);
            } else if (typeof (stderr) != "string") {
                reject(new Error(stderr), null);
            } else {
                resolve(stdout);
            }
        });
    });
}

exports.callExec = callExec;
exports.result = result;