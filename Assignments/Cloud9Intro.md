# Cloud 9 Intro

Cloud 9 is free if you get an invitation from me. I pay $1 a month to run an education account, which means that I can let as many students in as I wish.

When you get the invitation, click on the link provided.

Sign into Cloud 9 and set up a workspace based on your repository. Typically, your repository will have a name like this:

- **prog219-lastname-2016**
- **prog272-lastname-2016**
- **isit320-lastname-2016**
- etc...

Use this as a guide:

* [Cloud 9 Slides](http://bit.ly/elf-cloud9)

Our primary goal in this exercise is to create a Cloud Nine environment in which:

- **JsObjects** has been cloned and is available to us
- We have set up customized **.bashrc** and **.bash_aliases** files.
  - This includes setting up our path and other environment variables
- We have a pre-configured **bin** directory with useful scripts in it.
- Have certain Npm global packages installed.

Near the bottom of this file I include a [minimum install][#minimum-install] that you can perform if you don't want to set up your environment as outlined in the body of this document. For most students, it is much better to do a regular setup than to use the minimum install.

## Create Workspace


If you have not done so already,

- In Cloud 9 hit the Plus icon and create
  - new nodejs workspace
  - Based on your repository

## Install JsObjects

JsObjects is the ancient, messy repository where I keep example code and many utilities that I use all the time. These utilities automate many tasks, and simplify navigation at the command prompt. You don't have to install JsObjects to code on Cloud9, however, I prefer to have it installed as it helps me simplify many tasks. Since I will have it installed, you should also consider installing it or you may find that it is difficult to follow the steps I take in class.

In your Cloud 9 workspace, navigate to your home directory. Create a folder called **~/Git** and navigate into it::

```
cd
mkdir ~/Git
cd ~/Git
```

**NOTE**: _In Cloud 9, just type CTRL-V to paste your code into the bash shell._

The code shown above is a bit redundant in that I have already asked you to navigate to your home directory. Hence, the following code would work if you are carefully following my directions:

```
cd         // Don't use this example. Instead, play
mkdir Git  // it safe with the example above:
cd Git     // "mkdir ~/Git && cd ~/Git"
```

Notice that in this second set of commands I am not including the code that points at our home directory: **~/.**. Nevertheless, in the first example, I do include it, just to be safe. Thus, if a student forgets to first navigate to the home directory, then the commands will still work. Of course, some students will no doubt cut and paste the last two lines of the second example and use it in the wrong place. One can't win. But I can try to point you in the right direction.

## Clone JsObjects

Clone [JsObjects](jsobjects) into **~/Git**

```
cd ~/Git
git clone https://github.com/charliecalvert/JsObjects.git
```

Again, the code above is a bit redundant, as I have already asked you to navigate into the **~/Git** directory. However, one cannot be too careful.

Many of the shortcut commands that I use all the time are stored in the **.bash_aliases** file stored in my JsObjects repository. Let's back up the default cloud 9 **.bash_aliases** file, copy in my version of the file, and process it so that we can immediately begin using aliases and exports defined in that file:

```
cp ~/.bash_aliases ~/.bash_aliases.c9
cp ~/Git/JsObjects/Utilities/SetupLinuxBox/.bash_aliases ~/.
source ~/.bash_aliases
```

Check out this file: ~/Git/JsObjects/Utilities/SetupLinuxBox/BashrcExtras

Put at least portions of it at the end of your **~/.bashrc**. For instance, get at least these these parts:

<pre>
if [ -z "$SSH_AUTH_SOCK" ] ; then
    eval `ssh-agent`
fi

export NODE_PATH=:$HOME/npm/lib/node_modules
export PATH="$PATH:$HOME/npm/bin"
</pre>

Then run **source ~/.bashrc**.

Run these commands:

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

## Step

Take a screen shot displaying the following:

* The root file system from the Project page on left
* **Control.js** from the JasmineExpress project open in the editor.
* Your JasmineExpress project running in a terminal
* The intereface of your project in a preview window

**Note**: *It really doesn't matter much to me which project you show in Cloud9. If for some reason you don't have JasmineExpress up and running, just choose a different a project.*

The screenshot you want to create will be similar to, but not identical too, the image shown below:

[![Cloud9Small][cloud9Small]][Cloud9]

**Image01**: *The Cloud 9 IDE. Click the image above to expand it.*

## Webpack on Cloud 9

Place the properties called **build**, **c9** and **c9a** in the **scripts** object of your **package.json** file.

```
"scripts": {
   "start": "node_modules/.bin/webpack-dev-server",
   "build": "node_modules/.bin/webpack",
   "c9": "node_modules/.bin/webpack-dev-server --host $IP --port $PORT",
   "c9a": "node_modules/.bin/webpack-dev-server --host $IP --port $PORT --hot --inline"
 },
 ```

[Webpack on Cloud 9][webpack-c9]

## Turn it in

Submit your work and attach the screenshots.

[cloud9]: https://s3.amazonaws.com/bucket01.elvenware.com/images/Cloud9Intro01.png
[cloud9Small]: https://s3.amazonaws.com/bucket01.elvenware.com/images/Cloud9IntroSmall01.png
[jsobjects]: https://github.com/charliecalvert/JsObjects/blob/master/README.md

[webpack-c9]: https://github.com/webpack/webpack-dev-server/issues/230


## Minimum Install {#minimum-install}

I don't suggest performing only these minimum steps. Instead, go back to the beginning of this document and follow the steps for properly setting up your environment. However, if all you want is the very minimum steps to get you up and running, then follow the simple code in this example.

**NOTE**: _For the vast majority of students, performing the minimum steps instead of the full environment setup will not save you time. You will indeed get set up faster, but then, throughout the quarter, you will often have to take extra steps that I and the other students in the class don't need to take. In the long run, it will likely take you much longer to do the minimum install than to properly set up your environment. But I want you to have the choice to do things your own way -- even if it costs you egregiously -- if that is what you prefer. Also, in a very few cases, an expert student might have their own system for handling the tasks that I automate. In that case, they need not do the full environment setup that I prefer._

For those who want only the minimum install, start from the bash shell, and run the following:

```
npm config set prefix ~/npm
```

This command tells npm to place your globally installed packages in your home directory, in a folder called **npm**. This is useful for two reasons:

- If you install an NPM library into the default space, then it is owned by root. This means you need to type sudo in order to work with that library. Sometimes that doesn't matter, but sometimes it means that you end up needing to type sudo in order to work with your application. Soon, you end up in a mess, where you can't run your own program without first giving it root permissions. This won't happen all the time, but it is simpler to avoid the whole issue by installing your npm libraries someplace where you have permissions to use them.
- This second point can be argued either way. If you install your NPM global libraries in a place where only you can see them, then you will not pollute other user's environment. On the other hand, some libraries will be installed multiple times.

The bottom line is that one does not have to install NPM libraries into your home directory, but it is safer, particularly for beginners, to do so.

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
