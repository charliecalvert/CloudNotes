## Overview

The goal of this assignment is to make sure you have included key elements in the **.gitignore** file for your repository and that you have not checked in any files that should not be included in your repository.

## Check .gitignore

Though not strictly necessary, we should first, make sure that **JsObjects** is up to date:

    slb
    git pull
    ./CreateSymbolicLinks

Or perhaps only this:

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

Now run **GitIgnoreTest** again. It should come back clean this time. This would be a good time to push your work.

## Check for Files

The next step is to make sure you have not already checked in anything that should not have been checked in. The purpose of a **.gitignore** file is to list the things you should not check into your repository. However, if you did not have something listed in your **.gitignore** file, and you pushed your work, you might have checked in something that should not be checked in. This could have happened even if **GitIgnoreTest** came back clean the first time you ran it. You might have, for instance, committed work in weeks one or two, then updated your **.gitignore** file. In that case, your repository might still have unwanted files or directories, even though you cleaned up **.gitignore** fairly early in the course.

**NOTE**: _In most cases, checking in unwanted files does not cause errors, nor is it, in the ultimate scheme of things, a particularly serious mistake. Furthermore, it is a common mistake. I, for instance, have frequently checked in things I did not mean to check in. Having said this, many of these unwanted files cause me extra work on my end, and might well be causing you confusion or extra work on your end. So it is best to get them out the most recent commits for our repository._

## Fresh Version of Repository

Bofore you do anything else, push the work in the working version of your repository. That would normally be the version in your **~/Git** directory.

It should be clear to you that we commonly create files or directories such as **node_modules** or **bundle.js** that we don't want to check in. In other words, the existence of these files in our view of our repository is not a mistake. The mistake is to check them in. In other words, if we see them on the working version of our repository on our hard drive, that is normal, but if we see them in our view of our repository on GitHub, that is a problem.

What we need, therefore, is a clean view of our repository. We need a copy of our repository other than the one we work in. Let's create one in a **temp** directory.

If you have not done so already, create a directory called **temp** in your home directory:

    mkdir ~/temp

Now navigate to that directory and clone your repository with a command similar to this:

    cd ~/temp
    git clone git@github.com:your-github-user-name/prog272-lastname-2019.git

You can find the exact URL for your repository on GitHub, or find it by issuing this command in the working version of your repostory: **git remote -v**.

## Finding Files

Navigate into your temp version of your repository and see if you can find any files that should not have been checked in. If you find them, remove them the **git rm [FILE NAME]** or **git rm -r [DIRECTORY NAME]** command. The first removes an individual file, the second a directory.

In Linux, we can use the **find** command to look for files or directories. For instance, here is how to look for a file called **bundle.js** across all projects in your directory. Run the command from the root of your repository:

    find . -iname bundle.js

For instance, if I run the command in the root of my **_working_** copy of my repository, I get this:

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

In short, it shows up all over the place. Now I run the same command in the root of my _clean_ version of my repository that I created in my **temp** directory

```nohighlighting
$ find . -iname bundle.js
./week05-node-test/public/bundle.js
```

Here you can see that I have accidentally checked in **bundle.js** in my **week05-node-test** directory. (It is not necessarily an error that you do no have that directory. My repository may be different than yours.) I should add that this was not an error I set up for the purposes of this assignment. Somehow, probably while working in a branch that was not set up with a good **.gitignore** file, I ended up checking in the file by mistake.

I fix the problem like this:

    git rm ./week05-node-test/public/bundle.js

Then I push my changes:

    $ git add .
    charlie@elf-path:~/temp/prog272-calvert-2019$ (master)
    $ git commit -m "Deleting bundle.js that was checked in by mistake."
    [master 02b6ae2] Deleting bundle.js that was checked in by mistake.
     1 file changed, 137 deletions(-)
     delete mode 100644 week05-node-test/public/bundle.js

Here are the find commands that you should run:

```nohighlighting
find . -iname bundle.js
find . -iname "*.js.map"
find . -iname node_modules
find . -iname .vscode
find . -iname ".idea"
find . -iname bower_components
```

You should be able to block copy the above commands and paste them into your bash shell prompt.

If you have problem files, you might see output like this:

```nohighlighting
charlie@elf-path:~/temp/prog272-calvert-2019$ (master)
$ find . -iname bundle.js
charlie@elf-path:~/temp/prog272-calvert-2019$ (master)
$ find . -iname "*.js.map"
./week05-node-test/public/bundle.js.map
charlie@elf-path:~/temp/prog272-calvert-2019$ (master)
$ find . -iname node_modules
charlie@elf-path:~/temp/prog272-calvert-2019$ (master)
$ find . -iname .vscode
charlie@elf-path:~/temp/prog272-calvert-2019$ (master)
$ find . -iname ".idea"
charlie@elf-path:~/temp/prog272-calvert-2019$ (master)
$ find . -iname bower_components
```

Above you can see that I also checked in a problematic file called **bundle.js.map**. I deleted it and pushed my work, as described earlier.

I then checked again for errors. Since all was now well, the above commands did not find any problem files:

```nohighlighting
charlie@elf-path:~/temp/prog272-calvert-2019$ (master)
$ find . -iname bundle.js
charlie@elf-path:~/temp/prog272-calvert-2019$ (master)
$ find . -iname "*.js.map"
charlie@elf-path:~/temp/prog272-calvert-2019$ (master)
$ find . -iname node_modules
charlie@elf-path:~/temp/prog272-calvert-2019$ (master)
$ find . -iname .vscode
charlie@elf-path:~/temp/prog272-calvert-2019$ (master)
$ find . -iname ".idea"
charlie@elf-path:~/temp/prog272-calvert-2019$ (master)
$ find . -iname bower_components
charlie@elf-path:~/temp/prog272-calvert-2019$ (master)
```

## Update Working Repo

After you have cleaned up the temp version of your repository and pushed your work, then go to the working version of your repository and pull your changes. In my case, that looked like this:

```nohighlighting
git pull
Updating 17794ca..4ddfc86
Fast-forward
 week05-node-test/public/bundle.js     | 137 -----------------------------------------------------------------
 week05-node-test/public/bundle.js.map |   1 -
 2 files changed, 138 deletions(-)
 delete mode 100644 week05-node-test/public/bundle.js
 delete mode 100644 week05-node-test/public/bundle.js.map
```

As you can see, my update reported that two files had been deleted from the current view of my repository. Because of the way Git works, those files are still in my repository, but they are not shown in the current commit. If you looked back in time with Git, I could still find the files. But my current view does not show them. If you preformed a similar set of steps in your repository, then neither you nor I will see them when we pull the latest version of your repository. That is our ultimate goal.

**NOTE**: _If I did more work in my **week05-node-test** directory, the files would be recreated. But this time, when I pushed my work, they would not get checked in because the are listed in .gitignore file._

## Turn it in

If you completed the above steps, there is nothing else for you to do. Just submit the assignment and I will take a look at your repository. I will check that:

- your **.gitignore** with **GitIgnoreTest**
- no unwanted files can still be found in your repository.

[cia]: https://github.com/charliecalvert/JsObjects/blob/master/README.md
