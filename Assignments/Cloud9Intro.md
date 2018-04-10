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

## Simplified version

In some cases, I will ask you to perform only these steps and skip the portions on setting up and running Node appliclations with NPM:

- Set up your account on Cloud9
  - take a screen shot showing you that you are logged on
- Connect to your repository and create a Cloud 9 WorkSpace based on it.
  - Take a screenshot of the dashboard showing your workspace
- Open your workspace and open a file from the AllTest directory or some other part of your repository that you created during one of our assignments.
  - Take a screenshot showing the open file and the project Workspace file hierarchy on the left.
- Install JsObjects as shown below.
  - Take a screenshot showing that you have cloned JsObjects
  - For this simplified version of the assignment, you do not need to do anything more than clone JsObjects and set your **.bash_aliases** file.

## Set up JsObjects

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

JsObjects is the repository where I keep example code and many utilities that I use all the time. These utilities automate many tasks, and simplify navigation at the command prompt. You don't have to install JsObjects to code on Cloud9, however, I prefer to have it installed as it helps me simplify many tasks. Since I will have it installed, you should also consider installing it or you may find that it is difficult to follow the steps I take in class.

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

## Clone JsObjects

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
./UbuntuSetup
```

Pick the second option: **b) Run Basic Setup**. Don't forget to source **./bashrc**. Now many of the aliases we use might work on Cloud9.

**NOTE**: _I prefer to run applications on PORT 30025. However, Cloud 9 wants you to use PORT 8080 when you preview or view your app. As a result, check that the PORT environment variable is set to 8080:_

```bash
echo $PORT
```

If this does not return 8080, then do this:

```bash
export PORT=8080
```

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

## Turn it in

Submit your work and attach the screenshots.

[cloud9]: https://s3.amazonaws.com/bucket01.elvenware.com/images/Cloud9Intro01.png
[cloud9Small]: https://s3.amazonaws.com/bucket01.elvenware.com/images/Cloud9IntroSmall01.png
[jsobjects]: https://github.com/charliecalvert/JsObjects/blob/master/README.md

[webpack-c9]: https://github.com/webpack/webpack-dev-server/issues/230

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
v9.10.1</pre>

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
