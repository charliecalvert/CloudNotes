var exec = require('child_process').exec;

// https://stackoverflow.com/a/29655902/253576
var result = function (command, cb) {
    return new Promise((resolve, reject) => {
        var child = exec(command, function (err, stdout, stderr) {
            if (err != null) {
                return reject(cb(new Error(err), null));
            } else if (typeof (stderr) != "string") {
                return reject(cb(new Error(stderr), null));
            } else {
                return resolve(cb(null, stdout));
            }
        });
    }
}

exports.result = result;