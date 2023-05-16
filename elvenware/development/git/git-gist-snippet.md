---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/git/git-gist-snippet.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/git
fileName: git-gist-snippet.md
relativePath: /git/git-gist-snippet.md
title: git-gist-snippet
directoryName: git
category: git-guide
---

# Gists and Snippets

Sometimes you don't want to create a big repository, but instead save a single file that you use often in different contects. This is what GitHub **Gists** and BitBucket **Snippets** are for.

## Using **curl**

Both Snippets and Gists can be retrieved with tools such as **wget** or **curl**.

**curl** is a popular utility used to pull down HTTP content from the web. More specifically, it allows you to retrieve, or post, data to web servers. For instance, if you want to retrieve a web page, or, in our case, a snippet or gist, you can use **curl**.

**curl** is installed by default on most linux servers.

## Bitbucket Snippets

Script for snippets on Bitbucket

```
#! /bin/bash

# This gets a specific snippet

curl https://api.bitbucket.org/2.0/snippets/ccalvert/i7pn/b8e99e91b0419115ac14f79ba9b3d29c6bc5446d/files/InstallNodePackages.sh

# This gets information on me and my BitBuckSnippets
curl https://api.bitbucket.org/2.0/snippets/ccalvert/

# This gets information on a specific snippet
# curl https://api.bitbucket.org/2.0/snippets/ccalvert/i7pn
```

Clone a snippet repository:

    git clone git@bitbucket.org:snippets/ccalvert/i7pn/installnodepackages.git

Copyright &copy; 2017 by Charles Calvert
