## Overview

Additional hints on getting WebCraft converted to React.

## Git Ignore

If you haven't done so already, add add two items to your **.gitignore file**:

```nohighlighting
bundle.js
bundle.js.map
```

These can both be big files, and care easily reproduced from existing source, so there is no need to check them in. If you are checking them in at this time, remove them with code like these:

```nohighlighting
git rm public/javascripts/bundle.js
git rm public/javascripts/bundle.js.map
```

## Bugs

There are two bugs in **isit-site-tools** that need to be fixed. The simplest way to get the fix is to merge in the code from the upstream repository that you forked earlier. I ran the following from the root of **isit-site-tools**:

    git pull git@github.com:charliecalvert/isit-site-tools.git

Our changes are preserved in this process. In other words, it will not cause the **require** statements that we inserted with the **find** and **sed** commands to be changed back to their original values.

**NOTE** _See point 5 in [this documentation][sync] for confirmation that your changes will not be lost._

Please also see this: which would probably simplify the process, but I have not tried it yet:

- <https://gist.github.com/CristinaSolana/1885435>

Below I describe the changes in detail, but you should not actually have to do anything, since the merge described above made the necessary changes.

## Bugs: The Case of the Wrong Config File {#config-wrong}

Please read the section called [Bugs](#bugs) before reading more.

**Isit-Site-Tools** has a file a bug in it. It is currently found here:

  /markdown-to-html/runners/sample-runner.js

The file is meant to show how to use **isit-site-tools**. Unfortunately, I'm currently using it as an entry point into the **isit-site-tools** library.

**isit-site-tools** can be configured to use either the local version of the configuration file, or a remote version. By default, it uses the local version. This is not what we want in this case. So we need to explicitly ask it to use the remote version. Here is the fix, which involves passing in a variable called **useLocalConfig**:

```javascript
function runConfig(user, siteDirsOffset, useLocalConfig) {
    'use strict';
    return new Promise(function(resolve, reject) {
        if (typeof useLocalConfig !== 'undefined') {
            config.useLocalConfig = useLocalConfig;
        }
        config.loadAsync()
            .then(function(configuration) {
                createMarkdown(configuration[user], siteDirsOffset)
                    .then(resolve);
            })
            .catch(function(err) {
                throw err
            })
    });
}
```

In **isit-web-crafts** the method is called from here:

    routes/makers.js

The new call looks like this, where the important change is in the third parameter to **walkRunner**:

```javascript
router.get('/walk', function(request, response) {    
    walkRunner('calvert', request.query.siteDirsIndex, false)
        .then(function(report) {
            response.send(report);
        })
        .catch(function(err) {
            throw err;
        });
});
```

## Bug: The Case of the Missing Markdown {#missing-markdown}

Please read the section called [Bugs](#bugs) before reading more.

The **WebCrafts** program looks in the directory it is configered to look in for Markdown files. The directory is specified in the **ElvenConfig.js** file. If it finds Markdown files, it converts them to HTML. If it finds a directory contains no Markdown files that have changed since the **most-recent-date** sepecified in the config file, then it blows up.

The problem is in a file called:

    markdown-to-html/private/walker.js

Here is the fix to the **walker.makePage** from that file:

```javascript
walker.makePage = function(details, callback) {
    'use strict';

    details.callback = callback;
    makePage.init();

    // if we found nothing then return nothing
    if (details.directories.length === 0) {
        callback([],[])
    } else {
        details.directories.forEach(function(directory, index) {
            makePage.run(directory, index, details);
        });
    }
};
```

The key change is the line that looks for an empty directories property and return to emtpy arrays if it is found. Otherwise, the **details.directories** object is iterated with **forEach** and the markdown found in the directories is converted to HTML. The code called by **makePage.run** note only performs the conversion, but also returns an object with detailed information about which files were converted. That object is then passed to our client so that the user can see what the the program did.

[sync]: https://help.github.com/articles/syncing-a-fork/
