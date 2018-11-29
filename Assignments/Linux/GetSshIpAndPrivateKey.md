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
                //var pattern = new RegExp('Host ec2-bc[\\s\\S]\\s*(.*)[\\s\\S]\\s*(.*)[\\s\\S]\\s*(.*)[\\s\\S]\\s*(.*)');
                var pattern = new RegExp('Host ec2-bc\n\t(.*)\n\t(.*)\n\t(.*)\n\t(.*)');
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

**NOTE**: _You have to add this to the **rules** in eslintrc.json: "no-control-regex": "off"._

This function will open up **~/.ssh/config** and parse this entry or one like it:

```
# Educate
Host ec2-bc
	HostName 18.215.138.128
	Port 22
	User ubuntu
	IdentityFile ~/.ssh/ec2-320-inclass
```

Unfortunately, you must use tabs, rather than spaces, to get this to work properly. (In my defense, the JavaScript RegEx for dealing with spaces is very fussy!). So, assuming that backslash t (\t) is the symbol for tabs:

```
Host ec2-bc
\tHostName 18.215.138.128
\tPort 22
\tUser ubuntu
\tIdentityFile ~/.ssh/ec2-320-inclass
```  

But of course, you should have real tabs, not the escaped symbol for them, in your file. I believe you can have any number of entries in the file, that is you can define multiple hosts, and they can be in any order. The only requirement is that each entry for a host must begin with a single tab. Sorry about the limitation.

In geany, see **Document | Replace spaces with tabs** and **View | Show white space**. Also, in **Edit | Preferences | Editor | Indentation** you can set your preferences for tabs vs spaces as the default character.

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

You'll have to modify this parameters of your equivalent of the **runUpdate** method, and you will need to modify this portion of that code:

```
.connect({
    host: hostAddress,
    port: 22,
    username: 'ubuntu',
    privateKey: require('fs').readFileSync(
        process.env.HOME + '/.ssh/ElfWest.pem'
    )
});
```

Your version of the code will look a bit different than that, but I want you to have to figure out at least a few pieces of the process.

## Turn it in

There are various projects where this needs to be done. Wherever you are using **ssh-runner-js** you should insert this code. The point is that I should not need to edit your code to insert the IP address and identity file that I use in my **~/.ssh/config**. I should be able to just run your code and it should work.

    -elf-tagger "no longer hard coding IP and Private Key" "<list the projects where you use it>"

And continue to specify branch and folder.

**NOTE**: I have not tested the code that thoroughly, but it should work so long as you have done a reasonable job of formatting your **config** file. If its not working, let me know.

For testing, pull JsObjects and look here:

    ~/Git/JsObjects/JavaScript/SystemCalls/GetSshConfigIp

That's where I developed the code.
