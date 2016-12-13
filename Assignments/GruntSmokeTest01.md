## Overview

See if you are ready to push your code for me to review. In particular:

- Make sure you have created and properly name a folder for each of our major projects
- Make sure each project passes **grunt check**

"Where there's smoke there's fire." A smoke test is designed to check not that a program runs perfectly, but that it at least meets a set of minimum requirements. For instance, in our case, our smoke test ensures that each project has a valid directory name and passes **grunt check**. Just because it passes these minimal tests does not mean the program works correctly. But it shows that our projects are at least worthy of being looked at.

## Grunt Clean Script {#grunt-clean}

Here is a bash script that will check for the existence of folders that I expect to find. If they do exist, then **grunt check** is run inside it:

```bash
#! /bin/bash

RED='\033[0;31m'
LIGHT_RED='\033[1;31m'
LIGHT_GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;36m'
NC='\033[0m' # No Color

# Use set -e to exit on error
set -e

function check() {
  if [ -d $1 ]; then
    cd $1
  else
    echo "Directory $1 does not exist."
    echo "Please fix the problem and try again."
    exit
  fi

  pwd

  if [ ! -d node_modules ]; then
     # npm install
     ln -s ~/tmp/node_modules node_modules
  fi   

  grunt check

  cd ..
}

A1=Week02-BasicTypes
A2=Week02-BasicTypesExpress
BASIC_TYPES="$A1 $A2"
A_OK=false

function basicTypes() {
    for i in $BASIC_TYPES
    do
         if [ -d $i ]; then
            echo -e $LIGHT_GREEN"Directory $BLUE$i$LIGHT_GREEN exists$NC"
            A_OK=true
            check "$i"
         else
            echo -e $LIGHT_RED"Directory $BLUE$i$LIGHT_RED does not exist$NC"
         fi
    done
    if $A_OK ; then
        echo -e $LIGHT_GREEN"BasicTypes has at least one good directory.$NC"
    else
        echo -e $LIGHT_RED"Basic Types is not good$NC"
        exit 1
    fi
}

check Week01-ExpressBasics/  
basicTypes
check Week02-GetNumbers/
check Week02-JavaScriptObjects/
check Week02-ObjectBasicsJasmine/
check Week03-CouchDbDemo/
check Week03-CouchDbViews/
check Week03-ExpressJQuery/
check Week03-ExpressRoutes/
check Week04-PointerLock/
check Week04-ThreeFloor/
check Week04-ThreeJsBasics/
```

Save this file as **SmokeTest** in the root of your repository. Make sure it has executable permissions:

<pre>
chmod +x SmokeTest
</pre>

You only have set the permissions one time.

Run the script:

<pre>
./SmokeTest
</pre>

The first few lines of output should look something like this:

```bash
$ ./SmokeTest
/home/charlie/Git/isit320-calvert-2016/Week01-ExpressBasics
Running "jsbeautifier:files" (jsbeautifier) task
Beautified 6 files, changed 0 files...OK

Running "jscs:src" (jscs) task
>> 6 files without code style errors.

Running "jshint:files" (jshint) task

✔ No problems


Done.
/home/charlie/Git/isit320-calvert-2016/Week02-BasicTypes
Running "jsbeautifier:files" (jsbeautifier) task
Beautified 5 files, changed 0 files...OK

Running "jscs:src" (jscs) task
>> 5 files without code style errors.

Running "jshint:files" (jshint) task

✔ No problems


Done.
/home/charlie/Git/isit320-calvert-2016/Week02-BasicTypesExpress
Running "jsbeautifier:files" (jsbeautifier) task
Beautified 7 files, changed 0 files...OK

Running "jscs:src" (jscs) task
>> 7 files without code style errors.

Running "jshint:files" (jshint) task

✔ No problems


Done.
/home/charlie/Git/isit320-calvert-2016/Week02-GetNumbers
Running "jsbeautifier:files" (jsbeautifier) task
Beautified 4 files, changed 0 files...OK

Running "jscs:src" (jscs) task
>> 4 files without code style errors.

Running "jshint:files" (jshint) task
>> Report "result.xml" created.

Done.
/home/charlie/Git/isit320-calvert-2016/Week02-JavaScriptObjects
Running "jsbeautifier:files" (jsbeautifier) task
Beautified 5 files, changed 0 files...OK

AND SO ON
```

## Turn it in

When you are done, simply submit your assignment and leave a brief message reporting on your status. For instance: "All done. Everything passes."

After I pull your latest code, I'll run the script in your repository to check that all is good.

**NOTE**: _The script uses the bash command **set -e** to ensure that the script exits if an error occurs. If you turn this assignment in on time and the script runs all the way through to the end without error the first time I run it, then you get a 100, else you get a 5 and have to fix the error and resubmit the assignment._

This assignment is really easy to complete if you have been doing your work correctly all along. As a result, you should make sure it passes even if you have not yet completed a particular assignment. This means at minimum you need properly named project directory that contains a valid **package.json**, **Gruntfile.js** and anything else necessary to get the smoke test to pass. If the project itself does not work correctly, or does not even exist in any more than nascent form, then you can still get a 100 on this assignment. The key is to be sure all the folders exist and **grunt check** passes in each one.

## Rename a folder {#rename}

If a folder is named incorrectly, you can change the name with the **git mv** command:

<pre>
git mv check Week01-BasicTypeExpress/ Week02-BasicTypesExpress
</pre>

Then push your work and I will be able to see the new name for your folder.

**NOTE**: _I care that your folders are named correctly because I use scripts to help me grade your homework. These scripts won't work correctly if your folders are not named correctly._

## Exclude Files {#exclude}

If there are files you don't want to check, such as **three.js**, then exclude it in **.jscsrc**

```javascript
"excludeFiles": ["**/node_modules/**", "**/components/**", "**/bower_components/**", "**/three.js", "**/pointer-lock-controls.js"],
```

Also, exclude files from JsHint by editing **Gruntfile.js**:

```javascript
ignores: [
  '**/node_modules/**', '**/components/**', '**/three.js', '**/pointer-lock-controls.js'
],
```

## How I Grade

I do this:

```bash
git log --pretty=format:"%H %ad"
```

I look for the commit you did on the data you turned this in and create a branch on it:

```bash
git branch charliesmoke 94c2f4b68888
```

I check it out:

```bash
git checkout charliesmoke
```

Then I run SmokeTest
