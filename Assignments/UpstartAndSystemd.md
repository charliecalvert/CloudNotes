## Overview

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

## Symbolic Link

You are also going to need to create a symbolic link to your program in the **~/bin** directory. Something like this. First, be sure you have a bin directory:

```bash
mkdir ~/bin
```

```bash
ln -s ~/Git/isit320-calvert-2016/Week04-ThreeFloor ~/bin/three-floor
```

or like this:

```bash
$ ln -s ~/Git/isit322-calvert-2016/Week10-ElvenImagePicker/ ~/bin/elven-site
```

This symbolic link provides several benefits:

- It shortens your path
- It can be easily changed to point to a new location without forcing you to rewrite your  **upstart** or **systemd** script.

## systemd

Upstart is being replaced by **systemd**. This caused a huge uproar in the Linux community, but the transition is more or less complete at this stage (Nov, 2016). Fortunately, if you understand Upstart it is not hard to switch to **systemd**. You should switch to **systemd** if running on Ubuntu 15.10 or later, otherwise, stick with **upstart**.

If you are uncertain, here is how to find out which version of ubuntu you are running:

```bash
cat /etc/lsb-release
$ELF_UTILS/SetupLinuxBox/UbuntuReleaseNumber.sh
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=15.10
DISTRIB_CODENAME=wily
DISTRIB_DESCRIPTION="Ubuntu 15.10"
```

A sample **systemd** start up script (aka service file) called **elven-site.service**:

```
[Service]
ExecStart=/usr/bin/node /home/bcuser/bin/elven-site/bin/www
WorkingDirectory=/home/bcuser/bin/elven-site
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=elven-site
User=bcuser
Group=bcuser
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

When examining the above, check carefully, looking for changes that you will need to make:

- ExecStart path to your **bin/www** file
- SyslogIdentifier
- User
- Group

For instance, the **User** and **Group** would be **ubuntu** on EC2 and **bcuser** on most copies of Pristine Lubuntu.

Deploy the service file:

```
sudo cp elven-site.service /etc/systemd/system/.
```

Start the service:

```
sudo systemctl enable elven-site
sudo systemctl start elven-site
```

Get the status:

```
systemctl status elven-site
```

To reload after a change:

```
systemctl daemon-reload
```

Sample output from status request when all is good:

```bash
$ systemctl status elven-site
● elven-site.service
   Loaded: loaded (/etc/systemd/system/elven-site.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2015-12-03 08:59:01 PST; 4s ago
 Main PID: 4102 (node)
   CGroup: /system.slice/elven-site.service
           └─4102 /usr/bin/node /home/charlie/bin/elven-site/bin/www

Dec 03 08:59:01 forestpath systemd[1]: Started elven-site.service.
Dec 03 08:59:02 forestpath node-sample[4102]: In bin/www the environment is production
```

To see logs and debug information, try this:

```
journalctl -u elven-site
```

To completely remove a service from a system, I believe we should first stop it, and then disable it:

```
systemctl stop elven-site
systemctl disable elven-site
```

I'm not certain about the disable command at this time. I think it tells systemd not to load at boot, but allows us to leave the file in **/etc/systemd/system**. Not sure though.

The first and second links below will get you up to speed fairly quickly.

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
    exec /usr/bin/nodejs /home/charlie/bin/elven-site/bin/www >> /var/log/node.log 2>&1
end script

post-start script
   # Optionally put a script here that will notifiy you node has (re)started
   # /root/bin/hoptoad.sh "node.js has started!"
end script
```

## Symbolic Links

Create a link our project, or whatever project you want to use for your final:

```bash
$ ln -s ~/Git/isit322-calvert-2016/Week10-ElvenImagePicker/ ~/bin/elven-site
```

This symbolic link provides several benefits:

- It shortens your path
- It can be easily changed to point to a new location without forcing you to rewrite your  **upstart** or **systemd** script.

Our upstart script is called **NodeRoutesParams**. If you look inside it, you will see that
it assumes your copy of NodeRoutesParams is in **~/bin**:

    exec /usr/bin/nodejs $HOME/bin/NodeRoutesParams/bin/www >> /var/log/node.log 2>&1
    exec /usr/bin/nodejs /home/ubuntu/bin/elven-site/bin/www >> /var/log/node.log 2>&1

That is why we created a symbolic link in that folder. That way, regardless of where
you keep **NodeRoutesParams** on your system, our script can find it.    

Copy the **NodeRoutesParams** file to the **/etc/init** directory:

    sudo cp elven-site.conf /etc/init/.
    sudo mkdir /root/.config
    sudo cp ~/.config/ElvenConfig.json /root/.config/.

Start the program

    sudo start elven-site

Stop the program

    sudo stop elven-site

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

I'm not checking to see if the program is working correctly, only that it is running at all. I don't really care, for this assignment, whether I find **elven-site**, **three-floor** or your final running on port 30025 of your EC2 instance. Just show me that you can get something running via **systemd** or **upstart**.  Also, add your config files, such as **elven-site.conf** and/or **elven-site.service** file to the appropriate project directory in your repository.

## Hints

The below is aimed at upstart users, but it should be obvious how it applies to those who might be using **systemd**. Here are some additional nodes:

- Create a **elven-site.conf** in your final folder.
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
- Copy elven-site.conf to **/etc/init/elven-site.conf**
	- sudo cp elven-site.conf /etc/init/.
- Create a link to your final folder from the bin folder:

```
ln -s ~/Git/isit320-lastName-2015/Week10-ElvenImagePicker ~/bin/elven-site;
```

When everything is set up, test your work:

	sudo start elven-site

Then go to the appropriate URL and see if your application is working correctly. For problems, check the logs:

**cat /var/log/node.conf**.

Or, on systemd:

	systemctl status elven-site

**NOTE**: *It is often simplest to do your work on your home machine. For instance, do your work on the Mac, in Pristince Lubuntu, or in Cloud 9. Then commit and push your work, and pull it on EC2. If you do decide to work on EC2, make sure you first commit all your work on your home machine, and then pull it on EC2. Then make your changes on EC2, commit and push, and then pull on your home machine.*

[elfUpstart]:http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#upstart
[express-send]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/ExpressSend
[is]:https://unix.stackexchange.com/a/164092/91728
