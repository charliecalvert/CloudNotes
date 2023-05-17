---
layout: post
date: 2023-05-10 04:39:14 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/database/NoSql/redis.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/database/NoSql
fileName: redis.md
relativePath: /database/NoSql/redis.md
title: redis
directoryName: NoSql
category: nosql-guide
---

## Overview

Learn about Redis.

## Install

Download Redis:

- redis downloads: [http://redis.io/download](http://redis.io/download)

Version number is not important, this is just the general rhythm:

```
cd ~/Downloads
tar xvfz redis-3.0.6.tar.gz
cd redis-3.0.6/
make
make test
cd src
./redis-server
```

If you get an error about TCL, try this:

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install tcl
```

You can also do this to start redis as a service (that is keep it running all the time), but I would not take this step yet. This is just an fyi:

```
/etc/init.d/redis_6379 start
```

See here: <http://redis.io/topics/quickstart>
