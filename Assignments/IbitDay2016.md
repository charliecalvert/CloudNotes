## Accounts

Create a GitHub account if you don't have one already.

**NOTE**: _You want employers, friends and family to be able to find your git hub account. These decisions are up to you, but naming your account something like **a49ZZZxx32##9@** makes your code hard to find, which is probably not what you want when job hunting or trying to share information with friends. If you can, just use your last name._

Go to Cloud 9. Create an account and sign in with GitHub.

This may set up your SSH key automatically. If not, find you SSH key:

- In the Cloud 9 Dashboard click the Gear menu (Setup)
- Select SSH Keys
- Block copy the key in gray box that begins with something like **ssh-rsa AAAetc...**
- Go to GitHub and open the settings on the far top right.
- Select Settings and go to Add SSH key
- Choose New SSH Key and paste it in.

Create a repository called ibit-day-lastname:

- Add a node .gitigore file
- Add the MIT license

Get the url by selecting the green **Clone or download** button. The URL might look something like this, but with your name instead of foo:

- **git@github.com:foo/ibit-day-foo.git**

**NOTE**: _If you see a URL that begins with **https**, then something is wrong. Go back and make sure you have your Cloud 9 SSH key set up in GitHub as described above. Don't go further until you get this straightened out. If necessary, just delete your repository and start over in GitHub. See if this time the repository has a URL that begins with **git** instead of **https**._

## Create Workspace

Create a new NodeJs workspace.

- Name: ibit-day
- Repository: Use the repository you created in the previous step.

## Setup

Read the cloud nine setup from here:


[c9-setup]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/CloudNineSetup

## Build

<pre>
CreateAllExpress ibit01
npm install && bower install && npm start
</pre>

Open **control.js** and put the following code in it:

```javascript
```

## JavaScript Start


## Jade Start

In **layout.jade** we give our Angular application a name. We use this to define an Angular module. We will place all the code for this application in this single module:

<div>
body(data-ng-app="elfApp")
</div>

Now add in **script** tags to load each of the JavaScript files we created in the previous section. For instance, copy the line that loads **control.js** and use it as template for loading the **about.js**, **first.js** and **home.js**. Make sure you load **control.js** after you load **jQuery** and **bootstrap** but before you load the other files we created in the previous section.


## Git Hints

git remote set-url origin git@github.com:charliecalvert/Prog272-Calvert.git

Pull from existing repository on GitHub into an empty directory. We assume you are in the directory:

<pre>
git init
git remote add origin git@github.com:charliecalvert/Prog272-Calvert.git
git pull origin master
</pre>
