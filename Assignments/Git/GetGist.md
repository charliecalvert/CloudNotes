## Overview

I want to try to keep the **.eslintrc.json** and **ElfDebugEnzyme** files found in my Github gists as the primary sources: 

- [http://bit.ly/eslint-elf](http://bit.ly/eslint-elf)
- [http://bit.ly/elf-debug-enzyme](http://bit.ly/elf-debug-enzyme)

To insert either file into your current directory, you should be able to run the following script stored in JsObjects:

    get-gist

A symbolic link in your **~/bin** directory should point to this script. This means you should be able to able get a gist by simply typing **get-gist** from any directory on your system. To get the gist, make a selection from the script's menu.

```
$ get-gist

=======================
Menu
=======================

 Gists
  a) Run All (ESLintRc and ElfDebugEnzyme)
  b) Get ElfDebugEnzyme
  c) Get .eslintrc
  x) Exit
```

You'll need write permissions to write the gist in the current directory. By default, you should have such permissions in most cases.

## Creating a Link to the Script

If a symbolic link to **get-gist** is not in your **~/bin** directory, then do the following:

| Command  | Explanation  |
|---|---|
| slb   |  Go to **~/Git/JsObjects/Utilities/SetupLinuxBox** |
| git pull  | get the latest JsObjects  |
| ./CreateSymbolicLinks   | create the **~/bin/get-gist** symbolic link.   |

The original script is found here:

    ~/Git/JsObjects/Utilities/Templates/React/get-gist

[Here is a direct link](https://github.com/charliecalvert/JsObjects/blob/master/Utilities/Templates/React/get-gist) to the script on GitHub.

## Turn it in

Set up the script on your system. Run one of the commands and take a screenshot of the output. My goal is simply to ensure that you know how to use this tool, and in most cases a screenshot of the output from a run of the script should convince me that you do indeed know how it works.

The screenshot should show the menu of the script, a bit like the text I include at the overview near the top of this page.
