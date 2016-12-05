## Overview

This document is a description of the final for Isit320, Fall, 2016.

## Basics

- Bring **DataMaster** to the furthest point you can without including known bugs.
- Bring **DataHunter** (the game) to the furthest point you can without including known bugs
- Run both programs on EC2 with **systemd** (or Upstart) so that they stay up after you close the SSH connection.
  - Run **DataMaster** on port 30026
  - Run **DataHunter** on port 30025

Or vice-versa. The best plan is to submit the URL for both **DataMaster** and **DataHunter**.

## Smoke Test

Here is the final smoketest:

```bash
#! /bin/bash

RED='\033[0;31m'
LIGHT_RED='\033[1;31m'
LIGHT_GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;36m'
NC='\033[0m' # No Color

# Use set -e to exit on error
set -e

function check() {
  if [ -d $1 ]; then
    cd $1
  else
    echo "Directory $1 does not exist."
    echo "Please fix the problem and try again."
    exit
  fi

  pwd

  if [ ! -d node_modules ]; then
     # npm install
     ln -s ~/tmp/node_modules node_modules
  fi

  grunt check

  cd ..
}

A1=Week02-BasicTypes
A2=Week02-BasicTypesExpress
BASIC_TYPES="$A1 $A2"
A_OK=false

function basicTypes() {
    for i in $BASIC_TYPES
    do
         if [ -d $i ]; then
            echo -e $LIGHT_GREEN"Directory $BLUE$i$LIGHT_GREEN exists$NC"
            A_OK=true
            check "$i"
         else
            echo -e $LIGHT_RED"Directory $BLUE$i$LIGHT_RED does not exist$NC"
         fi
    done
    if $A_OK ; then
        echo -e $LIGHT_GREEN"BasicTypes has at least one good directory.$NC"
    else
        echo -e $LIGHT_RED"Basic Types is not good$NC"
        exit 1
    fi
}

function fancy() {
    if [ -d $A1 ]; then
        echo "Directory $A1 exists"
    else
        if [ -d $A2 ]; then
            echo "Directory $A2 exists"
        else
            echo "Neither Directory $A1 or $A2 exists"
        fi
    fi
}

function Weeks01To04() {
    check Week01-ExpressBasics/
    basicTypes
    check Week02-GetNumbers/
    check Week02-JavaScriptObjects/
    check Week02-ObjectBasicsJasmine/
    check Week03-CouchDbDemo/
    check Week03-CouchDbViews/
    check Week03-ExpressJQuery/
    check Week03-ExpressRoutes/
    check Week04-PointerLock/
    check Week04-ThreeFloor/
    check Week04-ThreeJsBasics/
}

function Weeks05To07 {
    check Week05-MazeBuilder/
    check Week06-MazeDataReader/
    check Week07-Midterm/
}

function Weeks08To09() {
    check Week08-Facebook/
    #check Week08-Google/
    check Week08-Passport/
    check Week09-SessionBasics/
    check Week09-SessionCouch/
}

function Weeks10ToFinal() {
    check Week10-JadeMixinBasics
    check Week10-SessionMaster
    check DataHunter
    check DataMaster
}

Weeks01To04
Weeks05To07
Weeks08To09
Weeks10ToFinal
```

I've commented out Week08-Google as I can't remember whether or not that was ever included as a necessary part of our Passport assignments.

## Logging In {#login}

I expect log in to work on EC2 for at least two our of three of these authorities:

- Google
- Facebook
- Twitter

Provide some means of "proving" to me that you are logged in. For instance, at minimum, your app should provide a menu choice that shows me your session object, and you should ensure that the session object contains details of the currently logged in client. I should be able to log in, log out, and switch authorities (from say Google to Facebook) and see those actions reflected in the object you display:

![Screenshot of session object with information on logged in user clearly visible][session-user]

The part I'm looking for begins with the word passport and contains my name, the auth provider (google), etc:

[session-user]: https://s3.amazonaws.com/bucket01.elvenware.com/images/datamaster-session-login.png

## Auth Callback Urls {#auth-callback}

You are able to have more than one callback URL, at least in most cases. For instance, on Google, I have 5 redirect URLs and two authorized JavaScript origins. On the Facebook login settings page, you can also set multiple URIs. Apparently, Twitter does not support this. So, for now, I suggest we do this:

- Everyone should have sign in working on EC2 for at least two authorities, and I must be able to see that you are logged in or logged out by choosing some menu option that shows me at least some recognizable part of your session object.
- For **extra credit**, see if you can find out the URL on the client side by looking at the Express **request.header.referer** property. This should be the URL seen in the address bar of the client who makes a request. Use this information to craft the appropriate callback URL for Google and Facebook. In other words, automagically use one callback URL when on EC2 and another callback URL when on localhost. Because twitter does not support multiple callback URLs, I don't think that will work for Twitter unless I started playing with my hosts file.

So that I can easily grade your homework, please add these URIs:

- http://localhost:30026/etc
- For instance: http://localhost:30026/facebook/login/return

This screenshot might be helpful, but remember that your callback URLs might be slightly different, and you might need more than this to get your code working. The key point is that it provides callback URLs for both localhost on 30025 and on 30026.

![Google Redirects from the Developer Console Page](https://s3.amazonaws.com/bucket01.elvenware.com/images/redirect-url-google.png)

When taking the above screen shot, I was in the Google Developer console, somewhere near here:

- <https://console.developers.google.com/apis/credentials/>

## Getting the Referer {#referer}

To get the server side code to get the host name (referer) for the client, that is the URL seen in the address bar of the browser when making a request, try looking at

  request.headers.referer

Here, for instance, is the **request.headers** object on my current machine:

```javascript
headers:
   { host: 'localhost:30026',
     connection: 'keep-alive',
     accept: 'application/json, text/javascript, */*; q=0.01',
     'if-none-match': 'W/"1f4-dNg/QpSgqXCMzwXceYM7Ag"',
     'x-requested-with': 'XMLHttpRequest',
     'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/53.0.2785.143 Chrome/53.0.2785.143 Safari/537.36',
     referer: 'http://localhost:30026/',
     'accept-encoding': 'gzip, deflate, sdch',
     'accept-language': 'en-US,en;q=0.8',
     cookie: 'connect.sid= SOME ENDLESS STRING' },
```

Note the **referer** and **host** properties of this object. You might also want to look at **request.originalUrl**. Try mirroring these values back to you when you ask for hte session object.

## Turn it in

- About 70% percent of your grade will involve creating bug free programs at mid-term level or higher.
- The remaining 30% of your grade involve implementing the features outlined in the FinalPrep assignments, and in other assignments we have done this quarter.

In short, if you can turn in something that works, that includes what we covered through the midterm, then you will probably pass the course. To get a good grade, you need to complete all the features that we have outlined throughout the assignments in this course. I am particularly interested in seeing that you have followed the following programs:

- DRY: Don't repeat yourself
- SRP: Single Responsibility Principle
- Open/Closed Principle: Open to Extension, closed to modification

I will grade on a curve that is based on the degree of experience that developers brought into the course. It will be easier for developers with less experience to do well in the course. A straight A, however, is reserved for those with experience who have mastered the topics in the course, and particularly the three principles outlined above.

I'll be expecting your final code to be in your repository, on the **master** branch, in two folders:

- **DataMaster**
- **DataHunter**

You can tell me about other versions of your code on other branches that may be more advanced, but buggier. Remember, however, when looking at your final code, I'm looking for bug free programs. In this final, at least, fewer features and fewer bugs is better than more features and more bugs. But the more bug free features you can create the better.

**NOTE**: _I'm not looking for release quality software. I won't be trying to break your program. When I say bug free, I mean that I can choose a menu item or hyperlinker, be taken to a feature, and have it work correctly at least the first time I select it._

## Merging and Checkout

To get **DataMaster**, or changes to **DataMaster**, into the master branch, you should be able to just checkout the **Week11/DataMaster** code into master. Something like this:

```bash
git checkout master
git checkout Week11 -- DataMaster
```

This should put the DataMaster project from the Week11 branch in master. It does not, however, commit the changes, which means you have a chance to review everything and make sure it worked. After poking around for a bit, if all looks well, you can commit and push.

You can also view the difference between two commits like this:

  git difftool master Week11 -- DataMaster

The checkout will replace any existing files and will add new files, but it will not delete files that are no longer needed. The **difftool** command, however, will catch cases where a file was deleted from branch **Week11** and should therefore be deleted from **master**.

Note that this will compare only files that are committed, not the difference between files that have been modified or added. See also:

- <http://stackoverflow.com/a/1355990/253576>

## Hint

Set up CouchDb

Run the **CouchDb** script in **~/Git/JsObjects/Utilities/NodeInstall**

Then edit the **/etc/couchdb/local.ini** file:

  sudo nano /etc/couchdb/local.ini

Set the **bindaddress** to **0.0.0.0**. In the **local.ini** file, a semi-colon is a comment, so you will need to delete the comment.

Be sure to see the details here which describe restarting couchdb:

- [CouchDb on Elvenware](http://www.elvenware.com/charlie/development/database/NoSql/CouchDb.html#couchdb-linux-install)

## Facebook ID {#facebook-client-id}

We have to set up the Facebook ClientId as mentioned here:

- [FaceBook ClientId](http://www.ccalvert.net/books/CloudNotes/Assignments/ExpressSessionMaster.html#facebook-client-id)

In your **data-master.service** file, set environment variables in this line:

Environment=NODE_ENV=production FACEBOOK_CLIENT_ID=<YOUR_CLIENT_ID> FACEBOOK_CLIENT_SECRET=<YOUR_SECRET_KEY>

So it looks something like this, but your folder, user name and group are different, and these are fake, and much too short, FACEBOOK IDs:

```bash
[Service]
ExecStart=/usr/bin/node /home/charlie/bin/data-master/bin/www
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=data-master
User=charlie
Group=charlie
Environment=NODE_ENV=production FACEBOOK_CLIENT_ID=11234 FACEBOOK_CLIENT_SECRET=abc123

[Install]
WantedBy=multi-user.target
```

## SetClientId

In your **package.json** file, this works:

```javascript
"start": ". ../setClientId && nodemon ./bin/www",
```

This way, when you type npm start, you **source setClientId** and then start your app. In particular, this code means **source** the **setClientId** file in the directory one level closer to the root from your current directory:

- . ../setClientId

This means you want to add a second activity to the **npm start** property:

- &&

And this, of course, is the code to start your application with nodemon:

- nodemon ./bin/www

## Examples

If you are having trouble with **.when** and routes and **queryControllers** and CouchDb, be sure to study these examples:

- <http://www.ccalvert.net/books/CloudNotes/Assignments/DataMasterRefactor.html#examples>

Be sure to run a git pull before trying to find these files in your copy of JsObjects.
Search entries or author
