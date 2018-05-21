## Overview

Track the status of the programs you run.

## The Script

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

show 'Micro 01' micro01.service
show 'ElvenImagePicker (EIP)' eip.service
show 'Git Explorer' git-explorer.service
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

===============================
--- ElvenImagePicker (EIP) ---
===============================
Environment=NODE_ENV=production PORT=30200
ActiveState=active
SubState=running

===============================
--- Git Explorer ---
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

## Turn it in

Write a similar script that will track the services you are running. Save it as systemdServices in the root of your GitExplorer directory. Make sure all your services can be configured through their service files to run on a particular port.

## hints

Get a list of common ports:

less /etc/services

less /usr/share/nmap/nmap-services

sudo apt-get install nmap
