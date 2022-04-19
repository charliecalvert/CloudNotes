---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/NpmAllInclusive.md
relativePath: Assignments/NpmAllInclusive.md
title: NpmAllInclusive
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: NpmAllInclusive.md
fileNameHTML: NpmAllInclusive.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

I'm removing calls to **npm install** and **bower install** from **CreateExpressProject**, **CreateAllExpress**, **TestReady** and **TestFixture**. Instead, we will keep one canonical version of node_modules and **components** in our **~/tmp** directories. I will publish our *all inclusive* **package.json** file in JsObjects.

## Step One

Before you install our packages, install a library needed by kerberos:

```
sudo apt-get install libkrb5-dev
```

Set up NPM for symbolic links. You probably already have a **~/tmp** folder, and you probably don't have a ~/tmp/package.json, but just in case:

```
jo
git pull
mkdir ~/tmp
rm ~/tmp/package.json
ln -s $ELF_TEMPLATES/package-for-npm-tmp-dir.json ~/tmp/package.json
cd ~/tmp
npm install
```

Make sure it really worked:

```
npm outdated --depth=0
```

It should come back clean, with no output. If you see outdated packages, let me know in class or in the discussion area. If packages are missing, just install them manually, something like this:

```
npm install debug
npm install kerberos
```

From time to time:

```
jo
git pull
cd ~/tmp
npm outdated --depth=0
```

## Step Two

Set up bower:

```
rm ~/tmp/bower.json
ln -s $ELF_TEMPLATES/bower-for-tmp-dir.json ~/tmp/bower.json
ln -s $ELF_TEMPLATES/bowerrc-for-tmp-dir ~/tmp/.bowerrc
bower install
```

## Step Three

To run a new project, use the aliases in the JsObjects ~/.bash_aliases file:

```
cat $ELF_UTILS/SetupLinuxBox/.bash_aliases
```

In particular, these three:

```
alias run="nm && components && npm start"
alias nm="ln -s ~/tmp/node_modules/"
alias components="ln -s ~/tmp/components/ public/components"
```

If you just want to link in **node_modules**, go to the root of your project and:

```
nm
```

Type **components** to link in bower files.

If you have a new project, and have no **node_modules** or **public/components** folder, then type **run** to start create symbolic links to those folders and start the project. I type that command many times on the average day.

## Turn it in

Set up your **~/tmp** dir. In that folder, type **ls -la**. Take a screen shot. Type **ls node_modules**. Take a screen shot.

Go to your **/temp** dir or some other folder and folder and type:

```
CreateAllExpress MyTempProject
cd MyTempProject
```

Type **run** or **nm** or something that else that will create a link to the **~/tmp/node_modules**. Type **ls -la** so I can see the symbolic link. Take a screen shot.

Attach (upload) all three screen shots when you submit the assignment. No word files, not zip files. Just attach the bitmaps directly to the Canvas assignment.

## Summary

The cliff notes version:

```
ln -s $ELF_TEMPLATES/package-for-npm-tmp-dir.json package-csc.json
ln -s $ELF_TEMPLATES/bower-for-tmp-dir.json ~/tmp/bower.json
ln -s $ELF_TEMPLATES/bowerrc-for-tmp-dir ~/tmp/.bowerrc
```
