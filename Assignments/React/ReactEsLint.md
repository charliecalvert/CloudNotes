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

## WebStorm

In WebStorm, turn on ESLint.

    File | Settings | Languages and Frameworks | JavaScript | Code Quality Tools

My current thinking is that we should use EsLint, and EsLint only, to lint our React programs. You can, therefore, turn off JsHint and JSCS. You only need to be running ESLint.

## Turn it in

Just point me at your midterm, final, or current project. When I open it, I'll expect to see a **.eslintrc.json** file and have most of the files relatively error free in terms of eslint errors.

[ceslg]: https://gist.github.com/charliecalvert/c5952541925c04479150bbd8c40feac6

## Prettier

For help formatting files, I'm moving from [js-beautify][jsbea] to [prettier][pret]. The first time we use it, we need to be sure it is installed. Once we have installed it, it stays installed. So we need to run one of these commands only once:

```bash
yarn global add prettier
npm install --global prettier
```

You can set up a configuration file called .prettierrc in the root of your project or repository:

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

find . -iname "*.js" -not -path "**/node_modules/**" -not -path "**/bower_components/**" -not -path "**bundle.js" -not -path "registerServiceWorker.js" -exec "prettier" --write {} \;
```

Make it executable:

```bash
chmod +x prettier
```

Call it like this:

    ./prettier

If you want more, see also [FindNpPrettier][fnpp] in JsObjects. You can install that script with these commands:

```bash
slb
./CreateSymbolicLinks
```

See the [CreateSymbolicLinks][csl] script on GitHub.

## Beautify Files

I'm moving from [js-beautify][jsbea] to [prettier][pret], but don't quite want to delete this section yet. Use **prettier** instead of js-beautify because it handles JSX much better.

Before we had prettier, we used js-beautify, but not on all files in a directory. Create a script called **pretty** like this:

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

[pret]: https://github.com/prettier/prettier

[jsbea]: https://github.com/beautify-web/js-beautify

[fnpp]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/Templates/FindScripts/FindNpPrettier

[csl]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/CreateSymbolicLinks
