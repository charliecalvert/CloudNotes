---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/CssGuide/Sass.md
relativePath: elvenware/development/web/CssGuide/Sass.md
title: Sass
debug: aec has both but checking ELF code
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->



# SASS and CSS

SASS is for use with CSS with Margie Calvert. Editing our good file Data.md.

First install ruby, compass and foundation:

    sudo apt-get install ruby-dev
    sudo gem install foundation
    sudo gem install compass

Then install SASS;

    sudo gem install sass


Reference

- <http://wylbur.us/2014-06-12-installing-sass-on-ubuntu-1404>


## Git

    git log --pretty=oneline

These two scripts allow me to push code automatically to github.io.

The first script is in the root of an express project where I have some Jade. I suppose it does not need to be an express projects, it just needs to contain some jade.

```
#! /bin/bash

node Render.js 'ElvenSass.html'
cd $GIT_HUB_IO
./PushMe.sh "$1"
```

And then this is what PushMe.sh looks like. It is found in the root of my local copy of charliecalvert.github.io:

```
#!/bin/sh

NOW=$(date +"%m-%d-%Y")
PARAM="$1 $NOW"

git add .
git commit -m "$PARAM"
git push
```



