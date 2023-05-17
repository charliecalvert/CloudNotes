---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Aws/MoreOnCloudNine.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/Aws
fileName: MoreOnCloudNine.md
relativePath: /Aws/MoreOnCloudNine.md
title: MoreOnCloudNine
directoryName: Aws
category : aws-guide
---

## Overview

This is not an assignment. It simply contains some tips on setting up a development environment on a site like Cloud9, AWS or any Ubuntu Server.

## Configure .bashrc

There are a few commands you should run to set up node to work the way we prefer. Begin by running the following in the bash shell:

```
npm config set prefix ~/npm
```

This command tells **npm** to place your globally installed packages in your home directory, in a folder called **npm**. This is useful for two reasons:

- If you install an NPM library into the default space, then it is owned by root. This means you need to type sudo in order to work with that library. Sometimes that doesn't matter, but sometimes it means that you end up needing to type sudo in order to work with your application. Soon, you end up in a mess, where you can't run your own program without first giving it root permissions. This won't happen all the time, but it is simpler to avoid the whole issue by installing your npm libraries someplace where you have permissions to use them.
- This second point can be argued either way. If you install your NPM global libraries in a place where only you can see them, then you will not pollute other user's environment. On the other hand, some libraries will be installed multiple times.

The bottom line is that one does not have to install NPM libraries into your home directory, but it is safer, particularly for beginners, to do so.

Check out this file: ~/Git/JsObjects/Utilities/SetupLinuxBox/BashrcEasyExtras

Put at least portions of it at the end of your **~/.bashrc**. The sinplest way to do this is as follows:

```
slb
cat BashrcEasyExtras >> ~/.bashrc
source ~/.bashrc
```

The first command, **slb**, is from our **~/.bash_aliases** file. It won't work unless you have set up **~/.bash_aliases** as described above. The **slb** alias moves you to this directory:

**~/Git/JsObjects/Utilities/SetupLinuxBox**

The second command appends some text onto the end of your **~/.bashrc** file. The text is found in a file from JsObjects called **BashrcEasyExtras**. We then process the **~/.bashrc**.

Optionally, we can display some of the work we did to confirm that everything is set up as expected:

```
echo $NODE_PATH
echo $PATH
```

If you want, you can edit your ~/.bashrc file manually. For instance, you can append the following to the end of the file:

<pre>
if [ -z "$SSH_AUTH_SOCK" ] ; then
    eval `ssh-agent`
fi

export NODE_PATH=$HOME/npm/lib/node_modules
export PATH="$PATH:$HOME/npm/bin"
</pre>

Then run **source ~/.bashrc**.

## Bash Aliases Details

Many of the shortcut commands that I use all the time are stored in the **.bash_aliases** file stored in my JsObjects repository. Let's back up the default cloud 9 **.bash_aliases** file, copy in my version of the file, and process it so that we can immediately begin using aliases and exports defined in that file:

```
cp ~/.bash_aliases ~/.bash_aliases.c9
cp ~/Git/JsObjects/Utilities/SetupLinuxBox/.bash_aliases ~/.
source ~/.bash_aliases
```

## Install Node Manually

Don't install Node on Cloud 9. When you started your workspace, you had an option to get it set up automatically.

In other words, Node should already be installed in your copy of Cloud9. In fact, **NVM** should also be installed, so you can set the current version of Node with that tool, if you know how to use it.

However, if you want to take over control -- and I can't think of a good reason why you should -- then you can do this:

<pre>
jou
cd NodeInstall
$ ./InstallNodePackages.sh
</pre>

Just to be clear, **InsteallNodePackages.sh** is in this location:

<pre>
~/Git/JsObjects/Utilities/NodeInstall
</pre>

Now you should be okay to get started.

## Minimum Install {#minimum-install}

For the vast majority of students, performing the minimum steps instead of the full environment setup will not save you time. You will indeed get set up faster, but then, throughout the quarter, you will often have to take extra steps that I and the other students in the class don't need to take. In the long run, it will likely take you much longer to do the minimum install than to properly set up your environment. But I want you to have the choice to do things your own way -- even if it costs you egregiously -- if that is what you prefer. Also, in a very few cases, an expert student might have their own system for handling the tasks that I automate. In that case, they need not do the full environment setup that I prefer.

For those who want only the minimum install, start from the bash shell, and run the following:

```
npm config set prefix ~/npm
```

Also, at the bottom of your **~/.bashrc** file, add the following lines:

```
export PATH="$PATH:$HOME/npm/bin:"
export NODE_PATH=:$HOME/npm/lib/node_modules
```

This adds the **~/npm/bin** directory to your path. After adding the line, either restart your shell, or type the following:

```
source ~/.bashrc
```

This processes the changes to your **.bashrc** file.

This is the end of the minimum install.
