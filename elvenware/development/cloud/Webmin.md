---
layout: post
date: 2023-05-08 03:38:38 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud/Webmin.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud
fileName: Webmin.md
relativePath: /cloud/Webmin.md
title: Webmin
directoryName: cloud
category : cloud-guide
---

## Overview

[Webmin](http://www.webmin.com/index.html) is a web based graphical user
interface that you can use to help you administer a Linux box.

To install on Ubuntu or other Debian based distros, first edit
sources.list:

``` {.code}
sudo nano /etc/apt/sources.list
```

And then add the following lines at the bottom of sources.list:

``` {.code}
deb http://download.webmin.com/download/repository sarge contrib
deb http://webmin.mirror.somersettechsolutions.co.uk/repository sarge contrib
```

After exiting nano, issue the following commends:

``` {.code}
wget http://www.webmin.com/jcameron-key.asc
sudo apt-key add jcameron-key.asc
sudo apt-get update
sudo apt-get install webmin
```

Once you have it installed, browse to: <https://localhost:10000/>

You will be prompted for your Linux user name and password. Enter it,
and you will be taken to the Webmin home page for your server.

Links

-   [Reference:
    http://www.webmin.com/deb.html](http://www.webmin.com/deb.html)
