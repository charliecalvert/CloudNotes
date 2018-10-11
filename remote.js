const execer = () => {
    const exec = require('child_process').exec;
    
    var yourscript = exec('./push "new code"',
        (error, stdout, stderr) => {            
            // console.log(`${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
        
	yourscript.stdout.on('data', (data) => {
		console.log(data);
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

execer();
//ssher();
