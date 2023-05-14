---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/UnitTests/Puppeteer.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/UnitTests
fileName: Puppeteer.md
relativePath: /web/UnitTests/Puppeteer.md
title: Puppeteer
directoryName: UnitTests
category : cssguide-guide
---

# Overview

About Puppeteer end to end testing.

## Try to avoid Chromium Download

This didn't work for me but you can try:

Set the following environment variable in **~/.bashrc**:

```bash
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"
```

Be sure to run **source ~/.bashrc** after updating **.bashrc**.

Check to make sure your work succeeded:

```bash
$ echo $PUPPETEER_SKIP_CHROMIUM_DOWNLOAD
true
```

If you don't see this when you echo the new environment variable then keep working until you do. Otherwise you will download Chromium which should already be installed on your system.

If this causes errors when you install and try to run puppeteer, then unset the environment variable:

```bashrc
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=
```

<!--       -->
<!-- links -->
<!--       -->
