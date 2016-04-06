# Cloud 9 Intro

Cloud 9 is a cloud based IDE. It has based on ubuntu server, and has a built in editor and web server.

Sign into Cloud 9 using [this link](https://c9.io/c/U6vccXg2cba). This link gives me certain benefits whenever someone uses it. If you prefer, you can sign up a different way, or make a deal with a fellow student so they get the benefits instead of me.

When working on this assignment, you can use this deck as a reference, but I have changed my thinking a bit since this was created:

* [Cloud 9 Slides](http://bit.ly/elf-cloud9)

## Step Zero

You can begin by either:

- Cloning an existing repository
- Creating an empty workspace and setting up a repository inside it.

In this document, we should choose the latter option, and select **Create a new workspace.**

Name your workspace **prog219-lastname-2016**. Make it **private** and set its template to nodejs.

For more details, see the documentation:

- [C9 Dashboard](https://docs.c9.io/docs/dashboard)

You can also create a Cloud9 workspace based on an existing repository. Sign in via either GitHub or BitBucket, and select your repository. Typically, your repository will have a name like this:

- **prog219-lastname-2016**
- **prog272-lastname-2016**
- **isit320-lastname-2016**
- etc...

## Step One

Move immediately into the bash shell to do your work. You can usually toggle back and forth between the Ace text editor and the bash shell with **Alt-S** or by choosing **Window | Navigator | Switch** from the menu. If you accidentally close the shell, or need a second one, select **Alt-T** or **Window | New Terminal**.

The structure for your home directory on Cloud 9 looks a bit like this:

```
~/home/ubuntu/etc
~/home/ubuntu/lib
~/home/ubuntu/workspace
```

Start by creating two new directories:

```
~/home/ubuntu/bin
~/home/ubuntu/Git
```

Like this:

```
mkdir ~/bin
mkdir ~/Git
```

In Cloud 9, click the vertical **Workspace** tab on the far left to toggle the **Favorites**.

Notice that there is a settings gear in the Favorites window. Select **Show Home in Favorites** so you can see your **Home**, **bin** and **Git** directories.


## Step Two

Using the bash shell, switch to your **Git** folder:

```
cd ~/Git
```

Clone my [JsObjects][jsobjects] repository:

```
git clone http://github.com/charliecalvert/JsObjects.git
```

## Step Three {#bash}

Rename the .bash_aliases file that comes with Cloud9:

```
mv ~/.bash_aliases ~/.bash_aliases.old
```

Create a symbolic link to our ~/.bash_aliases file:

```
ln -s ~/Git/JsObjects/Utilities/SetupLinuxBox/.bash_aliases ~/.bash_aliases
source ~/.bash_aliases
```

The first line creates a symbolic link from the home directory to the **.bash_aliases** file in **JsObjects**. The second line processes the file so that the code in it becomes active. We only need to do this once.

Our bash aliases file contains lots of shortcuts or aliases that can help us navigate the system. For instance, try typing any of the following to see how we can quickly move to various parts of JsObjects:

```
jo
joj
jou
slb
```

## Step Four

Locate the **SystemCheck** utility and run it:

```bash
cd ~Git/JsObjects/Utilities/SetupLinuxBox/
./SystemCheck
```

**NOTE**: _Using our aliases, we can navigate to the **SetupLinuxBox** directory by typing slb and pressing return._

On Cloud 9, not all the **SystemCheck** options have to work. But be sure that the following return **OK** for all options:

- Basic
- Node
- Lamp

If NODE_PATH does not exist, add this to the end of your .bashrc:

```
export NODE_PATH=:$HOME/npm/lib/node_modules
export PATH="$PATH:$HOME/npm/bin"
```

You might also check your bash prompt (PS1), which looks a bit like this on my system:

```
PS1='\[\033[01;32m\]${C9_USER}@${C9_PROJECT}\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]$(__git_ps1 " (%s)")\n$ '
```

Note the **\n** right before the final $.

Don't forget to source your **.bashrc** file: **source ~/.bashrc**

Type **SystemCheck** or **syscheck** and check you system:

```
=======================
Menu
=======================

b) Basic System Check
n) Node
c) Common
l) Lamp
p) PhoneGap
x) Exit

Please make a selection: b
```

Make sure b, l and n are good. Take a screen shot of the output from b and n. Call them

* Cloud9IntroOptionB.png
* Cloud9IntroOptionN.png

**syscheck** is an **alias** pointing at the copy of SystemCheck in your JsObjects directory. So it may be easier to use, but it is harder to remember to use it since there are many aliases in **.bash_aliases**. Having the script in your **~/bin** directory is probably simplest for most people. The point being that we might want to run **SystemCheck** from time to time to be sure everything is still set up right.*

## Step Five

When working with Git on Cloud 9, you can see your SSH key by going to **Dashboard | SSH Keys**. Also, go to **Dashboard | Connected Services**, and make sure you are connected to either GitHub or BitBucket.

In your **workspace** directory, type **git init**.

## Step Six

Take a screen shot displaying the following:

* The root file system from the Project page on left
* **Control.js** from the JasmineExpress project open in the editor.
* Your JasmineExpress project running in a terminal
* The intereface of your project in a preview window

**Note**: *It really doesn't matter much to me which project you show in Cloud9. If for some reason you don't have JasmineExpress up and running, just choose a different a project.*

The screenshot you want to create will be similar to, but not identical too, the image shown below:

[![Cloud9Small][cloud9Small]][Cloud9]

**Image01**: *The Cloud 9 IDE. Click the image above to expand it.*

## Turn it in

Submit your work and attach the screenshots.

[cloud9]: https://s3.amazonaws.com/bucket01.elvenware.com/images/Cloud9Intro01.png
[cloud9Small]: https://s3.amazonaws.com/bucket01.elvenware.com/images/Cloud9IntroSmall01.png
[jsobjects]: https://github.com/charliecalvert/JsObjects/blob/master/README.md
