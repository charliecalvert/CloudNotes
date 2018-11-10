## Overview

Our goal is to stop hardcoding our hostAddress (hostName) and identityFile (privateKey) in **ssh-runner**.

    npm i --save elven-code

Put this function in **ssh-runner.js**

```JavaScript
// Near the top
const elfUtils = require('elven-code').elfUtils;

// Further down    
const getSshIp = () => {
    return new Promise(function (resolve, reject) {
        elfUtils.readFile(process.env.HOME + '/.ssh/config')
            .then((content) => {
                var pattern = new RegExp('Host ec2-bc[\\s\\S]\\s*(.*)[\\s\\S]\\s*(.*)[\\s\\S]\\s*(.*)[\\s\\S]\\s*(.*)');

                const result = {};
                const match = content.result.match(pattern);
                for (let i = 1; i < 5; i++) {
                    if (match[i].startsWith('HostName')) {
                        var hostPattern = new RegExp('HostName\\s(.*)');
                        result.hostName = match[i].match(hostPattern)[1];
                    }
                    if (match[i].startsWith('IdentityFile')) {
                        const idPattern = new RegExp('IdentityFile\\s(.*)');
                        const path = match[i].match(idPattern)[1];
                        result.identityFile = path.substring(path.lastIndexOf('/') + 1, path.length)
                    }
                }
                resolve(result);
            })
            .catch(reject);
    });
};
```

This function will open up **~/.ssh/config** and parse this entry or one like it:

```
# Educate
Host ec2-bc
	HostName 18.215.138.128
	Port 22
	User ubuntu
	IdentityFile ~/.ssh/ec2-320-inclass
```

It returns an object shaped like this:

```javascript
{
  hostName: '18.215.138.128',
  identityFile: 'ec2-320-inclass'
}
```

Thus we no longer have to hardcode that info in **ssh-runner**.

Call the method like this:

```javascript
router.get('/uptime', function(request, response) {
    console.log('run-get-started called in ssh-runner', hostAddress);
    getSshIp()
        .then((result) => {
            runUptime(result.hostName, result.identityFile, response);
        })
        .catch((err) => {
            response.send(err);
        });

});
```

## Turn it in

There are various projects where this needs to be done. Wherever you are using **ssh-runner-js** you should insert this code. The point is that I should not need to edit your code to insert the IP address and identity file that I use in my **~/.ssh/config**. I should be able to just run your code and it should work.

    -elf-tagger "no longer hard coding IP and Private Key" "<list the projects where you use it>"

And continue to specify branch and folder.

**NOTE**: I have not tested the code that thoroughly, but it should work so long as you have done a reasonable job of formatting your **config** file. If its not working, let me know.

For testing, pull JsObjects and look here:

    ~/Git/JsObjects/JavaScript/SystemCalls/GetSshConfigIp

That's where I developed the code.
