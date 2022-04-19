---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/GruntSmokeTest03.md
relativePath: Assignments/GruntSmokeTest03.md
title: GruntSmokeTest03
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: GruntSmokeTest03.md
fileNameHTML: GruntSmokeTest03.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

This is the same as [GruntSmokeTest][grunt-smoke01], but there is a new script.

## New Script

Here is the new script:

```bash
#! /bin/bash

RED='\033[0;31m'
LIGHT_RED='\033[1;31m'
LIGHT_GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;36m'
NC='\033[0m' # No Color

# Use set -e to exit on error
set -e

function check() {
  if [ -d $1 ]; then
    cd $1
  else
    echo "Directory $1 does not exist."
    echo "Please fix the problem and try again."
    exit
  fi

  pwd

  if [ ! -d node_modules ]; then
     # npm install
     ln -s ~/tmp/node_modules node_modules
  fi   

  grunt check

  cd ..
}

A1=Week02-BasicTypes
A2=Week02-BasicTypesExpress
BASIC_TYPES="$A1 $A2"
A_OK=false

function basicTypes() {
    for i in $BASIC_TYPES
    do
         if [ -d $i ]; then
            echo -e $LIGHT_GREEN"Directory $BLUE$i$LIGHT_GREEN exists$NC"
            A_OK=true
            check "$i"
         else
            echo -e $LIGHT_RED"Directory $BLUE$i$LIGHT_RED does not exist$NC"
         fi
    done
    if $A_OK ; then
        echo -e $LIGHT_GREEN"BasicTypes has at least one good directory.$NC"
    else
        echo -e $LIGHT_RED"Basic Types is not good$NC"
        exit 1
    fi
}

function fancy() {
    if [ -d $A1 ]; then
        echo "Directory $A1 exists"
    else
        if [ -d $A2 ]; then
            echo "Directory $A2 exists"
        else
            echo "Neither Directory $A1 or $A2 exists"
        fi
    fi
}

function Weeks01To04() {
	check Week01-ExpressBasics/  
	basicTypes
	check Week02-GetNumbers/
	check Week02-JavaScriptObjects/
	check Week02-ObjectBasicsJasmine/
	check Week03-CouchDbDemo/
	check Week03-CouchDbViews/
	check Week03-ExpressJQuery/
	check Week03-ExpressRoutes/
	check Week04-PointerLock/
	check Week04-ThreeFloor/
	check Week04-ThreeJsBasics/
}

function Weeks05To07 {
	check Week05-MazeBuilder/
	check Week06-MazeDataReader/
	check Week07-Midterm/
}

function Week08 {
  check Week08-Passport/
}

Weeks01To04
Weeks05To07
Week08
```

All the tests should pass. Note that you can temporally comment out one of the last two lines with the hash tag to focus only on certain tests:

```bash
# Weeks01To04
# Weeks05To07
Week08
```

## Turn it in

When you are done, simply submit your assignment and leave a brief message reporting on your status.

Make sure you are running against the master branch.

More details are in [the Turn It In][turn] section of the [first assignment][grunt-smoke01].

[grunt-smoke01]: http://www.ccalvert.net/books/CloudNotes/Assignments/GruntSmokeTest.html
[turn]: http://www.ccalvert.net/books/CloudNotes/Assignments/GruntSmokeTest.html#turn-it-in
