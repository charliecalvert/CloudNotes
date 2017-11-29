## Overview

The primary goal here is to make sure you can handle the updated **ElvenConfig.json** file that supports multiple **users**. Right now, the assignment is a bit sparse, but some might be interested in it so I'll make it available.

## References

These links help give some context to what is explained in more detail below.

- [Chistina Solana on updating a fork][csf]
- [GitHub help on merging upstream repo into fork][gmh]

## Update Isit-Code

    git remote add upstream git@github.com:charliecalvert/isit-code.git
    git fetch upstream
    git pull upstream master

You will probably get a few simple conflicts in your **package.json** file. You can fix these yourself with ease. Forget about fixing the **package-lock.json** file. Just delete it, and then type **npm install** to recreate. (If that doesn't work, delete your **node_modules** directory and type **npm install**.)

## Running Tests in Isit-Code

89 tests should pass.

## Update NPM Package

At the root of **isit-code**, add, commit and push. Then:

  npm version patch
  npm publish

## Running Tests in Isit-Site-Tools

Make sure you have the latest changes. Your **isit-site-tools** is a fork of my **isit-site-tools**. To update your code, you want to pull from my 'isit-site-tools' and merge it into your code. You forked from my repo, so you pull from it to get the most recent changes, then merge those changes.

You probably already ran the **add upstream** command, but just in case, I'll give you the whole process:

```nohighlighting
git remote add upstream git@github.com:charliecalvert/isit-site-tools.git
git fetch upstream
git pull upstream master
```

If you have already added the upstream, then you will get this error, which you can ignore:

    fatal: remote upstream already exists.

## Test images

Make sure that the node of **ElvenConfig.json** that is called  **elvenImages** contains **testImages**:

```json
"elvenImages": [
        {
            "name": "testImages",
            "baseDir": "/home/charlie/Git/writings/Tech/Markdown",
            "cloudPath": "/images",
            "createSmallImages": true
        }
]
```

## Update NPM Package

At the root of **isit-site-tools**, add, commit and push. Then:

  npm version patch
  npm publish


## WebCrafts

After getting your most recent **site-code** and **site-tools** packages, you have to make a few small changes to the **/config** route in **routes/makers**:

```javascript
router.get('/config', function(request, response) {
    'use strict';
    config.useLocalConfig = false;
    var user = 'calvert';
    config.loadAsync()
        .then(function(configData) {
            elfLog.nano('CONFIG DATA: ', JSON.stringify(configData, null, 4));

            var baseDir = config.get('users', user, 'base-dir');
            var siteDirs = config.get(// YOU CHANGE IT //);
            var mostRecentDate = config.get(// YOU CHANGE IT //);
            var destinationDirs = config.get(// YOU CHANGE IT //);
            var configSummary = {
                'baseDir': baseDir,
                'mostRecentDate': mostRecentDate,
                'siteDirs': siteDirs,
                'destinationDirs': destinationDirs
            };
            console.log('Config is:', configSummary);
            response.status(200).send(configSummary);
        })
        .catch(function(err) {
            throw err;
        });
});

```

## Atom and merging

Atom makes merging easier:

![Atom makes merging easy][am]

[am]: https://s3.amazonaws.com/bucket01.elvenware.com/images/up-to-date-merge-atom.png
[csf]:https://gist.github.com/CristinaSolana/1885435
[gmh]: https://help.github.com/articles/merging-an-upstream-repository-into-your-fork/
