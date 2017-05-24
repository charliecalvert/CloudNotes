Join [heroku](https://www.heroku.com/). Note your user name and password, or save your account into LastPass or the like. For language, choose NodeJs.

Take a moment to think about heroku's pricing. We will be using the free tier:

- <https://www.heroku.com/pricing>
- <https://blog.heroku.com/deploying-react-with-zero-configuration>

Make sure you have ruby installed. If you have it installed you will see the following if you type **which ruby**

<pre>
$ which ruby
/usr/bin/ruby
</pre>

If you don't have it installed, install it like this:

<pre>
sudo apt-get install ruby-full
</pre>

On Cloud 9, heroku is already installed. But on Pristine Lubuntu you will need to install Heroku. The command is simple:

<pre>
wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh
</pre>

Now Type **heroku** on Pristine or Lubuntu or **heroku auth:login** on Cloud 9. Log in with your heroku user name and password. On Pristine Lubuntu:

<pre>
$ heroku
heroku-cli: Installing CLI... 22.7MB/22.7MBB
Enter your Heroku credentials.
Email: foobar@foo.com
Password (typing will be hidden):
Logged in as foobar@foo.com

 ▸    Add apps to this dashboard by favoriting them with heroku apps:favorites:add
See all add-ons with heroku addons
See all apps with heroku apps --all

See other CLI commands with heroku help
</pre>

On Cloud Nine, or if you don't see the login pronpt when you type **heroku**, the try **heroku auth:login** instead:

<pre>
heroku auth:login
Enter your Heroku credentials.
Email: foo@foobar.com
Password (typing will be hidden):
Logged in as foo@foobar.com
</pre>

Make sure you have node 4.0 or greater installed. Check also for npm and git. You don't need the exact numbers, but they should not be wildly different:

</pre>
$ node --version
v5.11.0
charlie@rohan-elf:~/temp
$ npm -v
3.8.6
charlie@rohan-elf:~/temp
$ git --version
git version 2.7.4
</pre>

## Deploy

Go to your ~/Source or ~/temp directory and run the following:

**NOTE**: _Don't create your heroku project in your repository. If you do, you will end up with a repository nested in a repository, which you want to avoid._

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
echo 'web: node bin/www' > Procfile
echo 'node_modules' > .gitignore
echo '.idea' >> .gitignore
echo '.c9' >> .gitignore
echo 'components' >> .gitignore
</pre>

Perform a standard **git add .** and **git commit -m "First commit to heroku of XXX project"**. Customize the commit comment in any way want, the text I show is just a suggestion. Then push to git like this:

<pre>
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


## Deploy Checklist

Here are all the commands seen at once, as culled from my bash history. It might serve as something like a checklist.

<pre>
CreateExpressProject Heru02
cd Heru02/
npm install
git init
heroku create heru02
echo 'web: node bin/www' > Procfile
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

## NPM and Bower

In NPM, we don't need dev dependencies. We need, however, to add manually install of bower and a **postinstall** step:


```javascript
{
  "name": "Week05-ExpressRoutesSolar",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www",
    "postinstall": "node_modules/bower/bin/bower install"
  },
  "dependencies": {
    "bower": "~1.7.9",
    "body-parser": "~1.13.2",    
    "cookie-parser": "~1.3.5",
    "debug": "~2.2.0",
    "express": "~4.13.1",
    "jade": "~1.11.0",
    "morgan": "~1.6.1",
    "serve-favicon": "~2.3.0"
  }
}
```

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

## Create SolarExplorer or SolarVoyager

Pick the branch in repository that you like. Go to your **~/Source** or **~/temp** directory and copy your **SolarExplorer** or **SolarVoyager** or whatever is the best version of your project, by issuing the command only once. Your command might look something likie this:

<pre>
cd ~/temp
cp -r ~/Git/prog272-calvert-2016/SolarExplorer/ .  <== FOR PRISTINE LUBUNTU
</pre>

<pre>
cd ~/temp
cp -r ~/workspace/SolarExplorer/ .                 <== FOR CLOUD NINE
</pre>

**NOTE**: _What I'm looking for is the most recent version of your current project. In Prog219 it is SolarExplorer, in Prog272 is SolarVoyager. In some other class I hold in the future, it may be some other assignment. The point is to give the latest working version of the project you developed for the midterm and are creating for the Final. I won't be grading the project itself, just seeing that you are able to get it up and running on the heroku servers. Even if most of the commands fail, that will not affect your grade. For this assignment, you are being graded only on your ability to get the application running in some form on the Heroku server. I ask you to do this, because it will be part of the final, and I'm doing what I can to encourage you to get started on this part of the assignment as soon as possible. Don't wait to the last minute!_

Run these commands, where the directory in first command may differ depending on the name of your project and the folder in which it is stored:

<pre>
cd SolarVoyager
git init
npm install bower --save
</pre>

Remove from **package.json** your dev-dependencies. We won't need them. Add a **postinstall** to the scripts section of **package.json**:

<pre>
"scripts": {
   "start": "node ./bin/www",
   "postinstall": "node_modules/bower/bin/bower install"
 },
</pre>

The **package.json** file might look a bit like this after you edit it:

```javascript
{
  "name": "Week05-ExpressRoutesSolar",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www",
    "postinstall": "node_modules/bower/bin/bower install"
  },
  "dependencies": {
    "body-parser": "~1.13.2",
    "bower": "^1.7.9",
    "cookie-parser": "~1.3.5",
    "debug": "~2.2.0",
    "express": "~4.13.1",
    "jade": "~1.11.0",
    "morgan": "~1.6.1",
    "serve-favicon": "~2.3.0"
  }
}
```

Set up **.gitignore** as we did above. Just in case, I'll remind you again that you should run **git init** before moving. If you have run **git init**, then go ahead and run **heroku create**, using a command a bit like this:

<pre>
heroku create SolarExplorerCalvert
</pre>

## Turn it in

Send me the URL of your app

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
