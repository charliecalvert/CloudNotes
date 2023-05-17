---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/CloudNine/CloudNineAdvanced.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/CloudNine
fileName: CloudNineAdvanced.md
relativePath: /CloudNine/CloudNineAdvanced.md
title: CloudNineAdvanced
directoryName: CloudNine
category : cloudnine-guide
---

## Set up JsObjects

Prog 109 students should not continue further. If you are in some other class than Prog109, you should:

- Install JsObjects as shown below.
  - Take a screenshot showing that you have cloned JsObjects
  - For this simplified version of the assignment, you do not need to do anything more than clone JsObjects and set your **.bash_aliases** file.

Our primary goal in this exercise is to create a Cloud Nine environment in which:

- **JsObjects** has been cloned and is available to us
- We have set up customized **.bashrc** and **.bash_aliases** files.
  - This includes setting up our path and other environment variables
- We have a pre-configured **bin** directory with useful scripts in it.
- Have certain Npm global packages installed.

Near the bottom of this file I include a [minimum install][#minimum-install] that you can perform if you don't want to set up your environment as outlined in the body of this document. For most students, it is much better to do a regular setup than to use the minimum install.

## Install JsObjects

**JsObjects** is the repository where I keep example code and many utilities that I use all the time. These utilities automate many tasks, and simplify navigation at the command prompt. You don't have to install **JsObjects** to code on Cloud9, however, I prefer to have it installed as it helps me simplify many tasks. Since I will have it installed, you should also consider installing it or you may find that it is difficult to follow the steps I take in class.

Here are two videos. One has a mouse pointer in it, the other does not:

- [Watch Video with Mouse Pointer](https://youtu.be/orL2fe1GKsQ)
- [Watch the more in depth Video](https://youtu.be/z3v2CQpHHzE)

Let's think for a moment about the directory structure on Cloud 9. There is your home directory in which they create a directory called **workspace**. By default, your repo ends up in this directory when you create a Cloud9 Workspace via the method we employed:

```
-
-workspace // Your repo here
--Week01-ReactBasics  // And other directories from your repo
```

I ask that you create a folder called **Git** in the home directory and add **JsObjects** to it:

```
-
- workspace
-- Week01-ReactBasics // And so on
- Git
-- JsObjects
--- Utilities // And other JsObject directories
---- SetupLinuxBox
```

Here is how to proceed. In your Cloud 9 Workspace, navigate to your home directory. Create a folder called **~/Git** and navigate into it:

```bash
mkdir ~/Git
cd ~/Git
```

Or this equivalent code:

```bash
mkdir ~/Git && cd ~/Git
```

**NOTE**: _In Cloud 9, just type CTRL-V to paste your code into the bash shell._

In your repository, try running this command to get the URL for your repository. It's a way of double checking that you are where you think you are:

```bash
git remote -v
```
## Clone JsObjects

Prog 109 does not need to do this.

Clone [JsObjects](jsobjects) into **~/Git**

```
cd ~/Git
git clone https://github.com/charliecalvert/JsObjects.git
```

The code above is a bit redundant, as I have already asked you to navigate into the **~/Git** directory. However, one cannot be too careful.

Here is an example of the steps I took to clone JsObjects on Cloud9.

<pre>
charliecalvert:~/workspace (Week02) $ mkdir ~/Git
charliecalvert:~/workspace (Week02) $ cd ~/Git/
charliecalvert:~/Git $ pwd
/home/ubuntu/Git
charliecalvert:~/Git $ git clone https://github.com/charliecalvert/JsObjects.git
Cloning into 'JsObjects'...
warning: redirecting to https://github.com/charliecalvert/JsObjects.git/
remote: Counting objects: 20274, done.
remote: Compressing objects: 100% (77/77), done.
remote: Total 20274 (delta 37), reused 86 (delta 22), pack-reused 20167
Receiving objects: 100% (20274/20274), 27.55 MiB | 23.91 MiB/s, done.
Resolving deltas: 100% (11626/11626), done.
charliecalvert:~/Git $
</pre>


## Set up .bash_aliases


Pull **JsObject** to get the latest, then go into **~/Git/JsObjects/Utilities/SetupLinuxBox** and run **UbuntuSetup**.

```
cd ~/Git/JsObjects/Utilities/SetupLinuxBox
./UbuntuSetup
```

Pick the second option: **b) Run Basic Setup**. After it runs, don't forget to **source ./bashrc**. Now many of the aliases we use might work on Cloud9.

## Port Basics

**NOTE**: _I prefer to run applications on PORT 30025. However, Cloud 9 wants you to use PORT 8080 when you preview or view your app. As a result, check that the PORT environment variable is set to 8080:_

```bash
echo $PORT
```

If this does not return 8080, then do this:

```bash
export PORT=8080
```

## Setting the Port in .bashrc {#setting-the-port-bashrc}

Some versions of our **UbuntuSetup** script includes code that does this this:

    export PORT=30025;

To see this, issue this command on Cloud9 (c9.io) or elsewhere to display the last few lines of the script that is run every time a bash shell (the command line) is opened:

    cat ~/.bashrc

The end of the output from that command might look something like this:

```bash
export PORT=30025

# Edit and uncomment to load a key automatically.
#ssh-add -l | grep -q "made on rohan-elf"
#if \[ $? -eq 0 \]; then
# echo OK
#else
# echo FAIL
# ssh-add ~/.ssh/id_rsa
#fi

# === End Elven Code === #
```

We should use PORT 30025 on Pristine Lubuntu and AWS. But on Cloud9 (c9.io), you should edit the **.bashrc** file in the Cloud9 editor or with **nano** and change the line that says **export PORT=30025** to **export PORT=8080**. Alternatively, rather than using the editor, the following command will do that for you automatically:

```bash
sed -i 's/export PORT=30025/export PORT=8080/g' ~/.bashrc
```

This command uses the built-in [sed](https://www.gnu.org/software/sed/manual/sed.html) utility to open up **.bashrc**, replace **export PORT=30025** with **export PORT=8080**, and save the result.

After editing the .bashrc file or issuing the sed command, ask bash to process the updated **.bashrc** file:

    source ~/.bashrc

Confirm that it worked by echoing out the current value of the Environment variable called PORT:

```bash
$ echo $
PORT30025
```

Don't include the $ sign. Just do this **echo $PORT**.

Please note, you should do this on **c9.io**, but not on Pristine Lubuntu or on AWS. If you did it by mistake on the wrong platform, you can undo it like this:

```bash
sed -i 's/export PORT=8080/export PORT=30025/g' ~/.bashrc
```

Remember, the **.bashrc** file is processed whenever you open a new bash shell, or when you issue the **source ~/.bashrc** command. Most of the time the **.bashrc** file is processed automatically; you don't need to run **source ~/.bashrc**. You only run the **source** command if you have edited the file, and want to update the bash environment without opening a copy of the shell. If in any doubt, issue this command to check the value of the PORT environment variable:

    echo $PORT

## Example Navigation Commands

Here are some commands showing how I navigate from directory to directory on Cloud Nine:

```bash
charliecalvert:~/workspace (master) $ pwd
/home/ubuntu/workspace
charliecalvert:~/workspace (master) $ cd
charliecalvert:~ $ pwd
/home/ubuntu
charliecalvert:~ $ cd Git/JsObjects/
charliecalvert:~/Git/JsObjects (master) $ pwd
/home/ubuntu/Git/JsObjects
charliecalvert:~/Git/JsObjects (master) $ cd ~/workspace/
charliecalvert:~/workspace (master) $ pwd
/home/ubuntu/workspace
charliecalvert:~/workspace (master) $ cd Week02-JavaScriptObjects/
charliecalvert:~/workspace/Week02-JavaScriptObjects (master) $ pwd
/home/ubuntu/workspace/Week02-JavaScriptObjects
charliecalvert:~/workspace/Week02-JavaScriptObjects (master) $ cd ~/Git/JsObjects/Utilities/
charliecalvert:~/Git/JsObjects/Utilities (master) $ pwd
/home/ubuntu/Git/JsObjects/Utilities
charliecalvert:~/Git/JsObjects/Utilities (master) $ cd ~/workspace/
charliecalvert:~/workspace (master) $ pwd
/home/ubuntu/workspace
charliecalvert:~/workspace (master) $ jo
charliecalvert:~/Git/JsObjects (master) $ pwd
/home/ubuntu/Git/JsObjects
charliecalvert:~/Git/JsObjects (master) $ slb
charliecalvert:~/Git/JsObjects/Utilities/SetupLinuxBox (master) $ pwd
/home/ubuntu/Git/JsObjects/Utilities/SetupLinuxBox
charliecalvert:~/Git/JsObjects/Utilities/SetupLinuxBox (master) $ cd ~/workspace/
charliecalvert:~/workspace (master) $ pwd
/home/ubuntu/workspace
charliecalvert:~/workspace (master) $
```

Try running some of these commands just to make sure you understand how they work. For instance try these two commands:

```bash
cd ~/Git/JsObjects
cd ~/workspace
```

## Screen Shots

Take a screen shot displaying the following:

* The root file system from the Project page on left
* Either of the following:
  - **main.js** from **ReactBasics**
  - **Control.js** from the JasmineExpress project open in the editor.
* Your **ReactBasics** or **JasmineExpress** project running in a terminal
* The interface of your project in a preview window

**Note**: _It really doesn't matter much to me which project you show in Cloud9. If for some reason you don't have either **ReactBasics** or **JasmineExpress** up and running, just choose a different a project._

## Running React Basics on Cloud 9

- [Read this first][edl]

This is not part of the Simplified Version of this assignment.

I'm still learning about this too, but this is what worked for me with the Assignment we did in class on Wednesday. First I created a workspace that linked to my version of our new **isit320-lastname-2017** repository. My version of the repository contained the work we did in class on Wednesday.

**NOTE**: _Make sure your project is in the ~/workspace directory or one of its subdirectory. Cloud9 is setup to run files from this directory, and trying to run from someplace, such as ~/Git or one of its subdirectories, does not work well. But don't try to copy an entire repository from **~/Git** to **~/workspace**, as that has its own set of problems. In particular, **~/workspace** is the location of a repository, and if you copy a second repository into, then you end up with nested repositories._

On the command line, navigate to our project directory and run one of the following:

```
npm install && npm run build
yarn install && yarn run build
```

Open **Week01-ReactBasics/index.html** in the Cloud 9 editor and select **Run**. That starts Apache. Go to **Preview | Preview Running Application**, which opens a window. Click on the directory that helds your project, and Bob is your Uncle.

There is a little doo-hickey you can click so your project runs in its own tab in the browser, rather than as a child of Cloud 9's IDE. It's a matter of taste as to what you prefer.

I should mention that there is no need, and in fact you don't want to, install node and npm on Cloud 9. They are already installed if you selected node when you created your workspace. If you didn't select node, I would just delete your workspace, and start again, this time being sure to select node.

**NOTE**: _If you have are going to delete your workspace, and you have already edited your project, and you want to keep your changes, then push before you delete. Then when you recreated your workspace based on your repository, it will contain you latest changes._

![Cloud Nine](https://s3.amazonaws.com/bucket01.elvenware.com/images/cloud9-test-start.png)

## Bundle Loaded

The **bundle.js** will load properly so long as we specify the proper paths. Don't forget to run **npm run build**! This runs **webpack** and it is **webpack** that creates **bundle.js**. Our **bundle.js** file will also be created if we run **npm start**. But **npm start** also loads the built-in **webpack** server, and we don't need that in this case, since we are using Apache.

![Cloud9 Bundle](https://s3.amazonaws.com/bucket01.elvenware.com/images/cloud9-react-basics-bundle.png)

## Cloud9 and Index.html

The following screen shot shows **index.html** in the editor, the Apache Web Server hosting our app, and the app itself in the built-in Cloud9 browser. We start Apache by selecting our HTML file in the editory, and pressing the green **Run** button.

![Cloud9 Index HTML](https://s3.amazonaws.com/bucket01.elvenware.com/images/cloud9-react-basics-index-html.png)

## Webpack on Cloud 9

In the future, we should be able to do something more like this.

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

## Express Apps on Cloud 9

The key steps are two fold:

- Be sure you app is public.
- Be sure your app runs on port 8080.
- [And read about env.development.local][edl]

On the Window menu and at the top of the IDE on the right is open labeled **Share**. Select it, and set your **Application** to public. That's the key part.

Let's talk about getting the port right. By default the code in **bin/www** for setting up the port looks like this:

```javascript
var port = normalizePort(process.env.PORT || '30025');
```

The best solution is to set the port in the bash shell to 8080 and then launch your app. Here is how to set the PORT environment varial at the bash prompt:

```bash
export PORT=8080
```

Then start as normal:

```bash
npm start
```

Now press the Cloud9 preview button and all should be well so long as you don't make requests back to the server. If you want to do that, run it in Cloud9 on AWS.

## Turn it in

Submit your work and attach the screenshots.

## Understanding .bashrc

The **.bashrc** file is located in your home directory. It is processed when you open a bash shell or when you run one of these commands:

```
source ~/.bashrc
. ~./bashrc
```

The second command is a period followed by the path to your **.bashrc** file.

The **.bashrc** contains a series of commands that help to set up the bash environment. It is your chance to customize the environment to suit your needs. You can also review the file to help you understand how bash works.

You can most easily find the .bashrc file in your Cloud 9 editor by following these steps:

- Make sure the menu item **Window | Workspace** is selected
- Toggle open the **workspace** tab on the far left.
- Select the **gear** icon
- Select **Show home in favorites**
- Ensure that **Show hidden files** is selected

Now you should be able to view your entire directory tree in the **workspace** window. This is useful when you want to edit your **.bashrc** or other configuration files such as **.bash_aliases**. However, much of the time it is just a distraction, and can be turned off.

## NodeJs and NVM

Know your nomenclature:

*   Node or NodeJs: This the name of the [JavaScript runtime](https://nodejs.org/en/) (compiler).
*   **node_modules**: This is the name of a directory created when we run **npm install**. The libraries that our node project relies on are downloaded to and stored in, our **node_modules** folder. Each node project that uses a library -- and nearly all node projects do use libraries -- should have a **node_modules** folder in the root of the project.

In this case, we can think of the following terms as being synonymous or closely related:

*   package
*   library
*   module or a collection of modules

I should add that you will want to create **node_modules** directories by running **npm install**. But you should not need to install Node (Nodejs) on Cloud9. To check if Node is installed on a system, type **node --version** or **which node**.

On Pristine Lubuntu you should be running the [latest version](https://nodejs.org/en/) of Node automatically:

<pre>$ node --version
v8.12.0
</pre>

On Cloud9, we use [**nvm**](https://github.com/creationix/nvm) to maintain node. Here is a little Cloud9 session showing that I'm running a [recent LTS version](https://github.com/nodejs/Release#release-schedule1) of Node. That is good enough, but I want the [latest](https://nodejs.org/en/), so I use nvm to switch to the latest:

```bash
charliecalvert:~/workspace (master) $ which node
/home/ubuntu/.nvm/versions/node/v8.12.0/bin/node

charliecalvert:~/workspace (master) $ node --version
<strong>v8.12.0</strong>
```
Install **Node 10.10.0** with **nvm**:

```bash
charliecalvert:~/workspace (master) $ nvm install 10.10.0
...
Now using node v10.10.0 (npm v6.4.1)
```

Check node version:

```
charliecalvert:~/workspace (master) $ node --version
v10.10.0
```

The NodeJs repository is [here](https://github.com/nodejs/node).

<!---------------------------->
<!-- Links in this document -->
<!---------------------------->

[edl]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/RestBasics.html#cloud-9-client

[gnr]: https://www.elvenware.com/teach/assignments/GitNewRepo.html

[c9login]: https://c9.io/signin.html
[cloud9]: https://s3.amazonaws.com/bucket01.elvenware.com/images/Cloud9Intro01.png
[cloud9Small]: https://s3.amazonaws.com/bucket01.elvenware.com/images/Cloud9IntroSmall01.png
[jsobjects]: https://github.com/charliecalvert/JsObjects/blob/master/README.md

[webpack-c9]: https://github.com/webpack/webpack-dev-server/issues/230
