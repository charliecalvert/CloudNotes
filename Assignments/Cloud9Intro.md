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

Near the bottom of this file I include a [minimum install][#minimum-install] that you can perform if you don't want to set up your environment as outlined in the body of this document. For most students, it is much better to do a regular setup than to use the minimum install.

## Create Workspace


If you have not done so already,

- In Cloud 9 hit the Plus icon and create
  - new NodeJs workspace
  - Based on your repository

## Install JsObjects

JsObjects is the ancient, messy repository where I keep example code and many utilities that I use all the time. These utilities automate many tasks, and simplify navigation at the command prompt. You don't have to install JsObjects to code on Cloud9, however, I prefer to have it installed as it helps me simplify many tasks. Since I will have it installed, you should also consider installing it or you may find that it is difficult to follow the steps I take in class.

Let's think for a moment about the directory structure on Cloud 9. There is your home directory in which they create a directory called workspace. By default, your repo ends up in this directory when you create a Cloud9 Workspace via the method we employed:

```
/
/workspace // Your repo here
  /Week01-ReactBasics  // And other directories from your repo
```

I ask that you create a folder called Git in the home directory and add JsObjects to it:

```
/
/workspace
  /Week01-ReactBasics // And so on
/Git
  /JsObjects
    /Utilities // And other JsObject directories
```

Here is how to proceed. In your Cloud 9 Workspace, navigate to your home directory. Create a folder called **~/Git** and navigate into it:

```
cd
mkdir ~/Git
cd ~/Git
```

**NOTE**: _In Cloud 9, just type CTRL-V to paste your code into the bash shell._

The code shown above is a bit redundant in that I have already asked you to navigate to your home directory. Hence, the following code would work if you are carefully following my directions:

```
cd         // Don't use this example. Instead, play
mkdir Git  // it safe with the example above:
cd Git     // "mkdir ~/Git && cd ~/Git"
```

Notice that in this second set of commands I am not including the code that points at our home directory: **~/.**. Nevertheless, in the first example, I do include it, just to be safe. Thus, if a student forgets to first navigate to the home directory, then the commands will still work. Of course, some students will no doubt cut and paste the last two lines of the second example and use it in the wrong place. One can't win. But I can try to point you in the right direction.

Here is an example of the steps I took to clone JsObjects on Cloud9.

<pre>
charliecalvert:~/workspace (Week02) $ mkdir ~/Git
charliecalvert:~/workspace (Week02) $ cd ~/Git/
charliecalvert:~/Git $ pwd
/home/ubuntu/Git
charliecalvert:~/Git $ git clone http://github.com/charliecalvert/JsObjects.git
Cloning into 'JsObjects'...
warning: redirecting to https://github.com/charliecalvert/JsObjects.git/
remote: Counting objects: 20274, done.
remote: Compressing objects: 100% (77/77), done.
remote: Total 20274 (delta 37), reused 86 (delta 22), pack-reused 20167
Receiving objects: 100% (20274/20274), 27.55 MiB | 23.91 MiB/s, done.
Resolving deltas: 100% (11626/11626), done.
charliecalvert:~/Git $
</pre>

## Clone JsObjects

Clone [JsObjects](jsobjects) into **~/Git**

```
cd ~/Git
git clone https://github.com/charliecalvert/JsObjects.git
```

Again, the code above is a bit redundant, as I have already asked you to navigate into the **~/Git** directory. However, one cannot be too careful.

## Set up .bash_aliases

Many of the shortcut commands that I use all the time are stored in the **.bash_aliases** file stored in my JsObjects repository. Let's back up the default cloud 9 **.bash_aliases** file, copy in my version of the file, and process it so that we can immediately begin using aliases and exports defined in that file:

```
cp ~/.bash_aliases ~/.bash_aliases.c9
cp ~/Git/JsObjects/Utilities/SetupLinuxBox/.bash_aliases ~/.
source ~/.bash_aliases
```

Alternatively, you might try this. Pull **JsObject** to get the latest, then go into **~/Git/JsObjects/Utilities/SetupLinuxBox** and run **UbuntuSetup**.

```
./UbuntuSetup
```

Pick the second option: **b) Run Basic Setup**. Don't forget to source **./bashrc**. Now many of the aliases we use might work on Cloud9.

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

## Configure .bashrc

There are a few commands you should run to set up node to work the way we prefer. Begin by running the following in the bash shell:

```
npm config set prefix ~/npm
```

This command tells **npm** to place your globally installed packages in your home directory, in a folder called **npm**. This is useful for two reasons:

- If you install an NPM library into the default space, then it is owned by root. This means you need to type sudo in order to work with that library. Sometimes that doesn't matter, but sometimes it means that you end up needing to type sudo in order to work with your application. Soon, you end up in a mess, where you can't run your own program without first giving it root permissions. This won't happen all the time, but it is simpler to avoid the whole issue by installing your npm libraries someplace where you have permissions to use them.
- This second point can be argued either way. If you install your NPM global libraries in a place where only you can see them, then you will not pollute other user's environment. On the other hand, some libraries will be installed multiple times.

The bottom line is that one does not have to install NPM libraries into your home directory, but it is safer, particularly for beginners, to do so.

Check out this file: ~/Git/JsObjects/Utilities/SetupLinuxBox/BashrcEasyExtras

Put at least portions of it at the end of your **~/.bashrc**. The sinplest way to do this is as follows:

```
slb
cat BashrcEasyExtras >> ~/.bashrc
source ~/.bashrc
```

The first command, **slb**, is from our **~/.bash_aliases** file. It won't work unless you have set up **~/.bash_aliases** as described above. The **slb** alias moves you to this directory:

**~/Git/JsObjects/Utilities/SetupLinuxBox**

The second command appends some text onto the end of your **~/.bashrc** file. The text is found in a file from JsObjects called **BashrcEasyExtras**. We then process the **~/.bashrc**.

Optionally, we can display some of the work we did to confirm that everything is set up as expected:

```
echo $NODE_PATH
echo $PATH
```

If you want, you can edit your ~/.bashrc file manually. For instance, you can append the following to the end of the file:

<pre>
if [ -z "$SSH_AUTH_SOCK" ] ; then
    eval `ssh-agent`
fi

export NODE_PATH=$HOME/npm/lib/node_modules
export PATH="$PATH:$HOME/npm/bin"
</pre>

Then run **source ~/.bashrc**.

## The .gitignore file

Make sure that your repository contains a **.gitignore** file with a section that looks like this:

```
# IDE Files
.idea
.c9
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

The screenshot you want to create will be similar to, but not identical too, the image shown below:

[![Cloud9Small][cloud9Small]][Cloud9]

**Image01**: *The Cloud 9 IDE. Click the image above to expand it.*

## Running React Basics on Cloud 9

I'm still learning about this too, but this is what worked for me with the Assignment we did in class on Wednesday. First I created a workspace that linked to my version of our new **isit320-lastname-2017** repository. My version of the repository contained the work we did in class on Wednesday.

On the command line, I navigated to our project directory and ran:

```
npm install && npm run build
```

I opened **Week01-ReactBasics/index.html** in the Cloud 9 editor and selected Run. That started Apache. Then I went to Preview | Preview Running Application, which opened a window. I clicked on the directory that held my project, and Bob was my Uncle.

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

## Turn it in

Submit your work and attach the screenshots.

[cloud9]: https://s3.amazonaws.com/bucket01.elvenware.com/images/Cloud9Intro01.png
[cloud9Small]: https://s3.amazonaws.com/bucket01.elvenware.com/images/Cloud9IntroSmall01.png
[jsobjects]: https://github.com/charliecalvert/JsObjects/blob/master/README.md

[webpack-c9]: https://github.com/webpack/webpack-dev-server/issues/230

## Install Node Manually

Don't install Node on Cloud 9. This is just old stuff I don't want to delete you.

Node should already be installed in your copy of Cloud9. In fact, **NVM** should also be installed, so you can set the current version of Node with that tool, if you know how to use it.

However, if you want to take over control -- and I can't think of a good reason why you should -- then you can do this:

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

## Minimum Install {#minimum-install}

For the vast majority of students, performing the minimum steps instead of the full environment setup will not save you time. You will indeed get set up faster, but then, throughout the quarter, you will often have to take extra steps that I and the other students in the class don't need to take. In the long run, it will likely take you much longer to do the minimum install than to properly set up your environment. But I want you to have the choice to do things your own way -- even if it costs you egregiously -- if that is what you prefer. Also, in a very few cases, an expert student might have their own system for handling the tasks that I automate. In that case, they need not do the full environment setup that I prefer.

For those who want only the minimum install, start from the bash shell, and run the following:

```
npm config set prefix ~/npm
```

Also, at the bottom of your **~/.bashrc** file, add the following lines:

```
export PATH="$PATH:$HOME/npm/bin:"
export NODE_PATH=:$HOME/npm/lib/node_modules
```

This adds the **~/npm/bin** directory to your path. After adding the line, either restart your shell, or type the following:

```
source ~/.bashrc
```

This processes the changes to your **.bashrc** file.

This is the end of the minimum install.

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
v8.6.0</pre>

On Cloud9, we use [**nvm**](https://github.com/creationix/nvm) to maintain node. Here is a little Cloud9 session showing that I'm running a [recent LTS version](https://github.com/nodejs/Release#release-schedule1) of Node. That is good enough, but I want the [latest](https://nodejs.org/en/), so I use nvm to switch to the latest:

<pre>
charliecalvert:~/Git $ which node  
/home/ubuntu/.nvm/versions/node/v6.11.2/bin/node  
charliecalvert:~/Git $  <strong>node --version</strong>
 <strong>v6.11.2</strong>
charliecalvert:~/Git $  <strong>nvm install node</strong>  
Downloading https://nodejs.org/dist/v8.6.0/node-v8.6.0-linux-x64.tar.xz...  
######################################################################## 100.0%  
Now using node v8.6.0 (npm v5.3.0)  
charliecalvert:~/Git $ <strong>node --version</strong>
<strong>v8.6.0</strong>  
charliecalvert:~/Git $ which node  
/home/ubuntu/.nvm/versions/node/v8.6.0/bin/node
</pre>

The NodeJs repository is [here](https://github.com/nodejs/node).
