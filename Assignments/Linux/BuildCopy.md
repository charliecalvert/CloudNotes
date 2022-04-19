---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Linux/BuildCopy.md
relativePath: Assignments/Linux/BuildCopy.md
title: BuildCopy
queryPath: Assignments/Linux/
subject: Linux
fileNameMarkdown: BuildCopy.md
fileNameHTML: BuildCopy.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

Let's formalize the **build-copy** script we worked on in class.

I'm going to start with two clarifications on the issues that causes us to lose time on minor issues for far too long in class on Monday. The issues are:

- Quotes in strings
- Curly braces

## Single vs Double Quotes

The general wisdom on the web is that we should quote the strings and variables we use in bash scripts. However, there is a difference between single quotes and double quotes. Single quotes cause the string to be interpreted literally, as we were finding in class. Double quotes allow interpolation to occur. [Interpolation][ip] is when variables in a string are expanded.

 Consider this code:

    echo '${SERVER_DIR}/precache-manifest*.js'

It produces this output:

    ${SERVER_DIR}/precache-manifest*.js

Now look at this example:

    echo "${SERVER_DIR}/precache-manifest*.js"

It does what we expect, and produces this output:

    ../server/public/precache-manifest*.js    

Thus, this code does what we expect:

    ls "${SERVER_DIR}/precache-manifest."\*".js"

It produces this output:

    ../server/public/precache-manifest.2efd1de520c30948b299e17d59c75fef.js    

It's all about single vs double quotes. In JavaScript they do the same thing and the difference is simply a matter of style. But in bash they produce different results.

## When do you Need Curly Braces?

I mentioned that it is a good idea to use Curly Braces in variable expansion. Both [This Stack Overflow answer][so1] and [this Unix and Linux Stack Overflow discussion][ul1] helped me understand the subject perhaps a bit better. Consider this example where we want to concatenate the word **Foo** on the value held in the variable **BAR**:

    BAR='bar'
    FOO=$BARFoo
    echo $FOO

It outputs an empty string because bash looks for a variable **BARFoo** rather than **$BAR+Foo**. But if we write this, we get the expected output of **barFoo**:

    BAR='bar'
    FOO=${BAR}Foo
    echo $FOO

There are other things you can do with curly braces. However, in our case, we want to use them in places like this where they can help to clarify our intention to either bash itself, or to readers of the code.

In the code shown below lines two and three produce the same output. However, I think it is arguable that the second line is easier to read:


    SERVER_DIR='../server/public'
    echo ${SERVER_DIR}/precache-manifest*.js
    echo $SERVER_DIR/precache-manifest*.js

In short, I want to go with curly braces as the default, just as a matter of habit, even if they are not strictly needed.

    echo ${SERVER_DIR}/precache-manifest*.js

It seems to me that making a practice of including curly braces would be a good best practice as it could ensure that ambiguous code is never written. I'm not sure I'm ready to make it a rule that we must follow.

## Setup SERVERDIR

At the top of the file put the following:

```
#! /usr/bin/env bash

RED='\033[0;31m'
LIGHT_RED='\033[1;31m'
LIGHT_GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;36m'
NC='\033[0m' # No Color

SERVER_DIR="${PWD}/../server/public"
```

Notice that **SERVER_DIR** now contains **${PWD}** which gets us the current working directory. This will help us when we move the script to the bin directory.

## Delete Files

Create a function in your script called deleteOld:

```bash
function deleteOld() {
	rm -v ${SERVER_DIR}/precache-manifest*.js
	rm -v -r ${SERVER_DIR}'/static'
}
```

You will want to update the function to ensure that it deletes all the files listed below:

- asset-manifest.json
- favicon.ico
- index.html
- manifest.json
- precache-manifest.2efd1de520c30948b299e17d59c75fef.js
- service-worker.js
- static

## Create and Copy

Create a second function that runs the build and copies over the contents of the build to the server:

```bash
function copyNew() {
	npm run build
	cp -r build/* ${SERVER_DIR}/.
}
```

## Create runAll

Create a function called **runAll** that calls both **copyNew** and **deleteOld**. To call a function, just write its name. Don't put in a call operator.

- WRONG: foo()
- RIGHT: foo
- If foo took a parameter: foo parameter

So even if we pass a parameter to a bash function we still don't use the call operator.

## Set up a Menu

I'll just give it to you since this is the first time:

```bash
function message {
    echo
    echo =============================
    echo "$1"
    echo =============================
    echo
}

while true; do
    message "Menu"    
    echo -e "$LIGHT_GREEN  a) Delete Old Files and Run Build"
    echo -e "$LIGHT_GREEN  b) Only Build"
    echo -e "$LIGHT_GREEN  c) Only Delete"
    echo -e "$LIGHT_RED  x) Exit (You should source .bashrc when done)"
    echo -e "\n$NC"
    read -p "Please make a selection: " userInput
    case $userInput in
        [Aa]* ) runAll false; continue;;
        [Bb]* ) copyNew; continue;;
        [Cc]* ) deleteOld; continue;;
        [XxQq]* ) break;;
        *) echo -e "\n$NC" + "Please answer with a, b, c or x (or q).";;
    esac
done
```

Notice how were use the colors like **$LIGHT_GREEN** to give the menu some life. The menu belongs at the bottom of the file, while **message** might be up near the top.

We use [read][rd] to get the input from the user. The **-p** option says that we want to provide a prompt. In our case the prompt is "Please make a selection." The **userInput** is a variable that holds the input we get from the user. It could be **foo** or **qux**. If the user enters invalid input, we echo out an explanation of the valid choices. An explanation of all this, such as it is, can be found on [Stack Overflow][so-menu].

## Put in bin

By this time everything should be working. Ask git to move the file to your **script** directory in the root of your repository. Create a symbolic link to **script/build-copy** from the **~/bin** directory. Navigate back to the **client** directory where you developed the script and test it to make sure it works. At this point we should have a script that will work for us in any project of this client/server type that we create.

## Turn it in

elf-tagger "Created script to build client and copy to server." "build-copy"

<!---------------------------->
<!-- Links in this document -->
<!---------------------------->

[so1]: https://stackoverflow.com/a/8748880/253576
[ul1]: https://unix.stackexchange.com/questions/4899/var-vs-var-and-to-quote-or-not-to-quote
[so-menu]: [so-menu]
[ip]: https://en.wikipedia.org/wiki/String_interpolation
[rd]: http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_08_02.html
