
Bash scripts help you automate tasks. If you know how to create and run relatively simple bash scripts you can become enormously productive.


## Step One: Navigate {#navigate}

I maintain the **.bash_aliases** file here:

* [bash_aliases][jsba]

If your system is set up right, the following commands should all run without error:

```bash
ls ~/Git/JsObjects/Utilities/SetupLinuxBox/.bash_aliases
```

Here is another way to run the same command:

```bash
ls $JSOBJECTS/Utilities/SetupLinuxBox/.bash_aliases
```

**NOTE**:*If $JSOBJECTS is not defined, this is a problem with your .bashrc file. See this document for details:*

* [Configure Linux][configure-linux]

Run both of these commands and create a screenshot that shows the output. Call the screenshot: **BashAliasListing.png**

Now run this command:

```bash
less $JSOBJECTS/Utilities/SetupLinuxBox/.bash_aliases
```

Take a screenshot and call it: **BashAliasJsObjects.png**

[jsba]:https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/.bash_aliases
[configure-linux]:http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html#set-up-environment

## Step Two: What's Available {#available}

I have a number of useful scripts in JsObjects. To get a sense of what is available, run the following commands:

```bash
ls ~/Git/JsObjects/Utilities/SetupLinuxBox/
ls ~/Git/JsObjects/Utilities/NodeInstall/
```

Take a screenshot of the output and save it as **UtilityListings.png**.

## Step Three: Create Express Project {#create-express-project}

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
```

If given one at a time, these commands will:

* Create an express project
* Run npm install
* Create and configure bower
* Set the port and switch our run command from node to nodemon
* Change the title of our project.

We can save code like that shown above into a **bash** script, and then run it as needed:

* First create the file with an editor such as **geany** or **nano**
* At the top of the script, tell bash that this is a bash script: **#! /bin/bash**
* Paste in the code shown above
* Save the file as **CreateBootstrapDelicous**
* Make it executable: **chmod +x CreateBootstrapDelicious**
* Run it like this: **./CreateBootstrapDelicious**

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
```

The only problem with this script is that it hard codes in the project name. If we want to make the script more generally useful, then we need to pass in a parameter that specifies the project name. We aren't ready to run the command yet, but the command we want to use might look like this:

```bash
CreateExpressProject Week03-MyProject
```

This would create and configure an express project called **Week03-MyProject**.

How do we create such a script? The first step will be to capture, or "pick off" the parameters passed to the bash script.

We can pick off parameters in a bash script with $1, $2, etc. For instance, in the following script I have replaced all reference to the project name with $1. Now I can pass in a project name as a parameter to the script. Each instance of $1 will be replaced at run time with the parameter passed in by the user:

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
```

Use this script to create a project with a random name. For instance, you could:

* If a **~/bin** directory does not exist, you should create it: **mkdir ~/bin**
* Save the new script as **CreateExpressProject** and put it in your **~/bin** directory
* Make it executable: **chmod +x ~/bin/CreateExpressProject**
* Invoke it from any place else in your home folder like this: **CreateExpressProject Week03-Test-LastName**
* Now navigate (cd) into **Week03-Test-LastName** and start the project: **npm start**

This works because the **~/bin** folder is placed on your path by the default **.bashrc** script that ships with Ubuntu. We don't have to add the **bin** folder to the path, the **.bashrc** file does that for us automatically.

**NOTE**: *A nice thing about Linux is that it will perform command completion for you for programs on your path. Thus you should be able to type something like **Cre** and then press to tab to have the system complete the command: **CreateExpressProject**.

## Step Four: System Check {#system-check}

I've made some progress with creating a **SystemCheck** script for Linux. The script is maintained here:

```
$JSOBJECTS/Utilities/SetupLinux
```

Hence you can run it like this:

```
$JSOBJECTS/Utilities/SetupLinuxBox/SystemCheck
```

The script itself looks something like this when it runs:

```
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

* SystemCheck.png
* Node.png

## Step Five: Aliases {#aliases}

Sometimes our prompt in bash shell gets really long. As a result, I like to show the system name and path on one line, and the $ prompt on a second line. To make this change on your system, edit the [PS1][ps1] environment variable that is set around line 62 of your **~/.bashrc** file. Make it looks like this:

```bash
PS1='${debian_chroot:+($debian_chroot)}\u@\h\w\n\$ '
```

If you want to experiment with the above line, you can simply paste in the above to the bash prmopt and you can see the effect right away. Otherwise type this to process your changes to the **~/bashrc** file: **source ~/.bashrc**

Once you have your prompt set up correctly, make sure you are familiar with some of the aliases in the **.bash_alias** file. For instance, here is a simple bash alias:

```bash
alias jo="cd $JSOBJECTS"
```

After this alias is processed, you can just type **jo** to navigate to the **/home/bcuser/Git/JsObjects** directory. On our sytems, that alias is always available to you. This is true because:

* That alias is in the **~/.bash_aliases** file
* The **~/.bash_aliases** file is loaded by the **~/.bashrc** file
* The **~/.bashrc** file is processed everytime you open a bash prompt

Create an alias called **i3** that takes you to your git home, which in our case is your **~/Git/isit320-lastname-2015** folder. The alias should look something like this:

```bash
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

**NOTE**: *Becoming comfortable using and creating aliases can be a big boon for developers. There are a lot of things you can do with them. If you understand aliases and scripting, you can make Linux an enormously powerful development environment.

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

[ps1]:http://linuxconfig.org/bash-prompt-basics

## Turn it in

Echo out the contents of your **CreateExpressProject** script:

```bash
$ cat ~/bin/CreateExpressProject
```

Take a screenshot of the result it save it as **CreateExpressProject.png**.

Navigate to a temp folder and run your script, but this time save the output generate by your script into a file called **Create-LastName.txt**, where LastName is your last name.

Attach the following to your project when you submit it:

* **BashAliasListing.png**
* **BashAliasJsObjects.png**
* **UtilityListings.png**
* **SystemCheck.png**
* **Node.png**
* **aliases.png**
* **CreateExpressProject.png**
* **Create-LastName.txt**

Check in your copy of **CreateExpressProject** script into a folder of your repository called **MyScripts**. Push your work.