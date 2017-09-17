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

## Step Zero

If you have not done so already,

- In Cloud 9 hit the Plus icon and create
  - new nodejs workspace
  - Based on your repository
- Once it opens
  - Clone [JsObjects](jsobjects) into **~/Git**
  - Run this: cp ~/Git/JsObjects/Utilities/SetupLinuxBox/.bash_aliases ~/.
  - Run this: source ~/.bash_aliases

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
