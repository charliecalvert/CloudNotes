## Overview

Track the status of the programs you run. Your code should do two things:

- Show any ports in the range 30025-30235 that are currently being used.
- Show if any of the programs you typically run under systemd are currently active.
	- Just call **sudo systemctl show -p ActiveState -p SubState -p Environment awsprov.service** or similar.

For instance, when I check for open ports, I get this feedback:

```
Starting Nmap 7.60 ( https://nmap.org ) at 2018-11-29 11:14 PST
Nmap scan report for elf-path.lan (192.168.86.26)
Host is up (0.0000080s latency).
Not shown: 209 closed ports
PORT      STATE SERVICE
30031/tcp open  unknown
30200/tcp open  unknown
```

This tells me that of 211 ports I'm checking two are being used:

- 30031
- 30200

The rest are not being used.

Here is what happens when I check the status of a service that is not running:

```
===============================
--- SystemCheck ---
===============================
Environment=NODE_ENV=production ELF_SYSTEM_CHECK_PORT=30034 SETUP_LINUXBOX=/home
ActiveState=inactive
SubState=dead
```

And here is what it looks like if it is running:

```
===============================
--- SystemCheck ---
===============================
Environment=NODE_ENV=production ELF_SYSTEM_CHECK_PORT=30034 SETUP_LINUXBOX=/home
ActiveState=active
SubState=running
```

The overall goal is simply to try to give us all a simple way of detecting which services are running on systemd at this point in time. It is not a perfect tool, but it is much better than nothing.

## The Port Check List

- .bashrc
- my.service (The service file)
- setup-environment-service
- client package.json
- server/bin/www

## The Official Port List {#official-ports}

I feel like this list is not yet complete, but this is a good start.

```bash
export PORT=30025
export SERVER_PORT=30026
export ELF_SCREF_PORT=30030
export ELF_SYSTEM_CHECK_PORT=30034
export MIDTERM_PORT=30035
```

Remember, these values play a role in at least three places:

- ~/.bashrc
- server/bin/www
- client/package.json

## The Script

In your scripts directory create a file **system-service-control**.

```bash
#!/bin/bash

function banner {
	echo ' '
	echo ===============================
	echo --- "$1" ---
	echo ===============================
}

function show {
	banner "$1"
	sudo systemctl show -p ActiveState -p SubState -p Environment $2
}

function showSystemCheck() {
	show 'SystemCheck' systemcheck.service
}


function checkPorts() {
    sudo nmap -p 30025-30035 192.168.2.13
}

message 'System Service Control'
T
echo 'Learn about Systemd and other running services.'

while true; do
    message "Menu"    
    echo -e "$LIGHT_GREEN  a) Check Ports 30025-30040"
    echo -e "$LIGHT_GREEN  b) Only Build"
    echo -e "$LIGHT_GREEN  c) Only Delete"
    echo -e "$LIGHT_RED  x) Exit"
    echo -e "\n$NC"
    read -p "Please make a selection: " userInput
    case $userInput in
        [Aa]* ) checkPorts false; continue;;
        [Bb]* ) showSystemCheck; continue;;
        [Cc]* ) deleteOld; continue;;
        [XxQq]* ) break;;
        *) echo -e "\n$NC" + "Please answer with a, b, c, or x.";;
    esac
done
```

The output:

```bash
$ ./serviceActive

===============================
--- Micro 01 ---
===============================
Environment=NODE_ENV=production PORT=30027
ActiveState=active
SubState=running
sudo nmap -p 30025-30035 192.168.2.13
===============================
--- ElvenImagePicker (EIP) ---
===============================
Environment=NODE_ENV=production PORT=30200
ActiveState=active
SubState=running

===============================
--- Git Explorer ---sudo nmap -p 30025-30035 192.168.2.13
===============================
Environment=NODE_ENV=production PORT=30031 GEX_SERVER_PORT=30026
ActiveState=active
SubState=running
```

## Setting Ports

Make sure you can control each of the programs that you run as a service. For instance, in my GitExplorer server I have this code in bin/www:

```JavaScript
var port = normalizePort(process.env.GEX_SERVER_PORT || '30026');
```

And in the service file, I have this:

```
Environment=NODE_ENV=production
Environment=PORT=30031
Environment=GEX_SERVER_PORT=30026
```

This should launch the client on 30031 and the server on 30026.

## Port Scanning

Install **nmap**:

		sudo apt install nmap

Scan for open ports on a specific machine:

```
sudo nmap -p- 192.168.2.13
```

Scan for the ports that we use that might be open:

```
sudo nmap -p 30000-30050 192.168.2.13
```

Or:

```
sudo nmap -p 30025-30035 192.168.2.13
```

For instance:

```
$ sudo nmap -p 30025-30035 192.168.2.13

Starting Nmap 7.01 ( https://nmap.org ) at 2018-05-21 10:21 PDT
Nmap scan report for 192.168.2.13
Host is up (0.000021s latency).
PORT      STATE  SERVICE
30025/tcp closed unknown
30026/tcp open   unknown
30027/tcp open   unknown
30028/tcp closed unknown
30029/tcp closed unknown
30030/tcp closed unknown
30031/tcp open   unknown
30032/tcp closed unknown
30033/tcp closed unknown
30034/tcp closed unknown
30035/tcp closed unknown
```

## Get Your IP

Using NMAP to retrieve services on your local PC is easier if you can automatically get the local IP. Then you will not have to first get the IP, and only then call nmap. The lazier, and hence better, solution is to have a single way to get both the IP and the output from nmap. Below is an outline of such a technique.

This [Stack Overflow solution][sonif] is perhaps reasonably robust, though there might be trouble if you have a single interface with two IP addresses. Our script expects this small app to return a single IP address, but in some cases it might return two. So far I have not found a machine that has two IP addresses for a single interface, so I don't know what will happen in that case or how to work around it. Here is the SO code, only slightly modified:

```javascript
#!/usr/bin/env node

var os = require('os');
var ifaces = os.networkInterfaces();

// Based on something found here: https://stackoverflow.com/a/8440736/253576
Object.keys(ifaces).forEach(function (ifname) {
  'use strict';
  var alias = 0;
  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(iface.address);
    }
    ++alias;
  });
});
```

Save the above JavaScript in a file in your **scripts** directory called **get-ip.js**. Then in your **system-service-control** script, do this:

```bash
LOCAL_IP=$(./get-ip.js)
```

Now you can do this in your script:

```bash
function checkPorts() {
    sudo nmap -p 30025-30235 ${LOCAL_IP}
}
```

**NOTE**: _This might work in bash as a way to get your IP, but I haven't quite finished it:_

```bash
ip addr | grep -o "inet\s[[:digit:]]*.[[:digit:]]*.[[:digit:]]*.[[:digit:]]*.[[:digit:]]*\sbrd"
```

## Turn it in

Write a similar script that will track the services you are running. Save it as **system-service-control** in your **scripts** directory. This script lets you check the status of ports and individual programs. Use it to help you make sure all your services can be configured through their service files to run on a particular port.

Suppose you have five services programs that can be run as systemd services. Then your script should have seven menu options:

- Check the Ports
- Use the Show function to check Programs 1 - 5 to see if the are active
- A way to exit the program

For instance, here is how to check one of the five programs that could be running as systemd service:

```javascript
function show {
    banner "$1"
	  sudo systemctl show -p ActiveState -p SubState -p Environment $2
}

function showSystemCheck() {
	show 'SystemCheck' systemcheck.service
}
```

The **show** function uses the name of a service file and the **systemctl** utility to check the status of the program that uses, in this instance, **systemcheck.service**. If you have a menu item that allows you to call **showSystemCheck** then you are at least one seventh of the way through.

If the requirement were to check on three programs, rather than five, then menu might look like this:

```bash
===============================
--- Menu ---
===============================
  a) Check Ports 30025-30225
  b) SystemCheck
  c) SystemCheckRefactor
  d) AWS Provision
  x) Exit
```

You have the option to check the ports, to check three programs, and to exit. If I added code to check two more programs, I would be done:

```bash
===============================
--- Menu ---
===============================
  a) Check Ports 30025-30225
  b) SystemCheck
  c) SystemCheckRefactor
  d) AWS Provision
  e) Midterm
  f) EC2-Copy-File
  x) Exit
```

## hints

Get a list of common ports:

less /etc/services

less /usr/share/nmap/nmap-services

sudo apt-get install nmap


[sonif]: https://stackoverflow.com/a/8440736/253576
