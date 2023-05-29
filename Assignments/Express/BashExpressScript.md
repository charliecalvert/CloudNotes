---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/BashExpressScript.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: BashExpressScript.md
relativePath: /BashExpressScript.md
title: BashExpressScript
directoryName: Assignments
category : assignments-guide
---

## Overview

The goal of this assignment is to help you learn how to:

- Run and create simple bash scripts.
- Understand and tweak a few aspects of the Bash shell

Bash scripts help you automate tasks. Knowing how to run or create even relatively simple scripts can make you significantly more productive.

There will also be sections learning how to use aliases and environment variables to customize your environment. Bash scripts frequently make use of environment variables. Understanding how to use them can be a very skill.

This assignment assumes that you have installed my collection of sample programs called [JsObjects][elf-js-objects] on your system. When reviewing the [JsObjects README][elf-js-objects], be sure to read the section on Navigating JsObjects.

## Step One: Learn to Navigate {#navigate}

Let's take a few moments to be sure you know a little bit about environment variables. In particular, you will how to use them to navigate through your clone of the JsObjects repository.

As you learned in the JsObjects README file, navigation through JsObjects relies upon code found in your **.bash_aliases** file. If your **.bash_aliases** file is set up right, a number of commands should all run without error.

**NOTE**: _Recall that you can find my [.bash_aliases][jsba] file on GitHub._

Let's start by running a lengthy command that does not rely on any of the aliases or environment variables found in my **.bash_aliases** file:

```bash
ls ~/Git/JsObjects/Utilities/SetupLinuxBox/.bash_aliases
```

Here is another, and slightly shorter, way to run the same command. Note that is uses an environment variable called JSOBJECTS:

```bash
ls $JSOBJECTS/Utilities/SetupLinuxBox/.bash_aliases
```

**NOTE**: _The Bash shell is case sensitive. Thus JsObjects and JSOBJECTS are entirely different variables. In our case, JsObjects is the name of my repository, while JSOBJECTS is an identifier (variable) found in my **.bash_aliases** file._

Run both of the commands shown above and create a screenshot that shows the output. Call the screenshot: **BashAliasListing.png**

**NOTE**: _If $JSOBJECTS is not defined, there is probably a problem with your **.bashrc** or **.bash_aliases** file. See these document for details:_

- [.bash_aliases][jsba]
- [Configure Linux][configure-linux]

## Step Two: The Linux less Command {#linux-less}

Now run this command, which uses a built in Linux utility called **less**:

```bash
less $JSOBJECTS/Utilities/SetupLinuxBox/.bash_aliases
```

**less** is a file viewer. It allows you to see the contents of text files. I use it very frequently. Use the **j** and **k** keys or the arrow keys to navigate through the document. Press the **q** key to exit.

**NOTE**: _There are many useful descriptions of how to use **less** on the internet. You can also type **man less** at the Bash prompt to get a rather technical description of this crucial tool._

Take a screenshot of the **.bash_aliases** file running in **less** and call it: **BashAliasJsObjects.png**.

## Step Three: A Simple Script (#simple-script)

Use a text editor such as geany or nano to create a file called **bash-view**:

```bash
geany ~/bin/bash-view
```

Insert the following text into the file:

```
#! /bin/bash

less $JSOBJECTS/Utilities/SetupLinuxBox/.bash_aliases
```

When you are done typing:

- Save your work and exit the editor.
- Make the script executable: **chmod +x ~/bin/bash-view**
- Run it like this: **bash-view**

**NOTE**: _If you are in the directory where you created the file, you could also run it like this: **chmod +x ~/bin/bash-view**. But in general, if you put the script in a directory like **~/bin**, that is on your path, you can just type the name of the script, using tab completion to help you with the task._

Even this simple script, or ones like it, can be useful. The advantages of such scripts are that they:

- Save typing
- Serve as a reference reminding you how to perform certain tasks
- Knowing how to create them can be a good calling card in a job interview

If you create a goodly number of such scripts, you might want to save them to your Git repository so that you don't lose them.

## Step Four: What's Available {#available}

I have a number of useful scripts in JsObjects. To get a sense of what is available, run the following commands:

```bash
ls ~/Git/JsObjects/Utilities/SetupLinuxBox/
ls ~/Git/JsObjects/Utilities/NodeInstall/
```

Take a screenshot of the output and save it as **UtilityListings.png**.

## Step Five: Create Express Project {#create-express-project}

Now its time to create one of our own scripts. Consider the following commands:

```bash
express Week03-BootstrapDelicious
cd Week03-BootstrapDelicious
npm install
cp $ELF_TEMPLATES/bower.json .
cp $ELF_TEMPLATES/.bowerrc .
bower install bootstrap --save
sed -i -- 's/3000/30025/g' bin/www
sed -i -- 's/node\s/nodemon /g' package.json
cp ~/Git/JsObjects/Data/MongoLab03/favicon.png public/.
sed -i -- 's/Express/BootstrapDelicious/g' routes/index.js
echo -e "# $1\nby Charlie Calvert" >> README.md
```

These commands help you create and customize a NodeJs Express project called **Week03-BootstrapDelicious**. If given one at a time, these commands will:

- Create an express project
- Navigate into the directory containing the new project
- Run npm install to set up the project's server side libraries
- Create and configure bower to set up the client side libraries
- Set the port and switch our run command from node to nodemon
- Change the title of our project.

Experienced developers could type out these commands, one at a time, at the Bash command prompt. Having the skill to do that would have obvious value. However, most developers would find it difficult to remember the syntax for so many different commands. They would also find it a laborious and error prone task to type out so much text.

Fortunately, there is a solution. We can create a single Bash script containing all these commands. By running this single script, we can create our project in a matter of seconds.

**NOTE**: _You will see later that it is a relatively simple matter to configure your script to accept a parameter containing the project name. Thus your script could be easily reused to create an arbitrary project of this type._

We can save code like that shown above into a **bash** script, and then run it as needed:

- First create the file with an editor such as **geany**, **atom** or **nano**
- At the top of the script, tell bash that this is a bash script: **#! /bin/bash**
- Paste in the code shown above
- Save the file as **CreateBootstrapDelicous**
- Make it executable: **chmod +x CreateBootstrapDelicious**
- Run it like this: **./CreateBootstrapDelicious**

```bash
#! /bin/bash

express Week03-BootstrapDelicious
cd Week03-BootstrapDelicious
npm install
cp $ELF_TEMPLATES/bower.json .
cp $ELF_TEMPLATES/.bowerrc .
bower install bootstrap --save
sed -i -- 's/3000/30025/g' bin/www
sed -i -- 's/node\s/nodemon /g' package.json
cp ~/Git/JsObjects/Data/MongoLab03/favicon.png public/.
sed -i -- 's/Express/BootstrapDelicious/g' routes/index.js
echo -e "# $1\nby Charlie Calvert" >> README.md
```

## Step: Six: Generalize our Script {#generalize}

The only problem with this script is that it hard codes in the project name. If we want to make the script more generally useful, then we need to pass in a parameter that specifies the project name. We aren't ready to run the command yet, but the command we want to use might look like this:

```bash
CreateExpressProject Week03-MyProject
```

This would create and configure an express project called **Week03-MyProject**.

How do we create such a script? The first step will be to capture, or "pick off" the parameters passed to the bash script.

We can pick off parameters in a bash script with the built-in variables $1, $2, etc. For instance, in the following script I have replaced all reference to the project name with $1\. Now I can pass in a project name as a parameter to the script. Each instance of $1 will be replaced at run time with the parameter passed in by the user:

```bash
#! /bin/bash

express $1
cd $1
npm install
cp $ELF_TEMPLATES/bower.json .
cp $ELF_TEMPLATES/.bowerrc .
bower install bootstrap --save
sed -i -- 's/3000/30025/g' bin/www
sed -i -- 's/node\s/nodemon /g' package.json
cp ~/Git/JsObjects/Data/MongoLab03/favicon.png public/.
sed -i -- 's/Express/'$1'/g' routes/index.js
echo -e "# $1\nby Charlie Calvert" >> README.md
```

Use this script to create a project with a random name. For instance, you could follow these steps to create a reusable script:

- If a **~/bin** directory does not exist, you should create it: **mkdir ~/bin**
- Save the new script as **MyExpressProjectCreator** and put it in your **~/bin** directory
- Make it executable: **chmod +x ~/bin/MyExpressProjectCreator**
- Invoke it from any place else in your home folder like this: **MyExpressProjectCreator Week03-Test-LastName**
- Now navigate (cd) into **Week03-Test-LastName** and start the project: **npm start**

This works because the **~/bin** folder is placed on your path by the default **.bashrc** script that ships with Ubuntu. We don't have to add the **bin** folder to the path, the **.bashrc** file does that for us automatically.

**NOTE**: _A nice thing about Linux is that it will perform command completion for you for programs on your path. Thus you should be able to type something like **Cre** and then press to tab to have the system complete the command: *CreateExpressProject*_.

## Step Seven: System Check {#system-check}

I've made some progress with creating a **SystemCheck** script for Linux. The script is maintained here:

```
$JSOBJECTS/Utilities/SetupLinux
```

Hence you can run it like this:

```
$JSOBJECTS/Utilities/SetupLinuxBox/SystemCheck
```

The script itself looks something like this when it runs:

```text
=======================
Menu
=======================

b) Basic System Check
n) Node
p) PhoneGap
x) Exit

Please make a selection:
```

Select options b and n (Basic System Check and Node). Take screen shots of the output from both options and call them:

- SystemCheck.png
- Node.png

**NOTE**: _The SystemCheck script has grown more complex over time. As a result, you may see more options, and not all of checks will necessarily pass on your system. Try to focus only on the options that you need at this time, or use failing tests as a guide to additional setup that you might want to perform. The script is fairly complex for beginners, but exploring it should be an option for many users._

## Step Eight: Aliases {#aliases}

Sometimes our prompt in bash shell gets really long. As a result, I like to show the system name and path on one line, and the $ prompt on a second line. To make this change on your system, edit the [PS1] environment variable that is set around line 62 of your **~/.bashrc** file. Make it looks like this:

```bash
PS1='${debian_chroot:+($debian_chroot)}\u@\h\w\n\$ '
```

If you want to experiment with the above line, you can simply paste in the above to the bash prmopt and you can see the effect right away. Otherwise type this to process your changes to the **~/bashrc** file: **source ~/.bashrc**

Once you have your prompt set up correctly, make sure you are familiar with some of the aliases in the **.bash_alias** file. For instance, here is a simple bash alias:

```bash
alias jo="cd $JSOBJECTS"
```

After this alias is processed, you can just type **jo** to navigate to the **/home/bcuser/Git/JsObjects** directory. On our sytems, that alias is always available to you. This is true because:

- That alias is in the **~/.bash_aliases** file
- The **~/.bash_aliases** file is loaded by the **~/.bashrc** file
- The **~/.bashrc** file is processed everytime you open a bash prompt

Create an alias called **i3** that takes you to your git home, which in our case is your **~/Git/isit320-lastname-2015** folder. The alias should look something like this:

```
alias i3="cd $GIT_HOME/isit320-lastname-2015
```

Now run the following commands/aliases:

```
clear
jo
jou
joj
gd
i3
```

Take a screen shot of the result and call it **aliases.png**.

**NOTE**: _Becoming comfortable using and creating aliases can be a big boon for developers. There are a lot of things you can do with them. If you understand aliases and scripting, you can make Linux an enormously powerful development environment._

It might be best to complete the above before doing this, but you can create color prompts if you want. Paste the following into the bash shell to see a prompt that goes way over the top:

```bash
export PS1="\[$(tput bold)\]\[$(tput setaf 1)\][\[$(tput setaf 3)\]\u\[$(tput setaf 2)\]@\[$(tput setaf 4)\]\h \[$(tput setaf 5)\]\w\[$(tput setaf 1)\]]\[$(tput setaf 7)\]\n\\$ \[$(tput sgr0)\]"
```

If you want to make this prompt permanent, you can uncomment **force_color_prompt=yes** found around line 46 of your **~/.bashrc**. Comments in a bash shell script are made with the hash symbol: **#**.

Then change the color prompt, found around line 59 of your **~/bashrc**, to the following:

```
if [ "$color_prompt" = yes ]; then
    PS1="\[$(tput bold)\]\[$(tput setaf 1)\][\[$(tput setaf 3)\]\u\[$(tput setaf 2)\]@\[$(tput setaf 4)\]\h \[$(tput setaf 5)\]\w\[$(tput setaf 1)\]]\[$(tput setaf 7)\]\n\\$ \[$(tput sgr0)\]"
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h\w\n\$ '
fi
```

The color prompt is all one line. It should not wrap.

If the color prompt is too much, then you can revert to a black and white prompt by commenting out the **force_color_prompt=yes** line with the # symbol.

If you want to see the branch of your repository when you are in a repository, try this:

```bash
if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]$(__git_ps1)\n\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\n$ '
fi
```

The key change is to add **$(__git_ps1)**.

## Turn it in

Echo out the contents of your **MyExpressProjectCreator** script:

```bash
$ cat ~/bin/MyExpressProjectCreator
```

Take a screenshot of the result it save it as **MyExpressProjectCreator.png**.

Navigate to a temp folder and run your script, but this time save the output generate by your script into a file called **Create-LastName.txt**, where LastName is your last name.

Attach the following to your project when you submit it:

- **BashAliasListing.png**
- **BashAliasJsObjects.png**
- **UtilityListings.png**
- **SystemCheck.png**
- **Node.png**
- **aliases.png**
- **MyExpressProjectCreateor.png**
- **Create-LastName.txt**

Check in your copy of **CreateExpressProject** script into a folder of your repository called **MyScripts**. Push your work.

[configure-linux]: http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html#set-up-environment
[elf-js-objects]: https://github.com/charliecalvert/JsObjects/blob/master/README.md
[jsba]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/.bash_aliases
[ps1]: http://linuxconfig.org/bash-prompt-basics
