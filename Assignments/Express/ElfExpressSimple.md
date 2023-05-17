---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Express/ElfExpressSimple.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/Express
fileName: ElfExpressSimple.md
relativePath: /Express/ElfExpressSimple.md
title: ElfExpressSimple
directoryName: Express
category : express-guide
---

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
