## Overview

There are two ways to start projects on Ubuntu based distros:

- upstart
- systemd

If you are using ubuntu 15.10 or above, you should use **systemd**. Before that, you should use **upstart**.

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

## Upstart

Upstart can be used to keep your program running after you close 
your shell and to ensure that it restarts automatically when you
reboot the system. Take a momement to learn about upstart:

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
    exec /usr/bin/nodejs /home/charlie/bin/hyperexplore/bin/www >> /var/log/node.log 2>&1
end script

post-start script
   # Optionally put a script here that will notifiy you node has (re)started
   # /root/bin/hoptoad.sh "node.js has started!"
end script
```

Create a link our project:

```bash
$ ln -s ~/Git/isit320-calvert-2015/Week10-HyperExplore/ ~/bin/hyperexplore
```

Our upstart script is called **NodeRoutesParams**. If you look inside it, you will see that
it assumes your copy of NodeRoutesParams is in **~/bin**:

    exec /usr/bin/nodejs $HOME/bin/NodeRoutesParams/bin/www >> /var/log/node.log 2>&1
    exec /usr/bin/nodejs /home/ubuntu/bin/hyperexplore/bin/www >> /var/log/node.log 2>&1
    
That is why we created a symbolic link in that folder. That way, regardless of where
you keep **NodeRoutesParams** on your system, our script can find it.    

Copy the **NodeRoutesParams** file to the **/etc/init** directory:

    sudo cp hyper-explore.conf /etc/init/.
    
Start the program

    sudo start hyper-explore
    
Stop the program

    sudo stop hyper-explore

If you reboot the system, your program will start automatically.

Error messages and and other output are in: /var/log/node.log

Browse to your instance:

    <elasticIp>:30025/

If you were testing all this out on your copy of Lubunutu,
you would do this:

    127.0.0.1:30025/

## systemd

Upstart is being replaced by **systemd**. This caused a huge uproar in the Linux community, but it is happening. Fortunately, if you understand Upstart it is not hard to switch to **systemd**. You should switch to **systemd** if running on Ubuntu 15.10 or later, otherwise, stick with **upstart**.

```bash
cat /etc/lsb-release
$ELF_UTILS/SetupLinuxBox/UbuntuReleaseNumber.sh 
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=15.10
DISTRIB_CODENAME=wily
DISTRIB_DESCRIPTION="Ubuntu 15.10"
```

A sample **systemd** start up script (aka service file) called **hyper-explore.service**:

```
[Service]
ExecStart=/usr/bin/node /home/charlie/bin/hyperexplore/bin/www
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=hyper-explore
User=charlie
Group=charlie
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

When examining the above, check carefully, looking for changes that you will need to make:

- ExecStart path to your **bin/www** file
- SyslogIdentifier
- User
- Group

For instance, the **User** and **Group** would be **ubuntu** on EC2.

Deploy the service file:

```
sudo cp hyper-explore.service /etc/systemd/system/.
```

Start the service:

```
systemctl enable hyper-explore
systemctl start hyper-explore
```

Get the status:

```
systemctl status hyper-explore
```

Sample output from status request when all is good:

```bash
$ systemctl status hyper-explore
● hyper-explore.service
   Loaded: loaded (/etc/systemd/system/hyper-explore.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2015-12-03 08:59:01 PST; 4s ago
 Main PID: 4102 (node)
   CGroup: /system.slice/hyper-explore.service
           └─4102 /usr/bin/node /home/charlie/bin/hyperexplore/bin/www

Dec 03 08:59:01 forestpath systemd[1]: Started hyper-explore.service.
Dec 03 08:59:02 forestpath node-sample[4102]: In bin/www the environment is production
```

The first and second links below will get you up to speed fairly quickly.

- [Sysdemd for Node Developers][sysd-node]
- [Systemd get started](http://patrakov.blogspot.com/2011/01/writing-systemd-service-files.html)
- [SystemD for Upstart Users](https://wiki.ubuntu.com/SystemdForUpstartUsers)

Other:

- [systemd on Redhat][sysdrh]

[sysd-node]:https://www.digitalocean.com/community/tutorials/how-to-deploy-node-js-applications-using-systemd-and-nginx
[sysdrh]:https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/System_Administrators_Guide/sect-Managing_Services_with_systemd-Unit_Files.html

## Elastic IP

Be sure that you create, properly associate and submit an **Elastic IP** for your instance running on EC2. In order to confirm that your project is running on EC2, I must be able to reach it, and I can't do that if you only have a **Public IP**. The **Public IP** addresses automatically associated with your instance on EC2 is not necessarily permanent. To create a permenant IP address, you need an **Elastic IP**, as explained [here][elasticip].

**NOTE**: *Once you create an Elastic IP address, your Elastic IP and Public IP address are usually the same. At that point, your Public IP address should be permanent, but only because you have created an Elastic IP address and associated it with your instance.*

[elasticip]: http://www.elvenware.com/charlie/development/cloud/WebServices.html#elastic

## Turn it in

Submit the **Elastic IP** address of your instance running on EC2. I'm not checking to see if the program is working correctly, only that it is running at all. Also, add your **hyper-explore.conf** and/or **hyper-explore.service** file to your **HyperExplore** project.

## Hints

The below is aimed at updstart users, but it should be obvious how it applies to those who might be using **systemd**. Here are some additional nodes:

- Create a **hyper-explore.conf** in your final folder.
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
- Copy hyper-explore.conf to **/etc/init/hyper-explore.conf**
	- sudo cp hyper-explore.conf /etc/init/.
- Create a link to your final folder from the bin folder:

```
ln -s ~/Git/isit320-lastName-2015/Week10-HyperExplore ~/bin/hyper-explore;
```

When everything is set up, test your work:

	sudo start hyper-explore

Then go to the appropriate URL and see if your application is working correctly. For problems, check the logs:

**cat /var/log/node.conf**.

Or, on systemd:

	systemctl status hyper-explore

**NOTE**: *It is often simplest to do your work on your home machine. For instance, do your work on the Mac, in Pristince Lubuntu, or in Cloud 9. Then commit and push your work, and pull it on EC2. If you do decide to work on EC2, make sure you first commit all your work on your home machine, and then pull it on EC2. Then make your changes on EC2, commit and push, and then pull on your home machine.*

[elfUpstart]:http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#upstart
[express-send]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/ExpressSend
