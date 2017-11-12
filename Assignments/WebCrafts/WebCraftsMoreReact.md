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

## Bug: The Case of the Missing Highlight

Please read the section called [Bugs](#bugs) before reading more. In short, this is done automaticlly, just read it.

This was the big change that has been holding me up from using this version of the app.

We have better support now for highlighting and perhaps for bootswatch. The changes are to two methods to a file called **create-markdown** in **markdown-to-html/private**:

```javascript
function createDetails(report, directoryToWalk, destinationDir, highlight, bootswatch) {
    return {
        report: report,
        bootswatch: bootswatch,     <=== HERE
        directoryToWalk: directoryToWalk,
        destinationDir: destinationDir,
        directories: walkCore.getDirectories(report),
        highlight: highlight,       <=== HERE
        testRun: true
    };
}
```

The changes are in the header for the method, and in the two places called out in the code.

Also this method was changed:

```javascript
module.exports = function (configSummary, directoryIndex) {
'use strict';
  return new Promise(function(resolve, reject) {
      elfLog.setLevel(elfLog.logLevelNano);
      const directoryToWalk = configSummary['base-dir'] + configSummary['site-dirs'][directoryIndex];
      const destinationDir = configSummary['destination-dirs'][directoryIndex];
      const mostRecentDate = configSummary['most-recent-date'];
      const bootswatch = configSummary.bootswatch;  <=== HERE
      const highlight = configSummary['highlight']; <=== HERE
      fs.access(directoryToWalk, fs.F_OK | fs.R_OK, function(err) {
          if (err) {
              reject(err);
          } else {
              elfLog.details('Folder to Walk: ' + directoryToWalk);

              walkCore.buildFileReport(directoryToWalk, '.md', mostRecentDate, function(report) {
                  elfLog.nano('In buildFileReport callback');
                  const details = createDetails(report, directoryToWalk,
                       destinationDir, highlight, bootswatch); <=== HERE
                  pageMaker(details, configSummary, destinationDir)
                      .then(resolve)
                      .catch(reject)
              });
          }
      });
  });
};
```

## The React MakeHtml files

There are three:

- MakeHtml.js
- MakeHtmlDropDowns
- MakeHtmlHomeButton

## Two DropDowns

Right now we are just trying to create a relatively simple effect. We want:

- Two DropDowns
  - The first has the **siteDirs** from the **ElvenConfig.json** file.
  - The second has the **destinationDirs** from the config file.
- If you select the one or the other, the matching item appears automatically.
- If you click a **RaisedButton** labeled **Generate HTML** then the markdown files in the **siteDirs** directory should be converted into HTML found in the **destinationDirs** directory.
- Only the files updated after the **mostRecentDate** from the config file will be processed. If there are no such files in the chosen directory, then the program returns an empty array.

Watch this video for details:

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/aHJ0GzrfnRI?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

I'll leave it up to you to create the **DropDowns** and the **Button**. For now, we can put this all in **MakeHtmlDropDowns**, but later we may refactor.

## Details

Here is the state for the **MakeHtmlDropDowns.js** file:

```javascript
this.state = {
    walk: 'Generate HTML',
    siteDir: 'unknown',
    destDir: 'unknown',
    configSummary: [],
    value: 1
};
```

In module global scope just below the import statements, declare two arrays:

```javascript
const siteDirs = [];
const destDirs = [];
```

There was a method in this file called something like **handleChange**. It should become **handleSiteDir**. A second method should be called **handleDestinationDir**. These methods are referenced in our JSX:

```xml
<DropDownMenu
    value={this.state.value}
    onChange={this.handleSiteDir}
    autoWidth={true}
>
    {siteDirs}
</DropDownMenu>
```

Here was **handleChange**:

```javascript
handleChange(event, index, value) {
    this.setState({value});
}
```

This is using ES6, but it might be clearer like this:

```javascript
handleChange(event, index, value) {
    this.setState({value: value});
}
```

Change its name to **handleSiteDir** and in the **setState** method also set **state.siteDir** to:

    event.target.innerHTML,

And set **destDir** to:

    destDirs[value].props.primaryText

Right similar code to for **handleDestinationDir**.

**NOTE**: _We don't actually do anything with state.siteDir and state.destDir. But we may display them later, or use them for debugging or delete them. At any rate, get them to work so you are sure you see what is going on here._

## Generate HTML

When the button is clicked it should generate call **makers/walk** route in **routes/makers**:

```javascript
generateHtml() {
    console.log(this.state.value);
    console.log(siteDirs[this.state.value]);
    //walking.runWalkReact('qSingle', this.state.siteDir, this.state.destDir);
    const query = '/makers/walk?siteDirsIndex=' + this.state.value;
    var that = this;
    fetch(query)
        .then(function(response) {
            return response.json();
        })
        .then(function(configSummary) {
            console.log(JSON.stringify(configSummary, null, 4));
            // CALL that.setState to **state.configSummary** to configSummary.htmlFilesWritten
        })
        .catch(function(ex) {
            console.log('parsing failed', ex);
        });
}
```

            //Object.keys(configSummary).map(function (key) { return configSummary[key]; });

You'll need a PRE tag in your JSX to display **state.configSummary**

## Generate Images

Creating web pages from images.

At the end of your **ElvenConfig.json** file there should be a section that looks like this:

```json
"elvenImages": [
    {
        "name": "doc",
        "baseDir": "The base directory where the images to be processed are found",
        "cloudPath": "Base string found in markdown files",
        "createSmallImages": true
    },
    {
        "name": "california",
        "baseDir": "/var/www/html/images",
        "cloudPath": "/images",
        "createSmallImages": true
    },
    {
        "name": "california1",
        "baseDir": "/var/www/html/images",
        "cloudPath": "https://s3.amazonaws.com/s3bucket01.elvenware.com",
        "createSmallImages": true
    },
    {
        "name": "california2",
        "baseDir": "/var/www/html/images",
        "cloudPath": "/images",
        "createSmallImages": true
    }
]
```

We want to concentrate on the last two sections, called **california1** and **california2**. They have a **basedir** set to **/var/www/html/images**. We should combine the **name** and the **baseDir** to point to a specific directory that we will populate with images:

    /var/www/html/images/california1
    /var/www/html/images/california2

Before proceeding further, be sure that:

- Apache is installed
- The **/var/www/html/images/** directory exists.
- **~/ElvenImages** exists.

If necessary, create the directories listed in the latter two bullet points. If **/var/www/html** does not exist, then install **Apache2**:

    sudo apt-get install apache2

I have sample images in a file found here:

- [http://bit.ly/california-pixs][ci].  

Download them and unzip them in **/var/www/html/images/**:

    cd /var/www/html/images/
    unzip ~/Downloads/california.zip

Now run WebCrafts, navigate to the **Make Image** page, and press the **Create Image Page** button. A series of files should be created in **~/ElvenImages**.

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/hJETmBVPwpA?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## Arrow Functions in React

Sometimes we call bind in our constructors:

```javascript
this.foo = this.foo.bind(this);

foo() {}
```

Alternatively we can use Arrow Functions:

```javascript
foo = () => {}
```

The advantage here is that we no longer need to explicitly call **bind** in our constructors. Instead, we use ES6 arrow functions, and **this** is automatically bound to the function.

To enable this syntax, install **babel-preset-stage-0**

    npm install babel-preset-stage-0

Then, in **webpack.config.js** add the **stage-0** preset:

```javascript
module: {
    loaders: [{
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: ['env', 'stage-0', 'react']
        }
    }]
},
```    

## Turn it in

Push and tell me repo and branch. Check for:

- Bug fixes for isit-site-tools
- MakeHtml files works
  - Two dropdowns work in sync
  - It generates HTML from markdown
- Generates HTML based on images


[sync]: https://help.github.com/articles/syncing-a-fork/
[ci]: http://bit.ly/california-pixs
