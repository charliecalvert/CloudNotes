## Overview

The **ApacheHtml** assignment provides more information on setting up the Apache Server and the **MakeHtml** program. In particular, it helps you put the right files in these directories:

- /var/www/html/css
- /var/www/html/js
- /var/www/html/images

The **MakeHtml** program assumes that certain files are already in place in your Apache **DocumentRoot** directory. By **DocumentRoot** I mean the **/var/www/html** directory.

The main goal is to ensure that you have the necessary CSS, images and JavaScript in your **/var/www/html** folders. This assignments talks you through the process of creating the files and placing them correctly. Without these files, the pages you produce might have missing links, or fail to render your HTML properly. This will effect various parts of your pages, including images and their size, code blocks, and tables.

![MakeHtmlWorkFlow](https://s3.amazonaws.com/bucket01.elvenware.com/images/make-html-work-flow.png)

## CSS

There are two files to put in **/var/www/html**:

- first-style.css // CAN BE EMPTY
- style.css

I suggest that you put the following code in **style.css**:

```css
body {
    padding-top: 70px;
    padding-bottom: 30px;
}

img.twenty-five-percent {
   width: 25%;
}
```

In practice, you can create any CSS you want, but think carefully about how it fits in with our primary HTML/CSS framework, which is called [bootstrap](http://getbootstrap.com/). For the most part, your CSS is defined by **bootstrap**. Your goal is mostly to add minor tweaks, rather than trying to take over altogether. We can, perhaps, look at some other options after the midterm.

## JS

Our javascript file is kept here: **/var/www/html/js/elven-help.js**:

```javascript
$(document).ready(function() {
	$('table').addClass('table table-striped table-hover');
});
```

## GoogleCode

The file called **googlecode.css** provides syntax highlight for code that appears in our HTML. We place this file here:

```
/var/www/html/css/highlight
```

Like this:

```
/var/www/html/css/highlight/googlecode.css
```

If you are interested in getting the latest version of this code, I believe it is maintained here:

- <https://github.com/isagalaev/highlight.js/blob/master/src/styles/googlecode.css>

See also:

- <https://github.com/isagalaev/highlight.js/tree/master/src/styles>

Here is the source I'm currently using:

```css
/*

Google Code style (c) Aahan Krish <geekpanth3r@gmail.com>

*/

.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: white;
  color: black;
}

.hljs-comment,
.hljs-quote {
  color: #800;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-section,
.hljs-title,
.hljs-name {
  color: #008;
}

.hljs-variable,
.hljs-template-variable {
  color: #660;
}

.hljs-string,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-regexp {
  color: #080;
}

.hljs-literal,
.hljs-symbol,
.hljs-bullet,
.hljs-meta,
.hljs-number,
.hljs-link {
  color: #066;
}

.hljs-title,
.hljs-doctag,
.hljs-type,
.hljs-attr,
.hljs-built_in,
.hljs-builtin-name,
.hljs-params {
  color: #606;
}

.hljs-attribute,
.hljs-subst {
  color: #000;
}

.hljs-formula {
  background-color: #eee;
  font-style: italic;
}

.hljs-selector-id,
.hljs-selector-class {
  color: #9B703F
}

.hljs-addition {
  background-color: #baeeba;
}

.hljs-deletion {
  background-color: #ffc8bd;
}

.hljs-doctag,
.hljs-strong {
  font-weight: bold;
}

.hljs-emphasis {
  font-style: italic;
}
```

## Images

At minimum, you need the **elvenwarelogo.png** in this directory:

```nohighlighting
/var/www/html/images
```

Like this:

```nohighlighting
/var/www/html/images/elvenwarelogo.png
```

You can just right click and download the logo from the Elvenware site, or else you can create your own version of this file. It must, however, have the correct name: **elvenwarelogo.png**

## Save CSS, JS and Images in Repo {#apache-helpers}

I want you save your /var/www/html/css, /var/www/html/js/ and var/www/html/images folders to your repository.

Put this script in the root folder of your repository. Run it to back up your **css**, **js**, and **image** files to a folder in your repository called **ApacheHelpers**. You will need to make a few changes for instance, your lastname, not mine, and possibly the name of the class: prog270 or isit322.

Call it something like: **CopyToRepository**. And then **chmod +x CopyToRepository**. Be sure to change **prog270-calvert-2016** to use your last name!

```
#! /bin/bash

# Declare destination dir for AllTest in
# one place so it is easy to modify
REPO=$GIT_HOME/prog270-calvert-2017

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

And here is a script that will copy files from your repository to **~/Documents/AllTest** and **/var/www/html**. Call it **CopyFromRepo**:

```
#! /bin/bash

cp -ruvp AllTest/ ~/Documents/.
cp -ruvp ApacheHelpers/images /var/www/html/.
cp -ruvp ApacheHelpers/css /var/www/html/.
cp -ruvp ApacheHelpers/js /var/www/html/.
```

Here is a fancier version of **CopyFromRepo**

```
#! /bin/bash

RED='\033[0;31m'
LIGHT_RED='\033[1;31m'
LIGHT_GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;36m'
NC='\033[0m' # No Color

DEST01=/var/www/html/.
DEST02=$HOME/Source/firebase/public

function message {
    echo
    echo =======================
    echo -e $LIGHT_RED$1"$NC"    
    echo =======================
    echo
}

function error {
	echo
    echo -e $LIGHT_RED=!!!!=
    echo -e $1
    echo -e $LIGHT_RED=!!!!="$NC"    
    echo
}

function copyFiles() {
	cp -ruvp AllTest/ ~/Documents/.
	if [ -d $1 ]; then
		cp -ruvp ApacheHelpers/images $1
		cp -ruvp ApacheHelpers/css $1
		cp -ruvp ApacheHelpers/js $1
	else
		error $BLUE$1$LIGHT_RED' does not exist.'
	fi

}

while true; do
    message "Menu"
    echo -e $LIGHT_GREEN"Ubuntu"
    echo -e $LIGHT_GREEN"  a) Copy to $DEST01"
    echo -e $LIGHT_GREEN"  b) Copy to $DEST02"
    echo -e $LIGHT_RED"  x) Exit"
    echo -e "\n$NC"
    read -p "Please make a selection: " eotuyx
    case $eotuyx in
        [Aa]* ) copyFiles $DEST01; continue;;
        [Bb]* ) copyFiles $DEST02; continue;;
        [XxQq]* ) break;;
        * )  -e "\n$NC" + "Please answer with c, r or x.";;
    esac
done
```

## ApacheHelpers Tree View

![Tree ApacheHelpers](https://s3.amazonaws.com/bucket01.elvenware.com/images/apache-helpers.png)

## Turn it in

Besides putting them in your Apache **DocumentRoot** directory on Pristine Lubuntu and EC2, you should put all your configuration files in a folder of your repository called **ApacheHelpers**. It should have the structure shown below. When you are done, push your repository and take the screenshot described below.

Checklist:

- css
  - first-style.css
  - style.css
  - highlight/googlecode.css
  - images/???
- images
  - elvenwarelogo.png (This can be your own logo)
- js
  - elven-help.js
- CopyFromRepo
- CopyToRepo

Here is an image showing the Apache **DocumentRoot** directory:

![Dirs](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog270-midterm-2016-03.png)

Your pages just won't look right unless you have the right images, CSS and JavaScript in place. This assignment is an attempt to help you get those files in place. This would be a way to prove to me that you have done it correctly. take a screen shot of the output from these commands:

-  ls -la /var/www/html/css
-  ls -la /var/www/html/js
-  ls -la /var/www/html/images

If you want, you can save this script as **ShowApache** in the root of your repository. Then run it and take a screenshot. This will satisfy the requirements outlined in the previous few lines of text.

```nohighlighting
#! /bin/bash

ls -la /var/www/html/css
ls -la /var/www/html/js
ls -la /var/www/html/images
```

## Network Page

You should turn frequently to the the network pages in the Chrome and Firefox developer tools. Access them with F12 or Ctrl-Shift-I. Press F5 if necessary to refresh the display.

The images below show that **first-style.css**, **style.css**, **googlecode.css**, **elven-help.js** and the elvenware logo have all been loaded.

### Network Page Chrome

![Developer Tools Network Page Chrome][network-chrome]

### Network Page Firefox

![Developer Tools Network Page Firefox][network-firefox]

[network-chrome]: https://s3.amazonaws.com/bucket01.elvenware.com/images/network-chrome.png
[network-firefox]: https://s3.amazonaws.com/bucket01.elvenware.com/images/network-firefox.png


## Clean

When testing your code, you want to make sure you are not relying on any files already sitting in **/var/www/html**. This script deletes all the HTML files and folders from **/var/www/html**. It also creates a zip folder containing the most recent contents of your **js**, **css** and **images** folders. Save the code as **/var/www/html/clean**. Make it executable with **chmod +x clean**, then run the script as needed.

**NOTE**: *Where I write &lt;LIST ANY OTHER FILES/FOLDERS&gt; you should do exactly that, and of course you have to then remove the text in angle brackets.*

```bash
#! /bin/bash

rm *.html <LIST ANY OTHER FILES>
rm -r MoreFiles Assignments <LIST ANY OTHER FOLDERS>
rm apache-helpers.zip
zip -r apache-helpers css/ js/ images/
```
