## Overview

Track the status of the programs you run.

## The Port Check List

- .bashrc
- my.service (The service file)
- setup-environment-service
- client package.json
- server/bin/www

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

## Turn it in

Write a similar script that will track the services you are running. Save it as systemdServices in your **scripts** directory. Make sure all your services can be configured through their service files to run on a particular port.

## hints

Get a list of common ports:

less /etc/services

less /usr/share/nmap/nmap-services

sudo apt-get install nmap
