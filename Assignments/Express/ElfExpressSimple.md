---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Express/ElfExpressSimple.md
relativePath: Assignments/Express/ElfExpressSimple.md
title: ElfExpressSimple
queryPath: Assignments/Express/
subject: Express
fileNameMarkdown: ElfExpressSimple.md
fileNameHTML: ElfExpressSimple.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

See **$ELF_TEMPLATES/Scripts/ElfSimpleExpress**.

```bash
cd $HOME
mkdir Source
cd Source
elf-express eslint-test
cd eslint-test
npm i
```

Make sure **.bowerrc** looks like this:

```json
{
  "directory": "public/bower_components"
}
```

make sure .pretterignore has **bower_components**. Like this:

```code
**/build/**
**/bower_components/**
**/serviceWorker.js
```

```code
bower install
npm run build
npm start
```

Browse to http://localhost:30025

Run **get-gist**. From the menu choose option A

Run:

```code
./prettier
eslint .
```

Eslint should be clean

In WebStorm, choose **File | Settings**. Go to **Languages and Frameworks | JavaScript | Code Quality tools**, and turn on EsLint: **Manual Eslint Configuration** and then set the path EsLint config to:

		~/npm/lib/node_modules/eslint
