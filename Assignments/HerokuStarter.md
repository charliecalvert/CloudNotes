Join [heroku](https://www.heroku.com/). Note your user name and password, or save your account into LastPass or the like. For language, choose NodeJs.

Take a moment to think about heroku's pricing. We will be using the free tier:

- <https://www.heroku.com/pricing>

Make sure you have ruby installed. If you have it installed you will see the following if you type **which ruby**

<pre>
$ which ruby
/usr/bin/ruby
</pre>

If you don't have it installed, install it like this:

<pre>
sudo apt-get install ruby-full
</pre>

On Cloud 9, heroku is already installed. But on Pristine Lubunutu you will need to install Heroku. The command is simple:

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

Run:

<pre>
CreateExpressProject lastname01
</pre>

Now create the heroku app:

<pre>
heroku create lastname01
</pre>

And some details:

<pre>
echo 'web: node bin/www' > Procfile
echo 'node_modules' > .gitignore
echo '.idea' >> .gitignore
echo '.c9' >> .gitignore
<pre>

Push to git:

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

All at once check list, but probably don't do the last command, open, on Cloud 9:

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

## Status

There's **heroku apps:info**:

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

## SSH

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

To switch from using HTTPS to SSH, issue this command:

<pre>
git config --global url.ssh://git@heroku.com/.insteadOf https://git.heroku.com/
</pre>

Check it, to confirm that you are now using an SSH command:

<pre>
$ git remote -v
origin	ssh://git@heroku.com/charlie001.git (fetch)
origin	ssh://git@heroku.com/charlie001.git (push)
</pre>

## Turn it in

Send me the URL of your app

## Hints

The best docs are on the Heroku site. But there are others, such as:

- <https://scotch.io/tutorials/how-to-deploy-a-node-js-app-to-heroku>
