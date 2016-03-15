## Overview

Elven Images

## Step One

Pull JsObjects

Copy the ElvenImage Program

```bash
cp -r ~/Git/JsObjects/JavaScript/NodeCode/ElvenImages/ ~/Source/.
```

Navigate to the ElvenImage folder and run **npm install**.

```bash
cd ~/Source/ElvenImages
npm install
```

## Step Two

Get the canada images zip file from my Google Drive:

- [http://bit.ly/canada-images](http://bit.ly/canada-images)

Unzip into /var/www/html/images/canada:

```bash
cp canada.zip /var/www/html/images/.
cd /var/www/html/images
unzip canada.zip
```

When you are done, the images should be in **/var/www/html/images/canada/**

## Step Three

Run the ElvenImages program to create **~/Source/ElvenImages/images.md**

```
cd ~/Source/ElvenImages
npm start
```

Copy **images.md** to **~/Documents/AllTest/canada.md** and open **canada.md** in Remarkable. Edit as necessary. In particular, after you have picked the images you want to keep:

- Remove all the HTML and text from **canada.html** that do not refer to your chosen images.
- Delete all but the five to ten files you want to keep from **/var/www/html/images/canada**. (There is now a tool for doing this, explained elsewhere.)

```
cp ~/Source/ElvenImages/images.md ~/Documents/AllTest/canada.md
```

Run the **MakeHtml** program. Open **localhost/canada.html** in the browser. If you are satisfied, take a screenshot.

Repeat this step or some variation of this step as often as necessary until you have deleted all unwanted images. Add captions and explanations to the remaining images.

Your goal is to create a **canada.html** file that focuses on 5 to 10 images.

**NOTE**: *Fortunately, you no longer need to do a search an replace to remove all references to **/var/www/html** from your markdown. You can now run **node image-not-used.js** instead. Then run the **moveNotUsed.sh** file created by the previous command. The completed links should look like this:*

- /images/canada/2016-02-27_11.41.35-small.jpg

## Step Four

Copy your completed html and images to your repository.

Push. Pull on EC2. Copy files as necessary and then run **MakeHtml**. Take a screenshot of your finished **canada.html** file running in your browser on your elastic ip.

## Turn it in

Turn in the three screen shots:

- canada.html on local host
- canada.html on elastic ip
- A screen capture showing you running MakeHtml on ubuntu and showing that you processed a file called **canada.html**

## Hint

On EC2, after you have done your pull, this is the command to copy AllTest to ~/Documents'. Issue the command from the root of your repository:

```
cp -r AllTest ~/Documents/.
```

This will copy your new images to the images directory:

```
cp -r ApacheHelpers/images/canada/ /var/www/html/images/.
```

You already have this script, which copies files from Prisitine Lubuntu file system into the directory that holds your repository:

```
#! /bin/bash

# Declare destination dir for AllTest in
# one place so it is easy to modify
REPO=$GIT_HOME/prog270-calvert-2016

# Declare destination for CSS, JavaScript and Images
CSS_JS_IMAGE=$REPO/ApacheHelpers

# Copy AllTest
cp -ruvp ~/Documents/AllTest $REPO/

# Ensure destination dir exists for CSS, JS and Images
if [ ! -d "$CSS_JS_IMAGE" ]; then
	mkdir -p $CSS_JS_IMAGE
fi

# Copy CSS, JavaScript and Images
cp -ruvp /var/www/html/css $CSS_JS_IMAGE/.
cp -ruvp /var/www/html/images $CSS_JS_IMAGE/.
cp -ruvp /var/www/html/js $CSS_JS_IMAGE/.
cp -uvp /var/www/html/clean $CSS_JS_IMAGE/.
```

And this for copying them back out, where you must issue the command from the root of your repository:

```
$ cat CopyRepoToDocumentsAllTest
#! /bin/bash

cp -ruvp AllTest/ ~/Documents/.
cp -ruvp ApacheHelpers/images /var/www/html/.
cp -ruvp ApacheHelpers/css /var/www/html/.
cp -ruvp ApacheHelpers/js /var/www/html/.
```
