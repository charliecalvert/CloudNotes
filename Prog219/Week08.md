---
creationLocalTime: 3/26/2022, 10:23:54 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog219/Week08.md
relativePath: Prog219/Week08.md
title: Week08
queryPath: Prog219/
subject: Prog219
fileNameMarkdown: Week08.md
fileNameHTML: Week08.html
---


<!-- toc -->
<!-- tocstop -->

## Description

## Symbolic Links

With code like this, or with whatever strategy your prefer, make sure you have a bin directory:

    if [ ! -d "~/bin" ]; then
        mkdir ~/bin
    fi

Then create a symbolic link to your project in the **bin** directory

    ln -s /home/ubuntu/Git/prog219-calvert/Week08-Midterm ~/bin/midterm


## Upstart

Some references:

- [On Elvenware][elfstart]
- In JsObjects [ExpressSend][expsend]


Create **midterm.conf**:

```
# This is an upstart script: http://upstart.ubuntu.com/index.html
description "a script to keep a node.js application in memory even after rebooting"
author      "Charle Calvert - http://www.elvenware.com/charlie"

# Start after all drives mounted
start on started mountall
stop on shutdown

# Automatically Respawn:
respawn
respawn limit 99 5

script
    export HOME="/home/ubuntu"

# The following assumes nodejs is in /usr/bin
    exec /usr/bin/nodejs /home/ubuntu/bin/midterm/bin/www >> /var/log/midterm.log 2>&1

end script

post-start script
   # Optionally put a script here that will notifiy you node has (re)started
   # /root/bin/hoptoad.sh "node.js has started!"
   echo "node.sj has started running BridgeReader"
end script
```

Here is the line I use to start my app:

    exec /usr/bin/nodejs /home/ubuntu/bin/midterm/bin/www >> /var/log/midterm.log 2>&1

Don't forget to also change the home directory:

    script
        export HOME="/home/ubuntu"

Copy your file **etc/init**":

    sudo cp Week08Midterm.conf /etc/init/midterm.conf

Then start it:

    sudo start midterm

To stop it:

    sudo stop midterm

To see what is going on:

    cat ~/var/log/midterm.log

[expsend]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/NodeCode/ExpressSend/README.md
[elfstart]:http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#upstart

## Systemd

Eventually, Upstart will be replaced with **systemd**:

- <http://www.markshuttleworth.com/archives/1316>

To get started, save the following as **/etc/systemd/system/midterm.service**:

```
[Unit]
Description=Run the midterm

[Service]
Restart=always
StandardOutput=syslog
SyslogIdentifier=midterm
ExecStart=/usr/bin/nodejs /home/ubuntu/bin/midterm/bin/www

[Install]
WantedBy=multi-user.target
```

Commands:

    systemctl enable midterm.service
    systemctl start midterm.service
    systemctl status midterm.service
    systemctl stop midterm.service

Alternatively, you can run status, get the PID (a number) and then do this:

    kill <PID-Number>

For instance:

    kill 2354

## Slides

- [Web Servers](http://bit.ly/Q9A4Ne)
- [Linux Basics](http://bit.ly/PDuWUB)
- [Mobile Playing Field](http://bit.ly/elf-mobile-play)
