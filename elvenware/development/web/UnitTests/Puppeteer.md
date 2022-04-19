---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/UnitTests/Puppeteer.md
relativePath: elvenware/development/web/UnitTests/Puppeteer.md
title: Puppeteer
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: Puppeteer.md
fileNameHTML: Puppeteer.html
image: ./course/course-javascript.jpg
subject: UnitTests
queryPath: elvenware/development/web/UnitTests/
---

<!-- toc -->
<!-- tocstop -->

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
