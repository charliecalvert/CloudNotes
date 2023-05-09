---
layout: post
date: 2023-05-08 03:38:38 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud/DropBox.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud
fileName: DropBox.md
relativePath: /cloud/DropBox.md
title: DropBox
directoryName: cloud
category : cloud-guide
---

## Overview

DropBox is a file sharing utility. It is used primarily to help you keep files in sync between multiple machines, and a place in the cloud. You can also share read-only or read-write copies of your folders with one or more people. DropBox is especially well suited for sharing files between desktop machines and your tablet or phone.

If you don't have one already, create a [DropBox account](https://db.tt/6ZfOwOQg). (Using this link helps me earn free server space on DropBox.)

## Caveats

Though you can [retrieve deleted files for 30 days](https://www.dropbox.com/help/11/en), and even see multiple versions of your files, still, DropBox is not designed to be a source control tool. If you want to track source code, you should use Git or Mercurial. With a version control system, you can easily retrieve a deleted file, or revert to a previous version of a file. As a result, Dropbox is not a good way to work with detailed changes such as occur in source code. It is a good way to share files between machines.

## Install

If you don't have one already, create a [DropBox account](https://db.tt/6ZfOwOQg).

On Windows, Linux and the Mac, there are relatively painless automated
installs of DropBox:

[https://www.dropbox.com/install](https://www.dropbox.com/install)

Here is a script you can run to install DropBox on a headless server such as Ubuntu Server and/or an EC2 instance of a Linux Server. I keep the most recent version of this script on [JsObjects][jsdrop]:

[jsdrop]: https://github.com/charliecalvert/JsObjects/tree/master/Utilities/DropBox

    # Script for downloading and installing DropBox on Linux server
    # and on other headless Linux boxes that have no GUI frontend.
    # You can use dropbox.py to help you manage dropbox.
    # I recommend running this script from $HOME/bin

    dropBoxName=dropbox.tar.gz
    wget -O dropbox.py "https://www.dropbox.com/download?dl=packages/dropbox.py"
    wget -O $dropBoxName "https://www.dropbox.com/download?plat=lnx.x86_64"
    tar xzf $dropBoxName
    if [ ! -e ~/.dropbox-dist/dropboxd ]
    then
        mv .dropbox-dist ~/.
    else
        echo "I see that /home/$USER/.dropbox-dist already exists."
        echo "I did not expect that. I am going to exit and let you"
        echo "handle this manually."
        exit
    fi
    ~/.dropbox-dist/dropboxd

If you are using a 32 bit version of Ubuntu, then change the third executable line to read:

    wget -O $dropBoxName "https://www.dropbox.com/download?plat=lnx.x86"

If you are using the 64 bit version, then keep this line:

    wget -O $dropBoxName "https://www.dropbox.com/download?plat=lnx.x86_64"

Save the above file in your \$HOME/bin directory as **DropBoxOnLinuxServer.sh**. (Remeber that $HOME is an environment variable that points at your home directory. For instance, it might point to **/home/ubuntu** or **/home/adminuser** or **/home/charlie**. It all depends on your user name.) Once you have the script in
your \$HOME directory, Run it like this:

    sh DropBoxOnLinuxServer.sh

Don't use sudo, just run it as shown. After the install, you can help maintain your instance by running the *dropbox.py* script:

	python dropbox.py

Remember, you can also find the install script (DropBoxOnLinuxServer.sh) on GitHub:

- [https://github.com/charliecalvert/JsObjects/tree/master/Utilities/DropBox](https://github.com/charliecalvert/JsObjects/tree/master/Utilities/DropBox)

During the install, you will be prompted to copy a URL and paste it into a browser. You will then be prompted to enter your DropBox password. If you get errors during this process about their being an instance of
dropbox already running, use *dropbox.py* to stop your instance:

	sh dropbox.py stop

Now run the DropBox demon again:

	~/.dropbox-dist/dropboxd

This will again present you with the URL. Copy the URL. Don't press Ctrl-C to copy it, as that may stop the demon. Try right clicking instead. Paste the URL into your browser and enter your password again. If all goes well, you should see the following back in your Linux shell:

    Please visit https://www.dropbox.com/cli_link\?host_id=SomeLongValue to link this machine.
    Client successfully linked, Welcome Charlie!

Your prompt will look something like the above, though the first line may be repeated multiple times, and there will be a long hex value where I have written SomeLongNumber. Of course, if all goes well, you will be
greeted by your own name, and not mine. If you see the above success message, press Ctrl-C to end the process.
