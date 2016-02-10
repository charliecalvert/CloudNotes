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

On the server side, capture both properties sent from the client. Send them on to our updated **elven-site-tools**, which is now at 1.0.4. This contains a breaking change. In **routes/index.js**, update the **/walk** route to look like this:

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
        try {
          walker.makePage(directoryToWalk, destinationDir, directories, report, function (masterListOfNames, htmlFilesWritten) {
            response.send({
              result: 'success',
              destinationDir: destinationDir,
              directories: directories,
              masterListOfNames: masterListOfNames,
              htmlFilesWritten: htmlFilesWritten
            });
          });
        } catch(e) {
          console.log("The error:", e);
          // response.sendStatus(500);
          response.status(500).send(e.toString());
        }
      });
    }
  });
});
```

## Step Four {#elven-site-tools}

Something will have to be done about about the breaking change in **elven-site-tools**. The parameters passed to **makePage** have changed, as shown immediately above. The function now takes **destinationDir**.

The main reason for **NpmAllInclusive** was to save time during class. Saving disk space is also important, but not crucial. We now have two choices:

- Use a local **node_modules** directories for older versions of our program, and save the *all-inclusive ~/tmp/node_modules* directory for the one we need in class.
- Manually switch our version of **elven-site-tools** in the **~/tmp** directory.

It actually would not be hard to switch back and forth, since we are only changing one package. To get a specific version of a package do something like this: **npm install elven-site-tools@1.0.4**. Here **@1.0.4** is the version you want. So remove the old version with **rm -r node_modules/elven-site-tools**, and then install the one needed for your current project. You want 0.1.0 for earlier projects in this series. You want the latest, which right now is 1.0.4, for this project. Discussion area or in class for questions...

Let's talk for a moment about the case where you want a local version of **node_modules** rather than to link to the all-inclusive one **~/tmp**. When we want a local version of **node_modules** we simply specify the version of **elven-site-tools** that we want in **package.json**. For instance, if placed in **package.json**, the first example below will install 0.1.0, while the second installs 1.0.4:

```
"elven-site-tools": "0.1.0",
"elven-site-tools": "1.0.4",
```

Pick one or the other for your package.json depending on your needs.

- ElvenSiteConfig: Use 0.1.0
- ElvenSiteOptions: Use 1.0.4

This would make it fairly easy for us to track the right version of the **elven-site-tools** in our project under normal circumstances. But NpmAllInclusive complicates things a bit. We should still put something like the above in the **package.json** file for our project. But in the **~/tmp** directory, we want to run one of the following commands, depending on our needs:

```
npm install elven-site-tools@0.1.0
npm install elven-site-tools@1.0.4
```

The first is for **ElvenSiteConfig** or earlier, the second for **ElvenSiteOptions** or later. Check your work like this:

```
cat ~/tmp/node_modules/elven-site-tools/package.json
```

If all else fails, delete the package manually, then reinstall it:

```
rm -r ~/tmp/node_modules/elven-site-tools
cd ~/tmp
npm install elven-site-tools@1.0.4
cd -
```

The last command switches you back to the directory you were in before you navigated to the **~/tmp** directory.

## Step Five

Create a checkbox:

```
div.checkbox
    label
        input#highlight(type='checkbox', name="option1" value='option1' checked='')
        |  Highlighting
```

Retrieve it's value:

```javascript
var highlight = $('#highlight').prop('checked');
showDebug("Highlight: " + highlight);
```

Send this value to the server.

Do the same thing with forms:

And here is the JADE:

```
form#elfform(role="form")

    div
        select#dirsToWalk(name='dirsToWalk')

    div
        select#destinationDirs(name='destinationDirs')

    div.checkbox
        label
            input#highlight(type='checkbox', name="option1" value='option1' checked='')
            |  Highlighting

    div
        button#walk(type="submit") Walk

```

The code:

```javascript
$( "#elfform" ).submit(function( event ) {
    var userFormData = $(this).serialize();
    showDebug("Handler for .submit() called." + userFormData);
    event.preventDefault();
});
```

## Turn it in

Push your repository, submit your the assignment.
