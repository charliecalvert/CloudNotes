# Heroku Starter

Join [heroku](https://www.heroku.com/). Note your user name and password, or save your account into LastPass or the like. For language, choose NodeJs.

Take a moment to think about heroku's pricing. We will be using the free tier:

- <https://www.heroku.com/pricing>

We don't need it yet, but note that there are instructions to install Heroku for use with **create-react-app**.

- <https://blog.heroku.com/deploying-react-with-zero-configuration>

Make sure you have node 6.0 or greater installed. Check also for npm and git. You don't need the exact numbers, but they should not be wildly different:

<pre>
$ node --version
v7.10.0
charlie@rohan-elf:~/temp
$ npm -v
4.2.0
charlie@rohan-elf:~/temp
$ git --version
git version 2.11.0
</pre>

I've put an install Heroku script in this JsObjects directory:

- The [JsObjects/Utilities/InstallScripts][install-directory] directory.
- Here is [a direct link to the script][direct-heroku].

```
sudo add-apt-repository "deb https://cli-assets.heroku.com/branches/stable/apt ./"
$ curl -fL https://cli-assets.heroku.com/apt/release.key | sudo apt-key add -
$ sudo apt-get update
$ sudo apt-get install heroku
```

Type **heroku** to log in. If that doesn't work, try **heroku auth:login** instead. In either case, it should look something like this:

<pre>
heroku auth:login
Enter your Heroku credentials.
Email: foo@foobar.com
Password (typing will be hidden):
Logged in as foo@foobar.com
</pre>

[install-directory]: https://github.com/charliecalvert/JsObjects/tree/master/Utilities/InstallScripts
[direct-heroku]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/InstallScripts/HerokuInstall

## Deploy

Make sure your system is set up correctly. In particular, look in the ~/bin directory and see if there is a file there called **CreateExpressProject**. If it is not there, then do this:

```
slb
./CreateSymbolicLinks
```

The **slb** alias takes you to this directory:

- **/Git/JsObjects/Utilities/SetupLinuxBox**

The **CreateSymbolicLinks** script should create the missing **~/bin/CreateExpressProject** script. (It will also create a number of other scripts.)

Go to your ~/Source directory and run a few commands to create your first Heroku project.

**NOTE**: _Don't create your heroku project in your repository. If you do, you will end up with a repository nested in a repository, which you want to avoid._

To create the project, enter the following in your **Source** directory, being sure to use your own lastname, not mine, and not the word **lastname**:

<pre>
CreateExpressProject lastname01
cd lastname01
git init
npm install
</pre>

Now create the heroku app, executing this command from the root of your new project:

<pre>
heroku create lastname01
</pre>

And some details:

<pre>
echo 'node_modules' > .gitignore
echo '.idea' >> .gitignore
echo '.c9' >> .gitignore
echo 'components' >> .gitignore
</pre>

Perform a standard **git add .** and **git commit -m "First commit to heroku of XXX project"**. Customize the commit comment in any way want, the text I show is just a suggestion. Then push to git like this:

<pre>
git push heroku master
# Or maybe like this:
git push --set-upstream heroku master
</pre>

Make sure you have your app running:

<pre>
heroku ps:scale web=1h
</pre>

On Pristine Lubuntu, but probably not on Cloud Nine, you can start your app in a browser like this:

<pre>
heroku open
</pre>

Push your app:

<pre>
git push heroku master
</pre>

## Use Node not Nodemon {#nodemon-no}

In package.json, we should replace **nodemon** with **node**. We like nodemon because it automatically restarts our application when we make changes to our code. But that is not helpful once we are deploying. At that stage, we are no longer changing code, and so we don't need nodemon.

If you do keep nodemon, consider using **nodemon.json** to be sure that writing a JSON file to disk does not restart your project in the middle of a database operation. Here we tell nodemon to ignore changes to a file called **renewables.json**:

```javascript
{
  "verbose": true,
  "ignore": ["renewables.json", "**/components/**"]
}
```

## NPM and Bower

In NPM, we don't need dev dependencies. We need, however, to add a manual install of bower and a **postinstall** step:

  npm install --save bower

**NOTE**: _Bower gives a warning. We will fix this later._

Also, open **package.json** and change **nodemon** to **node** in the **start** property. Also add the post install step shown below:

```javascript
{
  "name": "calvert04",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www",
    "postinstall": "node_modules/bower/bin/bower install"
  },
  "dependencies": {
    "body-parser": "~1.17.1",
    "bower": "^1.8.0",
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.3",
    "express": "~4.15.2",
    "morgan": "~1.8.1",
    "pug": "~2.0.0-beta11",
    "serve-favicon": "~2.4.2"
  }
}
```

## Deploy Checklist

Here are all the commands seen at once, as culled from my bash history. It might serve as something like a checklist.

<pre>
CreateExpressProject Heru02
cd Heru02/
npm install
git init
heroku create heru02
echo 'node_modules' > .gitignore
echo '.idea' >> .gitignore
echo '.c9' >> .gitignore
git add .
git commit -m "Initial commit"
git push --set-upstream heroku master
heroku open
</pre>

**NOTE**: _If you are working on Cloud 9, you probably won't be able to do the last command. Just use the regular Cloud 9 tools for previewing or starting an app._

## Status

There's **heroku apps:info** from inside the folder of one of your apps:

<pre>
$ heroku apps:info
=== heru03
Dynos:         
Git URL:       https://git.heroku.com/heru03.git
Owner:         foo@foobar.com
Region:        us
Repo Size:     8 KB
Slug Size:     14 MB
Stack:         cedar-14
Web URL:       https://heru03.herokuapp.com/
</pre>

And **heroku ps**

<pre>
heroku ps
No dynos on ⬢ heru03
</pre>

See how much time an app has left in its 18 hours:  **heroku ps -a heru03**

## Heroku and React

Its the same drill, but let's do it with **create-react-app**:

```
cd ~/Source
create-react-app lastname02
cd lastname02
git init
heroku create -b https://github.com/mars/create-react-app-buildpack.git
git add .
git commit -m "Heroku and React"
git push --set-upstream heroku master
```

Then you can do **heroku open** if you want. Or go to heroku dashboard.

## Delete

Delete an app from heroku with: heroku apps:destroy --app <APP_NAME>

For example, to delete an app called boiling-brook-54970:

<pre>
heroku apps:destroy --app boiling-brook-54970
▸    WARNING: This will delete ⬢ boiling-brook-54970 including all add-ons.
▸    To proceed, type boiling-brook-54970 or re-run this command with
▸    --confirm boiling-brook-54970

\> boiling-brook-54970
</pre>


## Trouble Shoot

I got an error with HTML that had this content:

<pre>
Application Error

An error occurred in the application and your page could not be served. Please try again in a few moments.

If you are the application owner, check your logs for details.
</pre>

I ran **heroku logs**:

<pre>
2016-06-01T01:29:44.276435+00:00 heroku[router]: at=error code=H14 desc="No web processes running" method=GET path="/favicon.ico" host=charlie001.herokuapp.com request_id=f54879f9-c619-4eac-be05-6ec0d6eeec7a fwd="73.97.86.37" dyno= connect= service= status=503 bytes=
</pre>

As you can see, I got error H14.

- <https://devcenter.heroku.com/articles/error-codes>

To fix it, make sure you have at least one web dyno running. Here I check and find that I am running zero dynos by running **heroku ps**:

</pre>
heroku ps
No dynos on ⬢ charlie001
</pre>

From inside my repo I add a single web dyno with **heroku ps:scale web=1**:

<pre>
heroku ps:scale web=1
Scaling dynos... done, now running web at 1:1X
</pre>

I check again to see if it worked:

<pre>
heroku ps
=== web (1X): node index.js (1)
web.1: up 2016/05/31 18:32:24 -0700 (~ 14s ago)
</pre>

Now life is good.

If you want to stop running your dyno:

<pre>
heroku ps:scale web=0
</pre>

## Copy CongressAddress

The goal is to:

- First create a default react app in Heroku as described above.
- Then copy your CongressAddress program on top of it.
- And then push it to Heroku

When you are done, your **CongressAddress** program should be running on Heroku. As a result, you should be able to browse to it with your phone. This will enable you to begin the process of tweaking your code so that it looks right on a phone.

It should be almost automatic. From the root of your react heroku project do this. First copy over CongressAddress on top of the default create-react-app project:

```
cp -r ~/Git/prog272-lastname-2017/CongressAddress/* .
```

Then add, commit, and finally push to Heroku as described above. Something like:

  git push heroku master

Now go to your browser and see if it works.

If you look at it on the Heroku dashboard, your application may get a funny name when it is pushed to Heroku. This should not matter, but if it bothers you it should also be configurable.

## Clone on New Machine

If you are now at home, and created your project on the school machine, you can download you project to your current machine like this:

- First be sure Heroku is set up properly on your home machine as described above.
- Then clone your existing project: **heroku git:clone -a calvert06**

To see a list of your apps on heroku: **heroku apps --all**

- [Heroku Docs on git clone](https://devcenter.heroku.com/articles/git-clone-heroku-app)

## Comparing Two Folders

After copying CongressAddress to a new folder, you will end up with two copies of **CongressAddress** on your system. This is not an ideal scenario, but it can be handled with relatively little fuss if you follow certain precautions.

- As a rule, only make changes to the application in your **prog272-lastname-2017** folder. Your project lives in your repository for this class. The repository in your **~/Source** folder is used primarily for deployment, not for development
  - There might be exceptions to this rule. For instance, it may, in some cases, be necessary to tweak configuration files such **package.json** before sending the project to Heroku. I don't think I had to do that, but it is not nearly so serious to have two versions of a file like that as it is to have two versions of delicate source file such as **DataMaven.js**.
- Once you have copied the project over one time, use tools to automate the process of updating the version in **~/Source**.

The primary tool I would use is Meld:

```
meld ~/Git/prog272-lastname-2017/CongressAddress/ ~/Source/lastname06
```

If you don't know how to use meld, I would [read up on it][meld-docs]. Understanding how to use tools that allow you to compare directories is an essential skill whether you want to go into development, QA, or IT.

[meld-docs]: http://meldmerge.org/help/index.html

Another option is to automate the process with a simple copy command which you could save in a script. This option would require some testing before you implemented it. It uses the **cp** command with some advanced flags:

  cp -Truvp ~/Git/prog272-calvert-2017/calvert06 ~/Source/calvert06/

This copies only files with differences (u) recursively (r) and verbosely (v) and helps you avoid the nested folder issue (T). For more information, access the manual for **cp** by typing **man cp** at the bash prompt. Scan through the document with the **arrow** keys and exit with the **q** key. Press **h** for help.

A very nice explanation of the valuable **T** option is here on stack overflow:

- [No Target Directory](https://stackoverflow.com/a/24486142/253576)

To create the script, do something like this, where you will need to modify the path to use your last name:

```bash
echo 'cp -Truvp ~/Git/prog272-calvert-2017/calvert06 ~/Source/calvert06/' > copy-to-heroku
chmod +x copy-to-heroku
```

## Turn it in

Send me the URL of your applications running on Heroku. I am expecting to see two URLs:

- The Express Application with your name and a number
- Your CongressAddress program.

CongressAddress doesn't have to be running perfectly. What I want to see is that you were able to move it to Heroku.

## Hints

The best docs are on the Heroku site. But there are others, such as:

- <https://scotch.io/tutorials/how-to-deploy-a-node-js-app-to-heroku>

## SSH

Don't do this section. It is not important, but I leave it here in case anyone is interested. You don't need to set up SSH because of the way Heroku works, but it certainly is not wrong to do so.

Create new key called **id_rsa** if you don't have one already:

<pre>
cd
ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
</pre>

Add your public key to heroku with a command like this: **heroku keys:add MyKey.pub **

List your keys: **heroku keys**

ssh -v git@heroku.com

You want to see: **Authenticated to heroku.com ([50.19.85.156]:22).**

I prefer not to use HTTPS. For instance, I'm not happy if I see this because it shows I'm using HTTPS:

<pre>
git remote -v
origin	https://git.heroku.com/charlie001.git (fetch)
origin	https://git.heroku.com/charlie001.git (push)
</pre>

To switch from using HTTPS to SSH, you can issue this command, but I have found it to be very dangerous:

<pre>
git config --global url.ssh://git@heroku.com/.insteadOf https://git.heroku.com/
</pre>

It would be simpler just to open **.git/config** and edit your git URLs by hand.

To check your work and confirm that you are now using SSH, run **git remote -v**:

<pre>
$ git remote -v
origin	ssh://git@heroku.com/charlie001.git (fetch)
origin	ssh://git@heroku.com/charlie001.git (push)
</pre>
