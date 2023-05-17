---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/ReactEsLint.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/React
fileName: ReactEsLint.md
relativePath: /React/ReactEsLint.md
title: ReactEsLint
directoryName: React
category : react-guide
---

## Overview

We want to lint our code to see if it meets some basic requirements. The most important part is setting up [ESLint](https://eslint.org/) at the command line, but we also want it working WebStorm.

You can use the information in this document with many projects, but if you need a simple project to focus on, then here is one:

- [ElfExpressSimple](/teach/assignments/express/ElfExpressSimple.html)

The goal would be to add ESLint and Prettier to that project or another on of your choosing.

## Automate

The [GetGist][gg] script automates key portions of the ESLint and Prettier installation. If you already understand ESLint and Prettier, and just want to get things set up, use the script. If the whole subject is new to you, then please read and work through this document to get an understanding of what the script does for you.

You should run **get-gist** in the root of your project. Here is what happens when you run get-gist:

    $ get-gist

    =======================
    Menu
    =======================

     Gists
      a) Install ESLintRc and Prettier in cwd. (cdef)
      b) ElfDebugEnzyme
      c) .eslintrc
      d) .eslintignore
      e) prettier
      f) .prettierrc
      g) Default React Component
      h) Setup React Native Enzyme Npm
      i) Setup React Native Enzyme Yarn
      j) ElvenLogger
      k) Elven Node systemd Tools
      l) Elven Create Concurrently
      m) React Control Component for elf-express
      x) Exit


    Please make a selection:

You should choose **Install EsLintRc and Prettier**, which is option **a**. This will install eslint and prettier files in the current working directory (cwd). You can achieve the same effect by choosing c, d, e and f from the menu.

Usually, no harm is done if you install eslint and prettier multiple times.

**NOTE**: _I often use this section of this text as an introduction to the **get-gist** utility. As result, many students who come here don't have to do anything else after reading and performing the steps in this section on automating the install of eslint configuration files. After you have read and performed the steps outlined in this section, you can often get back to the assignment that linked you here by pressing the back button. You don't need to read through the entire assignment unless you are interested._

## Video

TLDR: This very short video may be useful:

<iframe width="560" height="315" src="https://www.youtube.com/embed/e0gu4ekdjjo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This 15 minute video covers some of the same material discussed in this assignment in more depth. Most of what you need to know is in the first 5 to 8 minutes of the video:

- [Using ESLint and Prettier to Lint and Format Project Files][epv]

## Install Globally

I now think there is value in installing these globally, and not just on a per-project basis. If you want to install it globally, try these commands:

```nohighlighting
npm i -g eslint
npm i -g eslint-plugin-react
npm i -g eslint-plugin-requirejs
npm i -g babel-eslint
npm i -g eslint-plugin-react-hooks
npm i -g eslint-plugin-flowtype
npm i -g eslint-plugin-import
npm i -g eslint-plugin-jsx-a11y
```

Read here [for more details](https://www.npmjs.com/package/eslint).

In fact, let's do this:

```nohighlighting
npm -g install eslint eslint-config-airbnb-base eslint-config-fortech-react eslint-config-react-app eslint-plugin-flowtype eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
```

Or, run the script found in the [TLDR EsLint video][jsoesl].

## Alternative Local Installation

Alternatively, you can install these packages locally:

```
npm install --save-dev eslint
npm install --save-dev eslint-plugin-react
npm install --save-dev babel-eslint
```

Or:

```
npm install --save-dev eslint eslint-plugin-react babel-eslint
```

If you do this, then you need to type something like this to reach eslint or prettier:

```bash
./node_modules/.bin/eslint .
```

It's probably simpler to install them globally, but there are good reasons for each approach.

## RC File

My **.eslintrc** file is maintained here:

- [Charlie's ESLint Gist][ceslg]

This is the same file discussed in the [Get Gist][gg] assignment. Take the time to become familiar with the file and the syntax found in the **.eslintrc** file.

## Arrow Functions

I'm not clear about this. Set "parser": "babel-eslint" in **.eslintrc** to allow arrow functions.

## Run from command line

Assuming your ES6 code is in project tree, do one of these, where the first is for the global install, and the second is for the local install:

```bash
$ eslint .

OR:

$ ./node_modules/.bin/eslint .
```

Also, consider putting it in your **package.json** file in the **scripts** section. For instance you might write something like this in one of your **package.json** files:

```javascript
"scripts": {
    "start": "DEBUG=firebase-express:server nodemon ./bin/www",
    "bundle": "node_modules/.bin/webpack --watch",
    "lint": "./node_modules/.bin/eslint ."
},
```

When I ran **npm run lint**, it worked, but NPM reports an error until I get all the eslint errors and warnings out of my code. Then it returns cleanly. Before that, I see the results of my tests, but NPM reports an error

## Add .eslintignore

Add a file called **.eslintignore** so that eslint does not try to parse files that we did not create. For instance, your file might have this content:

```bash
**/registerServiceWorker.js
**/bundle.js
```

## Fix

Often you can automatically fix errors in your code like this:

```bash
eslint --fix .
```

For instance, I run eslint and get multiple errors, then I run **eslint . --fix** and it afterwards eslint comes back clean:

```
charlie@rohan-mintc ~/Git/isit322-calvert-2018/GitExplorer (Week06-Charlie)
$ eslint .

/home/charlie/Git/isit322-calvert-2018/GitExplorer/client/src/components/App.js
  11:1  error  Expected indentation of 4 spaces but found 0  indent

/home/charlie/Git/isit322-calvert-2018/GitExplorer/git-convert/git-test-create.js
  39:17  warning  Strings must use singlequote  quotes
  39:65  warning  Strings must use singlequote  quotes
  49:17  warning  Strings must use singlequote  quotes
  51:21  warning  Strings must use singlequote  quotes

✖ 5 problems (1 error, 4 warnings)
  1 error, 4 warnings potentially fixable with the `--fix` option.

charlie@rohan-mintc ~/Git/isit322-calvert-2018/GitExplorer (Week06-Charlie)
$ eslint . --fix
charlie@rohan-mintc ~/Git/isit322-calvert-2018/GitExplorer (Week06-Charlie)
$ eslint .
charlie@rohan-mintc ~/Git/isit322-calvert-2018/GitExplorer (Week06-Charlie)
```

## Case Statements

I was having trouble with case statements and recently updated the [gist] file eslintrc.json to include this code:

```javascript
"indent": ["error", 4, {"SwitchCase": 1}],
```

The little **SwitchCase** object literal seems to have solved the problem. I hope.

## WebStorm

In WebStorm, turn on ESLint.

    File | Settings | Languages and Frameworks | JavaScript | Code Quality Tools

My current thinking is that we should use EsLint, and EsLint only, to lint our React programs. You can, therefore, turn off JsHint and JSCS. You only need to be running ESLint.

## Prettier

For help formatting files, I'm moving from [js-beautify][jsbea] to [prettier][pret]. The first time we use it, we need to be sure it is installed. Once we have installed it, it stays installed. So we need to run one of these commands only once:

```bash
npm install --global prettier
```

Install with yarn:

```bash
yarn global add prettier
```

**NOTE**: _When installing npm packages globally, use NPM rather than yarn. If you really want yarn, make sure the place that yarn puts them is on your path. I've already set things up on Pristine Lubuntu so that npm global packages are on your path. See the bottom of **~/.bashrc** for details. I like yarn, but it is just too confusing to have some of the class on yarn and some on npm. So we are standardizing on npm. It is not wrong to use yarn, but you are on your own if you do so._

You can set up a configuration file called **.prettierrc** in the root of your project or repository:

```javascript
{
    "tabWidth": 4,
    "singleQuote": true
}
```

We run [prettier][pret] to clean up the format of our files before we turn in an assignment. We don't want to run it on all files in our project. For instance, we don't want to format the files in **node_modules** since we don't own them.

To ensure we operate on only the files we want to format, create a script called **prettier** like this:

```bash
#!/bin/bash

find . -iname "*.js" \
  -not -path "**/node_modules/**" \
  -not -path "**/bower_components/**" \
  -not -path "**/bundle.js" \
  -not -path "**/registerServiceWorker.js" \
  -exec "prettier" --write {} \;
```

Make it executable:

```bash
chmod +x prettier
```

Call it like this:

```bash
./prettier
```

If you want more, see also [FindNpPrettier][fnpp] in JsObjects. You can install that script with these commands:

```bash
slb
./CreateSymbolicLinks
```

See the [CreateSymbolicLinks][csl] script on GitHub.

- [prettier][prettier]
- [prettierrc][prettierrc]

See this note on [js-beautify](./JsBeautifyDepricated.html)

## Turn it in

Just point me a current project which fulfills the requirements. For instance the **ElfExpressSimple** assignment linked near the top of this document. Almost any assignment will do, so long as it has ESLint and Prettier coming back clean. When I open it, I'll expect to see a **.eslintrc.json** and **prettier** files and have most of the files error free in terms of eslint errors and **prettier** formatting.

## Getting Yarn's Global Bin Directory on your PATH {#yarn-global}

As mentioned earlier, I find it too confusing to try to teach yarn and npm at the same time, though they perform similar tasks in a similar manner. For now, I suggest we all just stick with **npm**. If you want to use yarn, that is not wrong, but you are on your own. That said, I'll continue to include this section for those who are interested.

On Pristine Lubuntu, I long ago made sure that **~/npm/bin** is on the path. Therefore globally installed NPM packages are available to everyone. I have not, however, yet set up **yarn's** global directory to be on the path.

- [https://github.com/yarnpkg/yarn/issues/2049](https://github.com/yarnpkg/yarn/issues/2049)

So I guess what we want on the path is the directory I list here:

```bash
charlie@CedarIsle**:~/.config/yarn/global/node_modules/.bin**  
$ ll  
total 0  
drwxrwxrwx 1 charlie charlie 512 May 10 11:11 ./  
drwxrwxrwx 1 charlie charlie 512 May 10 11:11 ../  
lrwxrwxrwx 1 charlie charlie 18 May 10 11:11 bower -> ../bower/bin/bower*  
lrwxrwxrwx 1 charlie charlie 28 May 10 11:11 create-react-app -> ../create-react-app/index.js*  
lrwxrwxrwx 1 charlie charlie 37 May 10 11:11 css-beautify -> ../js-beautify/js/bin/css-beautify.js*  
lrwxrwxrwx 1 charlie charlie 39 May 10 11:11 express -> ../express-generator/bin/express-cli.js*  
lrwxrwxrwx 1 charlie charlie 38 May 10 11:11 html-beautify -> ../js-beautify/js/bin/html-beautify.js*  
lrwxrwxrwx 1 charlie charlie 36 May 10 11:11 js-beautify -> ../js-beautify/js/bin/js-beautify.js*  
lrwxrwxrwx 1 charlie charlie 25 May 10 11:11 nodemon -> ../nodemon/bin/nodemon.js*  
lrwxrwxrwx 1 charlie charlie 21 May 10 11:11 npm -> ../npm/bin/npm-cli.js*  
lrwxrwxrwx 1 charlie charlie 21 May 10 11:11 npx -> ../npm/bin/npx-cli.js*
```

We should, therefore, add this near the bottom of our **~/.bashrc**:

```bash
#Yarn Support

set-system-path "$HOME/.config/yarn/global/node_modules/.bin"
```

Here is **set-system-path**, which should already be in your **.bashrc**:

```bash
set-system-path () {  
  if ! echo "$PATH" | /bin/grep -Eq "(^|:)$1($|:)" ; then  
    export PATH="$1:$PATH"  
  fi  
}
```

That seems to be working for me, so I've added it in JsObject for future generations.

**NOTE**: _You might be in one of those generations, so perhaps this has already been done for you._

Check whether your apps are installed for Yarn (**.config/yarn/global/node_modules/**) or npm (**~/npm/node_modules**)?

Which is on your path? If you type **which eslint** what comes up? Here is how it looks for me:

```bash
$ which eslint
/home/charlie/npm/bin/eslint
```

That means I'm running the NPM install of **eslint**, not the yarn install of **eslint**. Therefore, something like **babel-eslint** should be installed in with npm. Alternatively, uninstall the npm version of **eslint**.

## Use ncu

Right now applications genearted with **create-react-app** are generating a lot of warnings about vulnerabilities that it appears there is no way to avoid. Leaving those issues aside, try this:

- Run **ncu** (npm) to see what is out of date.
- Run **ncu -u** to update package.json to the latest.
- Delete **node_modules**. Delete package-lock.json.
- Run **npm install** (npm i) again and see if things are better now that you have all the latest packages installed.

See this output from my machine:

```code
$ ncu
Checking /media/charlie/elfdisk/Git/CloudNotes/package.json
[====================] 1/1 100%

 ssh2  ^0.6.1  →  ^0.8.2

Run ncu -u to upgrade package.json
charlie@elf-path:~/Git/CloudNotes$ (master)
$ ncu -u
Upgrading /media/charlie/elfdisk/Git/CloudNotes/package.json
[====================] 1/1 100%

 ssh2  ^0.6.1  →  ^0.8.2

Run npm install to install new versions.
```

If I look in **package.json** I see that ssh2 is now at **0.8.2**:

```javascript
"dependencies": {
    "ssh2": "^0.8.2"
}
```

<!--       -->
<!-- links -->
<!--       -->

[ceslg]: https://gist.github.com/charliecalvert/c5952541925c04479150bbd8c40feac6
[epv]: https://youtu.be/bsxBHLxYMrA
[gg]: /teach/assignments/git/GetGist.html
[jsbea]: https://github.com/beautify-web/js-beautify
[jsoesl]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/NodeInstall/EsLintInstall
[fnpp]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/Templates/FindScripts/FindNpPrettier
[csl]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/CreateSymbolicLinks
[pret]: https://github.com/prettier/prettier
[prettier]: https://gist.github.com/charliecalvert/f19ea847f81f8634b37ef2b9c12a77e0
[prettierrc]: https://gist.github.com/charliecalvert/2470c97a763ac6791e66f6cb7ff9ae23
