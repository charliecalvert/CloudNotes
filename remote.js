const exec = require('child_process').exec;
const spawn = require('child_process').spawn;

//const execPush = () => {

const execPush = new Promise(function (resolve, reject) {

        var yourscript = exec('~/Git/CloudNotes/push "new code"',
            (error, stdout, stderr) => {
                // console.log(`${stderr}`);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
            });

        yourscript.stdout.on('data', (data) => {
            console.log('PUSH', data);
        });

        yourscript.stderr.on('data', (data) => {
            console.error('PUSH', data);
        });

        yourscript.on('close', (code) => {
            resolve({
                result: 'success',
                code: code
            });
        });

        yourscript.on('error', (code) => {
            reject({
                result: 'error',
                code: code
            });
        });
    });
//};

const execSend = () => {

    return new Promise(function (resolve, reject) {
        var yourscript = spawn('/home/charlie/Git/CloudNotes/send', ['test args']);
        //var yourscript = spawn('/home/charlie/Git/CloudNotes/send test args');

        yourscript.stdout.on('data', (data) => {
            console.log(`child stdout:\n${data}`);
            //console.log("SEND", data);
        });

        yourscript.stderr.on('data', (data) => {
            console.log(`child stderr:\n${data}`);
            //console.error("SEND", data);
        });

        yourscript.on('close', (code) => {
            //console.log(`send exited with code ${code}`);
            resolve({
                result: 'success',
                code: code
            });
        });

        yourscript.on('error', (code) => {
            reject(code);
            // console.log(`send errored with code ${code}`);		
        });

    });
};

const ssher = () => {
    var Client = require('ssh2').Client;

    var conn = new Client();
    conn.on('ready', function () {
        console.log('Client :: ready');
        conn.exec('~/bin/pull-key-repos', function (err, stream) {
            if (err) throw err;
            stream.on('close', function (code, signal) {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                conn.end();
            }).on('data', function (data) {
                console.log('STDOUT: ' + data);
            }).stderr.on('data', function (data) {
                console.log('STDERR: ' + data);
            });
        });
    }).connect({
        host: '52.35.150.195',
        port: 22,
        username: 'ubuntu',
        privateKey: require('fs').readFileSync(process.env.HOME + '/.ssh/Home-2016-03')
    });

};


/*
execPush()
    .then((code) => {
        console.log(`send exited with result: ${code.result} and code: ${code.code}`);
    })
    .catch((code) => {
        console.log(`send errored with result: ${code.result} and code: ${code.code}`);
    });

execSend()
    .then((code) => {
        console.log(`send exited with resule: ${code.result} and code: ${code.code}`);
    })
    .catch((code) => {
        console.log(`send errored with code ${code}`);
    });
*/



Promise.all([execPush])
    .then((code) => {
        console.log(code);
        //console.log(`send exited with result: ${code.result} and code: ${code.code}`);
    })
    .catch((code) => {
        console.log(`send errored with code ${code}`);
    });


//ssher();