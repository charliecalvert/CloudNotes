---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/CreateSymbolicLinksToScripts.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: CreateSymbolicLinksToScripts.md
relativePath: /CreateSymbolicLinksToScripts.md
title: CreateSymbolicLinksToScripts
directoryName: Assignments
category : assignments-guide
---

## Overview

There are two parts to this assignment.

- Create symbolic links in the **~/bin** directory to my JsObject scripts
- Create a link to the JsObject's version of **.bash_aliases**

## Create Symbolic Links

Here are some other one's that you might want.

Proceed with caution with this first step. In order to create symbolic links to our files, we need to first remove any files that might exist. If you are sure that you won't lose anything in doing this, then go ahead and delete the copies of this files in your **~/bin/** directory.

```bash
rm ~/bin/CreateExpressProject
rm ~/bin/CreateAllExpress
rm ~/bin/check-karma-grunt-config
rm ~/bin/strip-triple-spaces
rm ~/bin/TestReady
rm ~/bin/FixtureReady
rm ~/bin/InsertJadeExecGrunt.py
```

**NOTE**: *The ELF_UTILS environment variable used in the following script is defined in the most recent copies of my **.bash_aliases** file.*

Now create the symbolic links.

```bash
export ELF_UTILS=$JSOBJECTS/Utilities
ln -s $ELF_UTILS/NodeInstall/CreateExpressProject ~/bin/.
ln -s $ELF_UTILS/NodeInstall/CreateAllExpress ~/bin/.
ln -s $ELF_UTILS/NodeInstall/check-karma-grunt-config ~/bin/.
ln -s $ELF_UTILS/SetupLinuxBox/strip-triple-spaces ~/bin/.
ln -s $ELF_UTILS/NodeInstall/TestReady ~/bin/.
ln -s $ELF_UTILS/GrepScripts/elfgrepcomps ~/bin/.
ln -s $ELF_TEMPLATES/UnitTest/FixtureReady ~/bin/.
ln -s $JSOBJECTS/Python/Utils/InsertJadeExecGrunt.py ~/bin/.
```

The commands above create symbolic links to the scripts in JsObjects. This way, when we update **JsObjects** with **git pull**, the selected "scripts" shown above in the **~/bin/** directory are automatically updated. In short, we just call "git pull" and then all is done.

## bash_aliases

One important file, **.bash_aliases** does not get updated in the process shown above. Most of **~/.bash_aliases** is generic, and words for everyone. There is one alias, however, that I use frequently, that we need to customize:

```bash
alias sshadd="ssh-add ~/.ssh/main-key"
```

Your main private key probably has another name such as **id_rsa** or **isit320_fall_2015**. If so, you can create a symbolic link to your key like this:

```bash
ln -s ~/.ssh/id_rsa ~/.ssh/main-key
```

If you do that, then at least in principle, you could entirely replace your existing ~/.bash_aliases with the one in JsObjects. Given that you would have to edit the first line, that process might look like this:

```bash
ln -s ~/.ssh/[YOUR PRIVATE KEY] ~/.ssh/main-key
rm ~/.bash_aliases
ln -s $ELF_UTILS/SetupLinuxBox/.bash_aliases ~/.bash_aliases
source ~/.bash_aliases
```

If you have some aliases of your own that you use regularly, you can put them in a file called **~/.my_bash_aliaes**. Here is enough to get you started:

```bash
#! /bin/bash

alias githome="cd $GIT_HOME"
```

## Turn it in

Issue this command:

```bash
ls -l ~/bin
```

Take a screen shot of the result. It should show the symbolic links. Attach the graphic to the assignment when you turn it in.