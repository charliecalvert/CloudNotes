---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog282/Week04-AWS-Node.md
relativePath: Prog282/Week04-AWS-Node.md
title: Week04-AWS-Node
queryPath: Prog282/
subject: Prog282
fileNameMarkdown: Week04-AWS-Node.md
fileNameHTML: Week04-AWS-Node.html
---


<!-- toc -->
<!-- tocstop -->

Week04-AWS and Node
-------------------

Install Node
------------

sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git
sudo apt-get install nodejs npm

Then mkdir git, and clone your repository.

Alternative Install of Node
---------------------------

Do this if you want to install the latest version of node and npm:

```bash
sudo apt-get install python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```

Reference from the Node GitHub site:

<https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager>

The Assignment
--------------

Create two keep screen shots. One is of your Putty Command Prompt showing
the output from running the following command on your GridGame:

```console
node server.js
```

In server.js you should show include at least one console.log statement
that produces output at the command line shown in your first screen
shot.

In your second screen shot, show your program running on your AWS
server over port 30025. Your Elastic IP address and the port number
should be clearly visible in the address bar.

The One Change You Need to Make
-------------------------------

It turns out that you will need to make one change to your server.js
file once you have downloaded it on AWS.

There is a call that looks like this in your code for logging on to
OpenId:

```javascript
var relyingParty = new openid.RelyingParty(
    'http://localhost:30025/go', // Verification URL (yours)
    null, // Realm (optional, specifies realm for OpenID authentication)
    false, // Use stateless verification
    false, // Strict mode
    []
);
```

You need to change it to look like this:

```javascript
    var relyingParty = new openid.RelyingParty(
        'http://192.168.2.23:30025/go', // Verification URL (yours)
        null, // Realm (optional, specifies realm for OpenID authentication)
        false, // Use stateless verification
        false, // Strict mode
        []
    );
```

In this case, 192.168.2.23 is your Elastic IP. Or rather, it is standing
in for your Elastic IP. You should not write those exact numbers and
characters, but should instead substitude your own Elastic IP address
which you can find on the AWS console. You can also make the call like
this:

```javascript
var relyingParty = new openid.RelyingParty(
    'http://ec2-54-235-65-161.compute-1.amazonaws.com:30025/go', // Verification URL (yours)
    null, // Realm (optional, specifies realm for OpenID authentication)
    false, // Use stateless verification
    false, // Strict mode
    []
);
```

The new address that replaced localhost, the one that begins ec2-54,
you can also get from the Elastic Ip page of the AWS Console. The lesson
here is that you can use either the actual Elastic IP (eg 192.168.1.27),
or the long form of the address shown in this second example. They both
end up propogating out to the DNS machines and other nodes on the
Internet, and allow users to find your AWS virtual machine.

Alternative
-----------

If you were in class last quarter, and know how to launch a node
server and it in memory, then you can just submit the address of
your node GameGrid running on AWS.

Fallback
--------

You can't get full credit for this, but if you are stuck, take screen
shots of DataInput01 from JsObjects instead of your game.
