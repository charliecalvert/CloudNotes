---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/CloudNine/CloudNineAuto.md
relativePath: Assignments/CloudNine/CloudNineAuto.md
title: CloudNineAuto
queryPath: Assignments/CloudNine/
subject: CloudNine
fileNameMarkdown: CloudNineAuto.md
fileNameHTML: CloudNineAuto.html
---


<!-- toc -->
<!-- tocstop -->

## Auto Setup

We have some setup to do to create a nice environment in which to work. This will also give you some links to some of my tools. We will use at least some of these tools in this class.

After the workspace opens go to the terminal in Cloud 9. One should be open on the bottom of your screen. It might have a label with the word bash in it.

**NOTE**: _If you can't find a terminal open, then **Window | Terminal (Alt T)** from the menu._

<pre>
mkdir ~/bin
cd ~/bin
wget https://raw.githubusercontent.com/charliecalvert/JsObjects/master/Utilities/SetupLinuxBox/CloudNineSetup
chmod +x CloudNineSetup
./CloudNineSetup
</pre>

A script will run. Choose **Install All**.

Alternatively, you can do the same thing with the Cloud 9 tools:

- Choose Gear on left and **Show Favorites**
- Right click the root of the Favorites and choose **New Folder**. Name it **bin**
- Right click bin and choose **New File**. Call it **CloudNineSetup**. Press enter to open the file.
- Go to [this URL][c9-setup], select **Raw**, block copy the content, and paste it into the **CloudNineSetup** file. Save your work.
- Now run the last two commands from the series shown above. The ones that begin **chmod** and **./CloudNineSetup**

The script will take several minutes. When it is done, type the following:

<pre>
source ~/.bashrc
nvm use system
</pre>


## Step One

**NOTE**: _If you are using Pristine Lubuntu, then your NODE_PATH is probably already set up. That means you can skip this section and go on to the next Nevertheless, it is often helpful to run SystemCheck._

If you have not done so already run **git pull** on JsObjects. Copy **SystemCheck** into your bin directory:

```bash
cp $JSOBJECTS/Utilities/SetupLinuxBox/SystemCheck ~/bin/.
```

If NODE_PATH does not exist, add this to the end of your .bashrc:

```
export NODE_PATH=$NODE_PATH:$HOME/npm/lib/node_modules
```

Don't forget to source your .bashrc file: **source ~/.bashrc
**

Type **SystemCheck** or **syscheck** and check you system:

```
=======================
Menu
=======================

b) Basic System Check
n) Node
c) Common
p) PhoneGap
x) Exit

Please make a selection: b
```

Make sure b and n are good. Take a screen shot of the output from b and n. Call them

* Cloud9IntroOptionB.png
* Cloud9IntroOptionN.png

**syscheck** is an **alias** pointing at the copy of SystemCheck in your JsObjects directory. So it may be easier to use, but it is harder to remember to use it since there are many aliases in **.bash_aliases**. Having the script in your **~/bin** directory is probably simplest for most people. The point being that we might want to run **SystemCheck** from time to time to be sure everything is still set up right.*
