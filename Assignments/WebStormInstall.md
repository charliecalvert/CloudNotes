## Overview

The goal of this assignment is to be sure you have a copy of WebStorm installed and that it is properly registered.

## Set up Account {#account}

I'm not sure if you should do step 1 or 2 first:

- Create an account on [JetBrains](https://account.jetbrains.com/login) using your student email.
- Get a student license: [Student](https://www.jetbrains.com/shop/eform/students)
  - A confirmation email from JetBrains is usually sent in a few minutes


## Install WebStorm

Hopefully I have already installed WebStorm on Pristine Lubuntu. To check if this is the case, select **Start | Programming** and/or look on the desktop and see if you can find an entry for WebStorm. If you see it, you can probably skip this step.

**NOTE**: _There have been times when I have needed to update WebStorm and the recommended course of action was to reinstall it per these instructions. In that case, you would need this information even if WebStorm came pre-installed on Pristine Lubuntu. For instance, at some point in the quarter you may be told that WebStorm needs to be updated. Sometimes you can do that by just pressing a button, but on occasion I have had to download and install a new version more or less as described here._

If WebStorm is not on your copy of Pristine Lubuntu, or if you need to reinstall it for some reason, then proceed as follows, using your common sense where necessary.

- [Download WebStorm](https://www.jetbrains.com/webstorm/)

The exact name of the file you downloaded may differ, but in general, to decompress the download, do this:

```bash
cd ~/Downloads
tar xvfz ~/Downloads/WebStorm-2017.1.tar.gz
```

If you have a copy of WebStorm already, that is, if you are updating an on obsolete version of WebStorm, then make sure Webstorm is not running. Now delete the old copy of WebStorm.

```bash
rm -r ~/bin/webstorm/
```

Put your newly downloaded version in place:

```bash
mv ~/Downloads/WebStorm-171.3780.79/ ~/bin/webstorm
```

You will probably need to start WebStorm the first time from the command line. Thereafter you can use the system menu to start it. To start WebStorm from the command line, issue this command:

```bash
~/bin/webstorm/bin/webstorm.sh
```

You may receive some prompts the first time you start WebStorm. Here are some suggestions on how to proceed:

- Do import settings
- To make sure your version of WebStorm is registered, sign in again to your JetBrains Account if prompted to do so. If your copy is not registered, you will probably be prmopted to register when you start WebStorm. Alternatively, choose **Help | Register** from the WebStorm menu.

![WebStormLicense](https://s3.amazonaws.com/bucket01.elvenware.com/images/WebStormLicense.png)

When you are done, choose **Help | About** to confirm that your copy of WebStorm is registered to you.

## Activation Key

Some people have trouble registering their copy of WebStorm. (This has never happened to me, but apparently it can happen.) If all else fails, go the JetBrains website, and sign in. Go to your account, which should take you to the licenses page. At any rate, the licenses page should be available from your Account page:

- <https://account.jetbrains.com/licenses>

You should be able to download an activation key. You can paste that key into the Register dialog in Webstorm. That dialog usually just appears magically when you start the app, but if it doesn't, try **Help | Register** from the menu.

## Turn it in

Run WebStorm. Choose **Help | Register** or **Help | About**. Take a screenshot of the dialog showing that you have registered your version. Submit the screenshot in Canvas.
