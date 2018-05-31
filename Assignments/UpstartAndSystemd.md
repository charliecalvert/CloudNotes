## Overview

Use systemd to ensure your program starts every time your Ubuntu system reboots. systemd keeps your program running.

## Video

- [Talk me through it with a video][sdv]

[sdv]: https://youtu.be/2TFveipFpKQ

## systemd vs UpStart

There are two ways to start projects on Ubuntu based distros:

- upstart (15.04)
- systemd (15.10 or greater)

If you are using ubuntu 15.10 or later, use **systemd**. That means, if you are using 16.04, you should use **systemd**. If you are using 15.04 or earlier, then you should use **upstart**.

Use the following command to get your ubuntu version number

```bash
$ELF_UTILS/SetupLinuxBox/UbuntuReleaseNumber.sh
```

A sample run:

```bash
$ELF_UTILS/SetupLinuxBox/UbuntuReleaseNumber.sh
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=15.10
DISTRIB_CODENAME=wily
DISTRIB_DESCRIPTION="Ubuntu 15.10"
No LSB modules are available.
Distributor ID:	Ubuntu
Description:	Ubuntu 15.10
Release:	15.10
Codename:	wily
```

The contents of the script, at the time of this writing, is as follows:

```bash
cat /etc/lsb-release
lsb_release -a
```

Probably either command would do the job, but I run them both for completeness.

You probably don't need any more details, but further information on detecting the init system is available here:

- [https://unix.stackexchange.com/a/164092/91728][is]

## Symbolic Links in systemd

We should create a symbolic link to our project. First, be sure you have a bin directory:

```bash
mkdir ~/bin
```

Then create the link:

```bash
$ ln -s ~/Git/prog272-lastname-2018/NodeRouteBasics/ ~/bin/nrb
```

This symbolic link provides several benefits:

- It shortens your path
- It can be easily changed to point to a new location without forcing you to rewrite your  **upstart** or **systemd** script.

We will use the link when composing our systemd configuration file.

## Unit Configuraton File

Create a **systemd** service file called **nrb.service**:

```
[Unit]
Description=Run NodeRouteBasics
After=network.target

[Service]
ExecStart=/usr/bin/node ./bin/www
WorkingDirectory=/home/ubuntu/bin/nrb
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=nrb
User=ubuntu
Group=ubuntu
Environment=NODE_ENV=production
Environment=NRB_PORT=30029

[Install]
WantedBy=multi-user.target
```

When examining the above, check carefully, looking for changes that you will need to make:

- ExecStart
- WorkingDirectory
- SyslogIdentifier
- User
- Group
- Environment PORT

For instance, the **User** and **Group** would be **ubuntu** on EC2 and **bcuser** on most copies of Pristine Lubuntu.

Make sure the PORT matches the code in your **/bin/www** file:

```javascript
var port = normalizePort(process.env.NRB_PORT || '30025');
```

## Symbolic Link Role

Our systemd script is called **nrb.service**. If you look inside it, you will see that it assumes your copy of **NodeRouteBasics** can be accessed via a symbolic link called **nrb** that is found in the **~/bin** directory:

```
ExecStart=/home/charlie/npm/bin/npm start
WorkingDirectory=/home/charlie/bin/nrp
```

Regardless of where you keep **NodeRouteBasics** on your system, our script can find it. If you move the program, you don't have to update your configuration file, just update the symbolic link.    


## Deploy Configuration File

Deploy the service file:

```
sudo cp nrb.service /etc/systemd/system/.
```

Start the service:

```
sudo systemctl enable nrb
sudo systemctl start nrb
```

Get the status:

```
systemctl status nrb
```

To reload after a change:

```
systemctl daemon-reload
```

Sample output from status request when all is good:

```bash
$ systemctl status nrb
● nrb.service
   Loaded: loaded (/etc/systemd/system/nrb.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2015-12-03 08:59:01 PST; 4s ago
 Main PID: 4102 (node)
   CGroup: /system.slice/nrb.service
           └─4102 /usr/bin/node /home/charlie/bin/nrb/bin/www

Dec 03 08:59:01 forestpath systemd[1]: Started nrb.service.
Dec 03 08:59:02 forestpath node-sample[4102]: In bin/www the environment is production
```

## Manage your Program

To see logs and debug information, try this:

```
journalctl -u nrb
```

To completely remove a service from a system, I believe we should first stop it, and then disable it:

```
systemctl stop nrb
systemctl disable nrb
```

I'm not certain about the disable command at this time. I think it tells systemd not to load at boot, but allows us to leave the file in **/etc/systemd/system**. Not sure though.

The first and second links below will get you up to speed fairly quickly.

## Useful Scripts

No matter how simple the commands, it is almost always worth taking a moment to create some bash scripts to automate the process. Here are three that I find useful:

copy-nrb:

```bash
sudo cp nrb-charlie.service /etc/systemd/system/nrb.service
sudo systemctl enable nrb
sudo systemctl start nrb
systemctl status nrb
```

startService:

```bash
#!/bin/bash

sudo systemctl enable nrb.service
sudo systemctl start nrb.service
```

stopService:

```bash
#!/bin/bash

sudo systemctl stop nrb.service
sudo systemctl disable nrb.service
```

## ExecStart

We have a lot of options:

```
ExecStart=/home/bcuser/npm/bin/npm start
ExecStart=/usr/bin/node ./bin/www
ExecStart=/home/charlie/npm/bin/npm run node-start
WorkingDirectory=/home/ubuntu/bin/nrb
```

I'm including the **WorkingDirectory** because none of the options will work if that is not setup correctly.

The first option may not work correctly because it often uses **nodemon** which may not be installed for the root user.

The second option should always work if the program is set up correctly, that is, if it runs under normal conditions when not using systemd. It is my preferred solution.

The third option assumes you have set up something like this in **package.json**:

```javascript
"scripts": {
    "test": "node jasmine-runner.js",
    "start": "nodemon ./bin/www",
    "node-start": "node ./bin/www"
  },
```

Again, the option I think is simplest to use is this one:

```
ExecStart=/usr/bin/node ./bin/www
```

## Links

- [Sysdemd for Node Developers][sysd-node]
- [Systemd get started](http://patrakov.blogspot.com/2011/01/writing-systemd-service-files.html)
- [SystemD for Upstart Users](https://wiki.ubuntu.com/SystemdForUpstartUsers)

Other:

- [systemd on Redhat][sysdrh]

[sysd-node]:https://www.digitalocean.com/community/tutorials/how-to-deploy-node-js-applications-using-systemd-and-nginx
[sysdrh]:https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/System_Administrators_Guide/sect-Managing_Services_with_systemd-Unit_Files.html

## Upstart

**NOTE**: _Upstart is no longer used in most circumstances. As a result, you probably want to skip this section. Use **systemd** instjead._

Upstart can be used to keep your program running after you close your shell and to ensure that it restarts automatically when you reboot the system. Take a momement to learn about upstart:

- [UpStart Example in JsObjects][express-send]
- [UpStart home page](http://upstart.ubuntu.com/index.html)

A sample script:

```bash
# This is an upstart script: http://upstart.ubuntu.com/index.html
description "a script to keep node.js server in memory even after rebooting"
author      "Charle Calvert - http://www.elvenware.com/charlie"i

# Start after all drives mounted
start on started mountall
stop on shutdown

# Automatically Respawn:
respawn
respawn limit 99 5

script
    export HOME="/root"

# The following assumes nodejs is in /usr/bin
# It also assumes that the server is in /home/charlie/ExpressSend
    exec /usr/bin/nodejs /home/charlie/bin/nrb/bin/www >> /var/log/node.log 2>&1
end script

post-start script
   # Optionally put a script here that will notifiy you node has (re)started
   # /root/bin/hoptoad.sh "node.js has started!"
end script
```

## Copy the File

Copy the **NodeRoutesParams** file to the **/etc/init** directory:

    sudo cp nrb.conf /etc/init/.
    sudo mkdir /root/.config
    sudo cp ~/.config/ElvenConfig.json /root/.config/.

Start the program

    sudo start nrb

Stop the program

    sudo stop nrb

If you reboot the system, your program will start automatically.

Error messages and and other output are in: **/var/log/node.log**. That means you can see the debug output with this command:

```
cat /var/log/node.log
```

That is the case because of this bit from our conf file: **>> /var/log/node.log 2>&1**



Browse to your instance:

    <elasticIp>:30025/

If you were testing all this out on your copy of Lubunutu,
you would do this:

    127.0.0.1:30025/


## Symbolic Links in Upstart

Create a link our project, or whatever project you want to use for your final:

```bash
$ ln -s ~/Git/isit322-calvert-2016/Week10-ElvenImagePicker/ ~/bin/nrb
```

This symbolic link provides several benefits:

- It shortens your path
- It can be easily changed to point to a new location without forcing you to rewrite your  **upstart** or **systemd** script.

Our upstart script is called **NodeRoutesParams**. If you look inside it, you will see that
it assumes your copy of NodeRoutesParams is in **~/bin**:

    exec /usr/bin/nodejs $HOME/bin/NodeRoutesParams/bin/www >> /var/log/node.log 2>&1
    exec /usr/bin/nodejs /home/ubuntu/bin/nrb/bin/www >> /var/log/node.log 2>&1

That is why we created a symbolic link in that folder. That way, regardless of where
you keep **NodeRoutesParams** on your system, our script can find it.    

Copy the **NodeRoutesParams** file to the **/etc/init** directory:

    sudo cp nrb.conf /etc/init/.
    sudo mkdir /root/.config
    sudo cp ~/.config/ElvenConfig.json /root/.config/.

Start the program

    sudo start nrb

Stop the program

    sudo stop nrb

If you reboot the system, your program will start automatically.

Error messages and and other output are in: **/var/log/node.log**. That means you can see the debug output with this command:

```
cat /var/log/node.log
```

That is the case because of this bit from our conf file: **>> /var/log/node.log 2>&1**



Browse to your instance:

    <elasticIp>:30025/

If you were testing all this out on your copy of Lubunutu,
you would do this:

    127.0.0.1:30025/    

## Elastic IP

Be sure that you create, properly associate and submit an **Elastic IP** for your instance running on EC2. In order to confirm that your project is running on EC2, I must be able to reach it, and I can't do that if you only have a **Public IP**. The **Public IP** addresses automatically associated with your instance on EC2 is not necessarily permanent. To create a permenant IP address, you need an **Elastic IP**, as explained [here][elasticip].

**NOTE**: *Once you create an Elastic IP address, your Elastic IP and Public IP address are usually the same. At that point, your Public IP address should be permanent, but only because you have created an Elastic IP address and associated it with your instance.*

[elasticip]: http://www.elvenware.com/charlie/development/cloud/WebServices.html#elastic

## Turn it in

Submit the **Elastic IP** or **Public DNS** address of your instance running on EC2.

I'm not checking to see if the program is working correctly, only that it is running at all. I don't really care, for this assignment, whether I find **nrb**, **three-floor** or your final running on port 30025 of your EC2 instance. Just show me that you can get something running via **systemd** or **upstart**.  Also, add your config files, such as **nrb.conf** and/or **nrb.service** file to the appropriate project directory in your repository.

## Hints

The below is aimed at upstart users, but it should be obvious how it applies to those who might be using **systemd**. Here are some additional nodes:

- Create a **nrb.conf** in your final folder.
	- Look at the **JsObjects/JavaScript/NodeCode/ExpressSend** project for hints
	- In particular, modify the line that begins with the word **exec**
- In **bin/www** set the port to 30025 unless you are running more than one application
- If you are running more than one app, go to the AWS console and open up ports 30026, 30027, as described below:
	- Go to the AWS console for EC2 and select **instances**
	- Select your running instance (in green) from Instances Menu
	- Check the name of the security group (launch-wizard-1)
	- Select **Security Groups** from the menu
	- Select your security group
	- Choose **Inbound | Edit | Add**
	- Open ports 30026, 30027, etc and set the source to **Anywhere.**
- Copy nrb.conf to **/etc/init/nrb.conf**
	- sudo cp nrb.conf /etc/init/.
- Create a link to your final folder from the bin folder:

```
ln -s ~/Git/isit320-lastName-2015/Week10-ElvenImagePicker ~/bin/nrb;
```

When everything is set up, test your work:

	sudo start nrb

Then go to the appropriate URL and see if your application is working correctly. For problems, check the logs:

**cat /var/log/node.conf**.

Or, on systemd:

	systemctl status nrb

**NOTE**: *It is often simplest to do your work on your home machine. For instance, do your work on the Mac, in Pristince Lubuntu, or in Cloud 9. Then commit and push your work, and pull it on EC2. If you do decide to work on EC2, make sure you first commit all your work on your home machine, and then pull it on EC2. Then make your changes on EC2, commit and push, and then pull on your home machine.*

## Troubleshoot

Before digging into this further, remember to run sudo:

sudo systemctl status nrb

It may not always be necessary, but it might be a good call.

If our service is not loading, it is often because we have typed something wrong in our service file or typed the right thing but forgotten a step.

Sometimes running journalctl -u nrb can help. Type the letter h in journalctl to learn how to use it. The most import command is to type the letter capital G to go to the end of the journal.

Sometimes journalctl makes it clear what has gone wrong. If it is not helpful, then check everything step by step:

- Can I run the program on its own without systemd? In other words, does npm start work?
- Have I set up my symbolic link properly?
- Did I change all the fields in the service file that needed to be changed?
    etc.

To see which of your scripts is running, try something like this:

```
sudo systemctl is-active eip.service
sudo systemctl is-active micro01.service
sudo systemctl is-active git-explorer.service
```

Or try this:

```
sudo systemctl show
```

To see only a few properties:

```
sudo systemctl show -p ActiveState -p SubState micro01.service
```

To see all running units: **systemctl list-units**

[elfUpstart]:http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#upstart
[express-send]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/ExpressSend
[is]:https://unix.stackexchange.com/a/164092/91728
