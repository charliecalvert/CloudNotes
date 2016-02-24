## Overview

In Elven Site Options we will:

- Create an option allowing the user to skip Syntax Highlighting
- Make the Webserver Directory Configurable and name the destination dir

The following diagram is for use with the command line version of our program, which is called **MakeHtml**. However, the **MakeHtml** program does the same thing as **ElvenSite**. Just substitute the word **ElvenSite** (your midterm) every place you see **MakeHtml**

![MakeHtmlWorkFlow](https://s3.amazonaws.com/bucket01.elvenware.com/images/make-html-work-flow.png)

## Step One:

Create a branch called **ElvenSiteOptions**. Check it out:

```
git branch ElvenSiteOptions
git checkout ElvenSiteOptions
```

Now copy the **ElvenSiteConfig** project to **ElvenSiteOptions**:

```
cp -r Week05-ElvenSiteConfig Week06-ElvenSiteOptions
```

Open in WebStorm and change name (refactor) to **Week06-ElvenSiteOptions**.

In **routes/index.js**:

```javascript
res.render('index', { title: 'Elven Site Options' etc... })
```

## Step Two

Note that our config file now tracks an array called **destination-dirs**:

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

Write a route in **routes/index.js** that will retrieve all the sections from our configuration file:

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

Destination may not always be in our apache folder. By the *apache folder* I mean this one:

```
/var/www/
```

For instance, the second path shown above in **desitination-dirs** points to a location in my home directory. This kind of path might be useful when we want the created HTML files to be placed in a Git repository, or when want them to be part of a node program that does not serve files from the apache directory.

There is, however, a problem with this system. Our program creates an interface that allows us to click on links to the files we created in order to view them. The point is to test if they were created correctly. Of course, these links assume that we are serving files out of the Apache directory, and we are now copying files to our home directory.

In order to make the links to files in our home directory work when we are serving web pages out of the apache directory, I created a symbolic link to the destination dir from **/var/www/httml**:

test-site -> /home/charlie/temp/test-site/

This link is not needed to run the program, but only to make it possible to click on the links we create in our output near the top of our GUI, near the top of our web page. We create the link with a command like this:

```
ln -s /home/charlie/temp/test-site/ /var/www/html/test-site
```

Now a directory in our home folder is "part of" our apache directory. As a result, the links we created in our program can still work. For instance, the following would be a valid link:

```
http://localhost/test-site/goo/Summary.html
```

**NOTE**: *I'm actually struggling here to make our current program fit this use case. I really want -- no, I need -- to have our program have the ability to  put files somewhere besides the apache directory. I want that more than I want us to be able to test the files we create in that scenario. It might make more sense to give the program a flag (checkbox) that allows us to turn off making links in some cases. The we could test the files once in the apache directory. Once we feel confident that they work, then we could turn off links and write the files to our home directory or some other location. This is perhaps an issue we can wrestle with in the next version. I will grade gently any solutions that folks come up with for this part of the program, since it is, I now realize, still very much an open issue.*

## Step Three

Do what needs to be done to show the **destinations-dirs** in a select on the client side.

Send the users **destinationDir** selection back to the server when the user choses walk. In doing so, on the client side, create a variable called **requestQuery** that equals a JavaScript object literal with two properties:

- directoryToWalk
- destinationDir

Pass **requestQuery** to your **getJSON** (or equivalent) call.

On the server side, capture both properties sent from the client. Send them on to our updated **elven-site-tools**, which is now at 2.0.0. This contains a breaking change. In **routes/index.js**, update the **/walk** route to look like this:

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
        var settings = {
          report: report,
          directoryToWalk: directoryToWalk,
          destinationDir: destinationDir,
          directories: directories,
          highlight: true,
          testRun: false
        };
        try {
          walker.makePage(settings, function (masterListOfNames, htmlFilesWritten) {
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

It actually would not be hard to switch back and forth, since we are only changing one package. To get a specific version of a package do something like this: **npm install elven-site-tools@2.0.0**. Here **@2.0.0** is the version you want. So remove the old version with **rm -r node_modules/elven-site-tools**, and then install the one needed for your current project. You want 0.1.0 for earlier projects in this series. You want the latest, which right now is 2.0.0, for this project. Discussion area or in class for questions...

Let's talk for a moment about the case where you want a local version of **node_modules** rather than to link to the all-inclusive one **~/tmp**. When we want a local version of **node_modules** we simply specify the version of **elven-site-tools** that we want in **package.json**. For instance, if placed in **package.json**, the first example below will install 0.1.0, while the second installs 2.0.0:

```
"elven-site-tools": "0.1.0",
"elven-site-tools": "2.0.0",
```

Pick one or the other for your package.json depending on your needs.

- ElvenSiteConfig: Use 0.1.0
- ElvenSiteOptions: Use 2.0.0

This would make it fairly easy for us to track the right version of the **elven-site-tools** in our project under normal circumstances. But NpmAllInclusive complicates things a bit. We should still put something like the above in the **package.json** file for our project. But in the **~/tmp** directory, we want to run one of the following commands, depending on our needs:

```
npm install elven-site-tools@0.1.0
npm install elven-site-tools@2.0.0
```

The first is for **ElvenSiteConfig** or earlier, the second for **ElvenSiteOptions** or later. Check your work like this:

```
cat ~/tmp/node_modules/elven-site-tools/package.json
```

If all else fails, delete the package manually, then reinstall it:

```
rm -r ~/tmp/node_modules/elven-site-tools
cd ~/tmp
npm install elven-site-tools@2.0.0
cd -
```

The last command switches you back to the directory you were in before you navigated to the **~/tmp** directory.

When working with packages, don't forget either of these commands:

```
npm outdated --depth=0
npm shown elven-site-tools
```

See Point 1 in this blog post:

- [10-cool-things-you-probably-didnt-realize-npm](http://blog.izs.me/post/1675072029/10-cool-things-you-probably-didnt-realize-npm)

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

Checklist:

- Create **ElvenSiteOptions** branch
- Copied **ElvenSiteConfig** to **ElvenSiteOptions**
- Retrieve from server and display **destination-dirs** config file data.
- Use new version of server side **router.get('\walk'...** route.
- Create check box for **highlight** option.

**NOTE**: *I'm also going to need your most recent config file. Make sure that your
**config/ElvenConfig.json** file contains your most recent configuration data.*

## Hints

When dealing with packages, here is a nice script written by Lisa Evans, a student in **isit322** during the winter of 2016.

```bash
#!/bin/bash
# Usage Version <package-name>

# This script looks at the package.json file for the requested package in the current project
# and displays the id. Or specify no package, and it looks at all packages' package.json file.

package=$1
if [[ "$package" == '' ]] ; then
 package='*'
fi
grep -h _id node_modules/$package/package.json
```
