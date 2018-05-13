## Overview

We want to lint our code to see if it meets some basic requirements. The most important part is setting up [ESLint](https://eslint.org/) at the command line, but we also want it working WebStorm.

## Video

This 15 minute video covers some of the same material discussed in this assignment. Most of what you need to know is in the first 5 to 8 minutes of the video:

- [Using ESLint and Prettier to Lint and Format Project Files][epv]

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

## Getting Yarn's Global Bin Directory on your PATH {#yarn-global}

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

## RC File

And here is at least a starter **.eslintrc** file:

- [Charlie's ESLint Gist][ceslg]

To get the gist, or other related files discussed in this assignment, try running my script called [get-gist][gg].

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

## Turn it in

Just point me at your midterm, final, or current project. When I open it, I'll expect to see a **.eslintrc.json** file and have most of the files relatively error free in terms of eslint errors.

[ceslg]: https://gist.github.com/charliecalvert/c5952541925c04479150bbd8c40feac6

## Prettier

For help formatting files, I'm moving from [js-beautify][jsbea] to [prettier][pret]. The first time we use it, we need to be sure it is installed. Once we have installed it, it stays installed. So we need to run one of these commands only once:

```bash
npm install --global prettier
```

**NOTE**: _When installing npm packages globally, use NPM rather than yarn. If you really want yarn, make sure the place that yarn puts them is on your path. I've already set things up on Pristine Lubuntu so that npm global packages are on your path. See the bottom of **~/.bashrc** for details._

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

[gg]: http://www.ccalvert.net/books/CloudNotes/Assignments/Git/GetGist.html
[epv]: https://youtu.be/bsxBHLxYMrA
[jsbea]: https://github.com/beautify-web/js-beautify
[fnpp]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/Templates/FindScripts/FindNpPrettier
[csl]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/CreateSymbolicLinks
[pret]: https://github.com/prettier/prettier
[prettier]: https://gist.github.com/charliecalvert/f19ea847f81f8634b37ef2b9c12a77e0
[prettierrc]: https://gist.github.com/charliecalvert/2470c97a763ac6791e66f6cb7ff9ae23
