# Cloud 9 Intro

Sign into Cloud 9 and set up a workspace based on your repository. Typically, your repository will have a name like this:

- **prog219-lastname-2016**
- **prog272-lastname-2016**
- **isit320-lastname-2016**
- etc...

Use this as a guide:

* [Cloud 9 Slides](http://bit.ly/elf-cloud9)

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

## Step Two


## Turn it in

Submit your work and attach the screenshots.

[cloud9]: https://s3.amazonaws.com/bucket01.elvenware.com/images/Cloud9Intro01.png
[cloud9Small]: https://s3.amazonaws.com/bucket01.elvenware.com/images/Cloud9IntroSmall01.png
