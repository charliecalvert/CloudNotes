## Overview

We want to lint our code to see if it meets some basic requirements. The most important part is setting up [ESLint](https://eslint.org/) at the command line, but we also want it working WebStorm.

## Project Folder

Install some stuff:

```
npm install --save-dev eslint
npm install --save-dev eslint-plugin-react
npm install --save-dev babel-eslint
```

Or:

```
npm install --save-dev eslint eslint-plugin-react babel-eslint
```

## Install Globally

I now think there is value in installing these globally, and not just on a per-project basis. If you want to install it globally, try these commands:

```nohighlighting
npm i -g eslint
npm i -g eslint-plugin-react
npm i -g eslint-plugin-requirejs
npm i -g babel-eslint
```

Read here [for more details](https://www.npmjs.com/package/eslint).

## RC File

And here is at least a starter **.eslintrc** file:

- [Charlie's ESLint Gist][ceslg]

## Arrow Functions

I'm not clear about this. Set "parser": "babel-eslint" in **.eslintrc** to allow arrow functions.

## Run from command line

Assuming your ES6 code is in project tree, do one of these, where the first is for the global install, and the second is for the local install:

```bash
    eslint .
    ./node_modules/.bin/eslint .
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

Add a file called .eslintignore so that eslint does not try to parse files that we did not create. For instance, your file might have this content:

```bash
**/registerServiceWorker.js
```

## Fix

Often you can automatically fix errors in your code like this:

```bash
eslint --fix .
```

## WebStorm

In WebStorm, turn on ESLint.

    File | Settings | Languages and Frameworks | JavaScript | Code Quality Tools

My current thinking is that we should use EsLint, and EsLint only, to lint our React programs. You can, therefore, turn off JsHint and JSCS. You only need to be running ESLint.

## Turn it in

Just point me at your midterm, final, or current project. When I open it, I'll expect to see a **.eslintrc.json** file and have most of the files relatively error free in terms of eslint errors.

[ceslg]: https://gist.github.com/charliecalvert/c5952541925c04479150bbd8c40feac6

## Beautify Files

We want to run js-beautify, but not on all files in a directory. Create a script called **pretty** like this:

```bash
find . -iname '*.js' | grep -vFf skip | xargs js-beautify -r
```

Where skip is a text file contents like this, which is a list of files or directories that you want to ignore:

```bash
bundle.js
registerServiceWorker.js
node_modules
```

These files might go in the root of a project or the root of your repository.

Alternatively, you could do this:

```bash
find . -iname *.js -type f -not -path '**/node_modules/**' -not -path '**/bundle.js' -not -path '**/registerServiceWorker.js' -print0 | xargs -0 js-beautify -r
```
