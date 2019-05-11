## Overview

Make sure you have included key elements in the .gitignore file for your repository and that you have not checked in any files that should not be included.

## Check .gitignore

First, make sure that JsObjects is up to date:

    jo
    git pull

If you get errors when pulling from JsObjects often the best strategy is to delete JsObjects and [clone it again][cia]

Now go to the root of your repository and run the following command: **GitIgnoreTest**. If all goes well, the script returns immediately without any output:

    $ GitIgnoreTest

If, however, there is something missing from your .gitignore file, then you might see something like this:

```nohighlighting
$ GitIgnoreTest
^bundle.js
^*.js.map
^.vscode
^.c9
```

In this latter case, open up GitIgnore and add the referenced items to your file, but without the initial hat(^) character. The most important thing is simply to include the items in the file. However, if you want to organize them a bit, you might add some comments (#) and break the rules into categories, perhaps a bit like this:

```nohighlighting
# IDE
.idea
.vscode
.c9

# CodeDetails
bundle.js
*.js.map
```

Now run GitIgnoreTest again. It should come back clean this time. This would be a good time to push your work.

## Check for Files

The next step is to make sure you have not already checked in anything that should not have been checked in. The purpose of a **.gitignore** file is to list the things you should not check into your repository. However, if you did not have something listed in your **.gitignore** file, and you pushed your work, you might have checked in something that should not be checked in. This could have happened even if **GitIgnoreTest** came back clean the first time you ran it. You might have, for instance, committed work in weeks one or two, then updated your .gitignore file. In that case, your repository might still have unwanted files or directories, even though you cleaned up **.gitignore** fairly early in the course.

**NOTE**: _In most cases, checking in unwanted files does not cause errors, nor is it, in the ultimate scheme of things a particularly serious mistake. Furthermore, it is a common mistake. I, for instance, have frequently checked in things I did not mean to check in. Having said this, many of these unwanted files cause me extra work on my end, and might well be causing you confusion or extra work on your end. So it is best to get them out the most recent commits for our repository._

## Fresh Version of Repository

It should be clear to you that we commonly create files or directories such as **node_modules** or **bundle.js** that we don't want to check in. In other words, the existence of these files in our view of our repository is not a mistake. The mistake is to check them in. In other words, if we see them on our hard drive, that is normal, but if we see them in our repository on GitHub, that is a problem.

What we need, therefore, is a clean view of our repository. We need a copy of our repository other than the one we work in. Let's create one in a **temp** directory.

If you have not done so already, create a directory called **temp** in your home directory:

    mkdir ~/temp

Now navigate to that directory and clone your repository with command similar to this:

    cd ~/temp
    git clone git@github.com:your-github-user-name/prog272-lastname-2019.git

You can find the exact URL on GitHub.

Now navigate into your repository and see if you can find any files that should not have been checked in. If you find them, remove them the **git rm [FILE NAME]** or **git rm -r [DIRECTORY NAME]** command. The first removes an individual file, the second a directory.

## Finding Files

In Linux, we can use the **find** command to look for files or directories. For instance, here is how to look for a file called **bundle.js** across all projects in your directory. Run the command from the root of your repository:

    find . -iname bundle.js

For instance, if I run the command in my **_working_** copy of my repository, I get this:

```nohighlighting
$ find . -iname bundle.js
./week05-node-test/public/bundle.js
./week05-address-simple/node_modules/terser/dist/bundle.js
./week05-address-simple/node_modules/crypto-browserify/example/bundle.js
./week05-address-simple/node_modules/vm-browserify/example/run/bundle.js
./week05-address-simple/node_modules/ajv/scripts/bundle.js
./week05-address-simple/public/bower_components/bootstrap/js/tests/integration/bundle.js
etc. MORE AND MORE INSTANCES
```

In short, it shows up all over the place. Now I run the same command in my _clean_ version of my repository that I created in my **temp** directory

```nohighlighting
$ find . -iname bundle.js
./week05-node-test/public/bundle.js
```

[cia]: https://github.com/charliecalvert/JsObjects/blob/master/README.md
