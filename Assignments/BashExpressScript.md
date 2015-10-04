
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

Run both of these commands and create a screenshot that shows the output. Call the screenshot: **BashAliasListing.png**

Now run this command:

```bash
less $JSOBJECTS/Utilities/SetupLinuxBox/.bash_aliases
```

Take a screenshot and call it: **BashAliasJsObjects.png**

[jsba]:https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/.bash_aliases

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

We can save code like that shown above into **bash** script, and then run it as needed:

* First create the file with an editor such as geany or nano
* At the top of the script, tell bash that this is a bash script: **#! /bin/bash**
* Paste in the code shown above
* Save the file as **CreateBootstrapDelicous**
* Make it executable: chmod +x CreateBootstrapDelicious
* Run it like this: ./CreateBootstrapDelicious

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

The only problem with this script is that it hard codes in the project name. If we want to make the script more generally useful, then we need to pass in a parameter with designating the project name. 

We can pick off parameters in a bash script with $1, $2, etc. For instance, in the following script I have replaced all reference to the project name with $1. Now I can pass in a project name as a parameter to the script:

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

Use this script to create a project with an random name. For instance, you could:

* Save the new script as CreateExpressProject and put it in your ~/bin directory
* Make it executable: chmod +x ~/bin/CreateExpressProject
* Invoke it from any place else in your home folder like this: **CreateExpressProject Week03-Test-LastName**
* Now navigate (cd) into **Week03-Test-LastName** and start the project: **npm start**

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
* **CreateExpressProject.png**
* **Create-LastName.txt**

Check in your copy of **CreateExpressProject** script into a folder of your repository called **MyScripts**. Push your work.