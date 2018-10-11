const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
    
const execPush = () => {
   
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
		console.log(`PUSH exited with code ${code}`);
	});

}

const execSend = () => {

    
    var yourscript = spawn('/home/charlie/Git/CloudNotes/send', ['test args']);
        
	yourscript.stdout.on('data', (data) => {
		console.log(`child stdout:\n${data}`);
		//console.log("SEND", data);
	});
	
	yourscript.stderr.on('data', (data) => {
		console.log(`child stderr:\n${data}`);
		//console.error("SEND", data);
	});
	
	yourscript.on('close', (code) => {
		console.log(`send exited with code ${code}`);
	});

}

const ssher = () => {
    var Client = require('ssh2').Client;

    var conn = new Client();
    conn.on('ready', function() {
        console.log('Client :: ready');
        conn.exec('~/bin/pull-key-repos', function(err, stream) {
            if (err) throw err;
            stream.on('close', function(code, signal) {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                conn.end();
            }).on('data', function(data) {
                console.log('STDOUT: ' + data);
            }).stderr.on('data', function(data) {
                console.log('STDERR: ' + data);
            });
        });
    }).connect({
        host: '52.35.150.195',
        port: 22,
        username: 'ubuntu',
        privateKey: require('fs').readFileSync(process.env.HOME + '/.ssh/Home-2016-03')
    });

}

execPush();
execSend();
ssher();
