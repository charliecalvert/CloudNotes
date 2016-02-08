## Overview

In Elven Site Options we will:

- Skip Syntax Highlighting
- Make Webserver Dir Configurable and name to destination dir

## Step One:

Create a branch called ElvenSiteOptions. Check it out:

```
git branch ElvenSiteOptions
git checkout ElvenSiteOptions
```

Now copy Site Config to SiteOptions:

```
cp -r Week05-ElvenSiteConfig Week06-ElvenSiteOptions
```

Open in WebStorm and change name (refactor) to **Week06-ElvenSiteOptions**.

In **routes/index.js**:

```javascript
res.render('index', { title: 'Elven Site Options' etc... })
```

## Step Two:

Track Destination Dirs:

```
{
  "calvert": {
    "base-dir": "/home/charlie/",
    "site-dirs": [
      "Documents/AllTest",
      "Documents/AllSite"
    ],
    "destination-dirs": [
		  "/var/www/html/",
		  "/home/charlie/temp/test-site/"
    ]
  }
}
```

Now get the code in **routes/index.js**:

```
router.get('/config', function(request, response) {
  var baseDir = config.get('base-dir');
  var siteDirs = config.get('site-dirs');
  var destinationDirs = config.get('destination-dirs');
  var configSummary = { "baseDir": baseDir, 'siteDirs': siteDirs, "destinationDirs": destinationDirs };
  console.log("Config summary:", configSummary);
  response.send(configSummary);
});
```

## Step Three

Do what needs to be done to show the destinations-dirs in a select on the client side.

Send the users destinationDir selection back to the server when the user choses walk. In doing so, on the client side, create a variable called **requestQuery** that equals a JavaScript object literal with two properties:

- directoryToWalk
- destinationDir

Pass **requestQuery** to your **getJSON** (or equivalent) call.

On the server side, capture both properties sent from the client. Send them on to our updated **elven-site-tools**, which is now at 1.0.2. This contains a breaking change. In **routes/index.js**, update the **/walk** route to look like this:

```javascript
router.get('/walk', function(request, response) {
  console.log('In walk', request.query);
  var directoryToWalk = request.query.directoryToWalk;
  var destinationDir = request.query.destinationDir;

  fs.access(directoryToWalk, fs.F_OK | fs.R_OK, function(err) {
    if (err) {
      console.log('Could not find', directoryToWalk);
      response.sendStatus(401);
    } else {
      console.log('start', request.query, directoryToWalk);
      walker.buildFileReport(directoryToWalk, '.md', function(report) {
        console.log('build');
        var directories = walker.getDirectories(report);
        walker.makePage(directoryToWalk, destinationDir, directories, report, function(masterListOfNames, htmlFilesWritten) {
          response.send( { result: 'success',
            destinationDir: destinationDir,
            directories: directories,
            masterListOfNames: masterListOfNames,
            htmlFilesWritten: htmlFilesWritten
          });
        });
      });
    }
  });
```

**NOTE**: *Something will have to be done about about the breaking change in **elven-site-tools**. The call that changed is to **makePage**, as shown immediately above. The function now takes **destinationDir**. The main reason for **NpmAllInclusive** was to save time during class. Saving disk space is also important, but not crucial. I think for now, we have no choice but to use local **node_modules** directories for older versions of our program, and save the *all-inclusive ~/tmp/node_modules* directory for the one we need in class. It actually would not be hard to switch back and forth, since we are only, at this point, changing one package. To get a specific version of a package do something like this: **npm install elven-site-tools@1.0.2** where **@1.0.2** is the version you want. So remove the old version with **rm -r node_modules/elven-site-tools**, and then install the one needed for your current project. You probably either want 0.1.0 or the latest, which right now is 1.0.2. Discussion area or in class for questions...*

## Turn it in

Push your repository, submit your the assignment.
