# React Basics

This chapter covers creating [React][re] program from scratch. We will create a React project from scratch. There are various tools that can automate the creation of React projects, but there is much to be learned by creating a project by scratch.

Here are some useful links:

- [Slides](http://bit.ly/react-basics)
- [github student](https://education.github.com/pack)

**NOTE**: _Students in my Isit320 and Isit322 classes should work in a branch called week01. Folks in Prog272 should work in the master branch and ignore the references to the **week01** branch._

## Summary

- Create **webpack.config.js**
- Install React, Webpack and Babel components
  - react and react-dom
  - babel core and babel loader
  - babel env, react
- Add bundle script to **package.json**. This is the script runs webback.

    cp $ELF_TEMPLATES/React/ReactNpm

## IDE

These days we are using Visual Studio Code. Several extensions are helpful:

- [ES7 React](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

## ReactBasics Directory

In a branch called **week01**, create a directory called **Week01-ReactBasics** in your repository and navigate into it:

```bash
git co -b week01 # create branch and check it out.
mkdir week01-react-basics && cd week01-react-basics
```

Notice the **&&** operator used to concatenate these two commands. This is a time saver as it allows you to issue two commands on a single line rather than writing something like this:

```
mkdir week01-react-basics
cd week01-react-basics
```

**NOTE**: _Try to use your common sense as to the week name. I'm assuming here that we are in Week One, or at least near it, but if that makes no sense, then choose an appropriate week name._

## NPM Init

The next step is to create a **package.json** file. This file tracks the dependencies for your project. Most node projects depend on various libraries. Thus you typically need to create a **package.json** file to help you manage these dependencies.

To create **package.json**, run this command and respond to the prompts it creates:

```
npm init
```

When prompted for input after running **npm init**, respond like this but with your own details:

```
name: react-basics
version: (1.0.0)
description: react basics examples
entry point: (index.js) main.js
test command:
git repository: https://github.com/charliecalvert/JsObjects.git
keywords: react
author: Charlie Calvert
license: (ISC) MIT
```

In general, there is no "wrong" way to respond to the prompts. You can just accept the defaults if you want. That usually will not put you in an error condition. However, it makes sense to fill in the prompts as best you can, so long as you don't make too big a production out of it.

When you have completed filling in the prompts, you can **cat** the contents of your new file:

```
cat pacakge.json
```

This gives you a chance to review your new **package.json** file and gain at least a passing understanding of its contents. For instance, I see the following after issuing the command:

```json
{
  "name": "week01-reactbasics",
  "version": "1.0.0",
  "description": "React Basics",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "React"
  ],
  "author": "Charlie Calvert",
  "license": "MIT"
}
```

**NOTE**: _Ultimately you should know and understand your **package.json** as completely as possible. However, it is possible to work with them for awhile without performing the complete mind meld that is your ultimate goal. If you want more information, follow the links below._

- [Elven Node Packages](http://www.elvenware.com/charlie/development/web/JavaScript/NodePackages.html)
- [Search for information on package.json](https://www.google.com/search?q=package.json)

## Create

At this stage you need to start installing the libraries that your React project will depend on. The installed libraries will be placed in a directory called **node_modules**. A reference to these libraries will be placed in **package.json**. Because **package.json** keeps track of the libraries you depend on, it is possible to reinstall the libraries by typing **npm install**. This command processes the entries in **package.json** and ensures that the correct version of each library is installed.

**NOTE**: _You will usually need to run **npm install** when you move a project to a new machine. Frequently, you copy only the source files, and not the libraries themselves when you move a project from one location to another. As a result, you need to run **npm install** to recreate the **node_modules** directory and populate it with the libraries on which your project depends._

To install the libraries that our project needs, run these commands:

```bash
npm install --save react react-dom
npm install --save-dev webpack webpack-cli
npm install --save-dev babel-loader webpack-dev-server
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react
npm install --save-dev @babel/core @babel/cli
```

**npm** is the Node Package Manager, and it can be used to install packages (libraries) and to perform other tasks such as running tiny scripts that start your project. **node** and **npm** and tightly linked tools which depend on one another. When you install node, npm is also installed. It is hard to do much with node without also running the **npm** command at least once.

After running the **npm install** commands shown above, you will find new content in your **package.json** file. Your file should differ from mine in the details, but should be similar in content. In particular, look for the **dependencies** and **devDependencies sections**:

```json
$ cat package.json
{
    "name": "react-basics",
    "version": "1.0.0",
    "description": "React from scratch",
    "main": "ReactBasics.js",
    "scripts": {
        "start": "node_modules/.bin/webpack-dev-server --port=30025 --mode=development",
        "build": "node_modules/.bin/webpack",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "Charlie Calvert",
    "license": "MIT",
    "dependencies": {
        "react": "^16.5.2",
        "react-dom": "^16.5.2"
    },
    "devDependencies": {
        "@babel/core": "^7.1.0",
        "@babel/preset-env": "^7.1.0",
        "@babel/preset-react": "^7.0.0",
        "@babel/register": "^7.0.0",
        "babel-loader": "^8.0.2",
        "webpack": "^4.19.1",
        "webpack-cli": "^3.1.0",
        "webpack-dev-server": "^3.1.8"
    }
}
```

The **dependencies** object contains properties designating the files your project depends on at runtime. The **devDependencies** object contains properties listing the libraries you need to test or create your project. They can also be used to perform other developer related tasks covered in other assignments. The point being that your project won't run without the libraries in the **dependencies section**. The **devDependencies** section lists libraries that you, as a developer, rely upon.

Notice that the files I installed with the **--save** switch ended up in the **dependencies** object, while those with the **save-dev** switch ended up in the **devDependencies** section. The funny numbers next to entry entry are version numbers. The wonky hat (^) means that our project is looking for the specified version or higher.

## The Scripts Section

Now edit the **scripts** section of **package.json** so that it looks like this:

```javascript
"scripts": {
   "start": "node_modules/.bin/webpack-dev-server --port=30025 --mode=development",   
   "build": "node_modules/.bin/webpack",
   "test": "echo \"Error: no test specified\" && exit 1"
},
```

This section of the **package.json** file defines the various commands you can run in order to perform operations such as starting your project. Note that we are starting on port 30025.

You can run the **start** and **test** scripts like this:

```
npm start
npm test
```

To run the build script, issue a command of this form:

```
npm run build
```

The point here is that **test** and **start** are scripts that **npm** expects you create. But **npm** gives you the ability to create other random scripts. If you want to run one of these random scripts, then use **run**.

**NOTE**: _I'm over simplifying more than a bit here. To get a sense of the power inherit in the scripts object, see the link below:_

- [Scripts in Package.json](https://docs.npmjs.com/misc/scripts)

## React

We are, at last, through with the setup. We can now proceed to write some code. In particular, we will create a file called **ReactBasics.js**. In that file we should:

- **import** the react library on which our code depends.
- Create a simple react component that will display a line of text in an **h1** tag.
- **export** the component from the module in which it is created.

For now, you can just think of a module as a file. There is more to the subject than that. In particular, modules help you to create discrete reusable components or arbitrary chunks of code that do not pollute the global name space. However, you don't need to understand exactly what that means quite yet. Ultimately, however, you need to perform the same kind of mind-meld with modules that you need to perform with **package.json** and the **npm** command.

```javascript
  import React from 'react';

  export default class ReactBasics extends React.Component {
     render() {
         return <h1>An H1 element in a React Component</h1>;
     }
  }
```

If you are familiar with JavaScript as it has been written for the last twenty years than you will be forgiven if you assume that you have accidentally started reading the wrong assignment. Almost nothing in the above code looks like JavaScript as it appeared before EcmaScript 6 (ES6) was developed. Among the new features shown here are:

- The import and export keywords
- The class keyword
- And that funny looking HTML which doesn't look at all like valid JavaScript

I'll talk about import and export below. The class keyword is new to ES6, but it is unlikely that anyone is going to have trouble understanding what it does. We are all familiar with classes. For those with a good background in JavaScript, you can think of it as a shorthand way of defining the **module** pattern.

## JSX

If we dismiss **import, export** and **class** then the remaining anomaly in the code is the HTML like syntax. As expected, this is not valid JavaScript. Instead, it is a special syntax called JSX that is similar to, but not identical too, HTML. We will learn more about the relatively minor differences between JSX and HTML in some other assignment.

JavaScript compilers do not understand JSX. However, we earlier installed a tool called Babel. You can run Babel over your code to transform the JSX HTML-like syntax into valid JavaScript code. In particular, it creates code that might look something like this:

```javascript
react.createElement('h1', null, 'An H1 element in a React Component');
```

This is valid JavaScript. In short, the JSX found in your files in converted into JavaScript by a tool called babel. JSX allows you to write an HTML like syntax in JavaScript. It is a separate project from React, but is closely linked to it.

- [JSX Home Page](http://facebook.github.io/jsx/)

Babel: An Aside {#babel-aside}

If you want to see babel in action, follow these steps.

We have already put the **@babel-cli** in our **node_modules/.bin**.

Now create a **.babelrc** file with this content:

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

Finally, run Babel over your code:

```
npx babel react-simple.js
```

The output, at the time of this writing, looks like this:

- [React Code in ES5 Created by Babel](https://gist.github.com/charliecalvert/07a46885d20db9b876d2763e72020ddf)

In particular, note that the object created from our class looks like this:

```javascript
var ReactBasics = function (_React$Component) {
   _inherits(ReactBasics, _React$Component);

   function ReactBasics() {
      _classCallCheck(this, ReactBasics);

      return _possibleConstructorReturn(this,
        (ReactBasics.__proto__ ||
           Object.getPrototypeOf(ReactBasics)).apply(this, arguments));
   }

   _createClass(ReactBasics, [{
      key: 'render',
      value: function render() {
         return _react2.default.createElement(
            'h1',
            null,
            'An H1 element in a React Component'
         );
      }
   }]);

   return ReactBasics;
}(_react2.default.Component);
```

What's going on here? This is our ES6 code translated (aka transpiled) by babel into ES5. This is done because the current implementations of JavaScript in most browsers are not entirely ready to handle ES6 code at this time. They are, in fact, very nearly ready, but we are not quite there yet. The recent versions of the node compiler, however, can handle almost all the ES6 syntax. Therefore, if this were server side code, there would be little reason to translate it into ES5.

In this particular project, why don't we explicitly run Babel over our code when we start it? In other words, why don't we see a script in **package.json** for running Babel:

```json
"scripts": {
  "start": "node_modules/.bin/webpack-dev-server --port=30025",
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "node_modules/.bin/webpack"
},
```

As you have probably guessed, the **build** script runs webpack, and webpack runs babel for us. More on that later in this assignment.

## Import and Export

By default, each file in a React project is in its own module and is entirely invisible to all other objects. It leaks nothing.

If you want to make part of a file visible to one other file, then export the part you want to make visible and import it in another file.

```javascript
export default class ReactBasics extends React.Component {}
```

## Render HTML with JSX Code

Most React projects consist of multiple components. This means we often want to create a single file that joins our components together. In our case, we are only going to need to reference one component, nevertheless, I will still create a simple version of the file used to combine one or more components into a single HTML page or HTML page fragment. We can call this file **main.js**:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ReactBasics from './ReactBasics';

ReactDOM.render(
  <ReactBasics/>,
  document.getElementById("root")
);
```

## HTML File

We create an HTML file called **index.html**. Here is **index.html**:

```html
<!doctype html>
<html>
 <head>
   <meta charset="UTF-8">
   <title>React Basics</title>
 </head>
 <body>
   <div id="root"></div>
   <script src="bundle.js"></script>
 </body>
</html>
```

Our HTML has a **DIV** element with an **ID** of **root**. It also loads a file called **bundle.js**, which will be autogenerated from our JavaScript and CSS sources. The **bundle.js** JavaScript file contains all the code for our project, including the CSS. It is created from our source files by a utility called webpack. I explain how to create it later in this chapter.

## The main File

Here is how we link the **ReactBasics.js** page from the previous sections into a file called **main.js**. We then display **ReactBasics** on our HTML form by attaching it to the **DIV** element with an **ID** of root.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ReactBasics from './ReactBasics';

ReactDOM.render(
  <ReactBasics/>,
  document.getElementById('root')
);
```

## Transpiling with Webpack

We write some of our code using ES6 and JSX syntax. JSX and ES6 won't run in many browsers. We use Babel to convert ES6 and JSX code to ES5 code.

We use webpack to help us bundle it into a single file or small set of files. This is called transpiling. We transpile our JSX and ES6 code into ES5 code.

On the next section, you will see a webpack configuration file

## Webpack Configuration

Save the following code in: webpack.config.js. Note that entry is **main.js** and output is **bundle.js**.

```javascript
module.exports = {
    mode: 'development',
    entry: './main.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /.js?$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader'
                }]
            }
        ]
    },
};
```

Though not recommended, in lieu of using our **.babelrc** file, we can create a **module** section that looks like this:

```javascript
module: {
    rules: [
        {
            test: /.js?$/,
            exclude: /(node_modules|bower_components)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }]
        }
    ]
},
```

Here we include the presets in **webpack.config.js** in the **options** property of the first object in our **use** array. Thus we can delete **.babelrc**.

Both techniques are common. There are advantages to both techniques. It is nice to not have to have one file instead of two, which gives a vote to **options** section in **webpackage.config.js**. Note however, that without **.babelrc** you can't run Babel directly against our code; we _have to_ use webpack to transpile the code or jump through some other hoop like a command line option. If you do decide to do that, then you should delete or rename or **.babelrc**. All this is typical: there are trade-offs and we have to weigh each option and make a decision. For now, I vote to skip the **options** section and go with **.babelrc**, but I admit there are good arguments on both sides.


## Run Your Code

To start your project, type **npm start**. Now browse to:

http://localhost:30025/

Optionally issue this command at the command prompt to check your work:

  node_modules/.bin/webpack

That should be the same as **npm run build**.

The equivalent of **npm start** looks like this:

  node_modules/.bin/webpack-dev-server

Compare the commands above to the all important and oft mentioned **scripts** section in package.json:

```json
"scripts": {
  "start": "node_modules/.bin/webpack-dev-server --port=30025 --mode=development",
  "build": "npx webpack"
},
```

**NOTE**: _You can append the webback-dev-server line above to your build script in package.json. Use &&: command1 && command2._

## Function Components {#stateless_code}

Function components can provide the same functionality as above, but with very clean, sparse, syntax.

Create a new file called **ReactBasicsFunctionComponent.js** and insert into it the code the shown below.

```javascript
import React from 'react';

export const ReactBasicsFunctionComponent = () => (
   <h1>An H1 element in a React Function Component</h1>
);
```

Compare this code to the code in **ReactBasics.js**.

**NOTE**: _The proper name for these types of components is **function component**. I have at times called them stateless components, since they often do not have state. However I am trying to switch to calling them function components per [this document][fc]._

These are two ways of saying the same thing. Pick the way that you prefer.

Here is another example of using two ways to same thing:

```javascript
import React from 'react';

const ReactBasicsFunctionComponent = () => (
    <h1>An H1 element in a React Function Component with fat arrow</h1>
);

function FunctionComponentReturn() {
    return(
        <h1>An H1 element in a React Function Component with return</h1>
    );
}

export { ReactBasicsFunctionComponent, FunctionComponentReturn };
```

We could then do this to render all three components:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ReactBasics from './ReactBasics';
import { FunctionComponentReturn, ReactBasicsFunctionComponent } from "./ReactBasicsFunctionComponent";

ReactDOM.render(
    <React.Fragment>
        <ReactBasics/>
        <FunctionComponentReturn/>
        <ReactBasicsFunctionComponent/>
    </React.Fragment>,
    document.getElementById("root")
);
```
## Link in Function Components

Modify **main.js** by removing the reference to **ReactBasics.js** and replacing it with a reference to **ReactBasicsFunctionComponent.js**.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactBasicsFunctionComponent } from './ReactBasicsFunctionComponent.js';

ReactDOM.render(<ReactBasicsFunctionComponent/>, document.getElementById('root'));
```

Now compile and run as shown earlier.

## js-beautify

Don't do this section. We will use prettier instead.

The file is called **.jsbeautifyrc**. The first option shown below tells js-beautify to leave JSX alone, the second tells it to leave import statements alone when they contain inline curly braces:
import { ReactBasics } from '../ReactBasics.js';

```json
{
  "e4x": true,
  "brace_style": "collapse-preserve-inline"
}
```

## Turn it in

Git add, commit and push your work. It should be on a branch called **week01**:

```
git branch week01
git co week01
```

Create a tag:

```
  git tag -a v1.0.1 -m "React Basics turned in."
  git push origin v1.0.1
```

Use a numbering system that makes sense in the context of your repository. For instance, if you already have v1.0.1 then use v1.0.2 or whatever is appropriate and so on. Use your common sense.

## Arrow Functions

Set "parser": "babel-eslint" in .eslintrc to allow arrow functions.

## jQuery and Webpack {#jquery-webpack}

To use **jQuery** with webpack.

```bash
npm install jquery
```

Then add this to **weback.config.js**:

```javascript
plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
]
```

## Create Source Directory

If you don't have one already, it sometimes useful to create a directory called **Source** outside of your repository. I use this as a place to work on projects that I don't want to immediately commit to my repository, but which I also would like to keep around for one reason or another. I typically place the **Source** directory in the route of my **home** directory:

```
mkdir ~/Source   // If this command fails, its okay.
cd ~/Source
```

The first command will fail if the **~/Source** directory already exists:

```
$ mkdir ~/Source
mkdir: cannot create directory ‘/home/charlie/Source’: File exists
```

You can ignore errors of that type, and proceed to navigate to the Source directory:

```
cd ~/Source
```

You can now create projects in this directory that you want to keep at least for awhile without committing to a repository.

<!--       -->
<!-- links -->
<!--       -->

[re]: https://reactjs.org/
[fc]: https://reactjs.org/docs/components-and-props.html

Copyright (c) 2019 by Charlie Calvert
