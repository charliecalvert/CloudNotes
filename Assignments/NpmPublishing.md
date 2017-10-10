## Overview

The goals of this assignment are to:

- Learn how to publish a library of your code on NPM.
- Integrate React components into an Express based client.

![The Interface][client-view]

## Account

Go to the [NPM](https://www.npmjs.com/) website and create an account.

**NOTE**: _At some point in this process you are going to be asked for a public facing email account. They will tell you explicitly that the email they want you to enter is public facing. When they do that, you might want to go to Yahoo, Google, Microsoft or somewhere and create a trash account that you never intend to use._

**OPTIONAL**: *Go to Gravatar and add this trash address to your account so that you can have your picture published.*

## Log In

Once you have the account set up and verified, go to the command line and log in:

```bash
npm login
```

That should be all you have to do. Sometimes it takes a long time to log in. If the login process does not go smoothly the first time, you may have to also use this command:

```bash
npm adduser
```

When run, **adduser** asks you to enter the user name and password that you just set up.

Verify that all is good by going to this site:

- <https://npmjs.com/~>

And by issuing this command:

```bash
npm config ls
```

## Create Your Package

Create a folder in your repository called **NpmLastName** where LastName is your last name. Put a **package.json** file in your folder:

```
npm init
```

The **name** and **version** fields are required. For your name, use only small letters. Add something like **isit322-lastname**, for instance, **isit322-calvert**.

Put the following code in a file called **index.js**:

```
exports.getPackageDescription = function() {
  return "This is Charlie Calvert's package";
}
```

You should, of course, put your name rather than mine in your package.

## Publish

After you have created a library that you and others can use, you will need to publish it to the NPM website so that others can use it. The first time you do this all you need to do is type:

```bash
npm publish
```

The second time, and each time thereafter, the process is a bit more complicated. You will need to first increment the version of your package. The version information is found in **package.json**, usually near the top:

```javascript
"version": "1.2.3",
```

The version number has three parts:

- major (The 1 in the example above: 1.X.X)
- minor (The 2 in the example above: X.2.X)
- patch (The 3 in the example above: X.X.3)

Taken together, the major, minor and patch portions of your version number look like this: **1.2.3**. The first number is the major number, the second the minor number and the third is a patch number:

- major.minor.patch
- 0.0.0

So if the major number is 3, the minor number is 2, and patch number is 1, then the version number is:

- 3.2.1

**NOTE**: _The versioning system described here is captured in a standard called [semver](http://semver.org/). It is very widely used and is something that you, as a developer, should understand._

As a rule, we only increment a major version number when we publish a breaking change. The minor version number is usually for new features. The patch is when we publish a bug fix.

So, if we are about to publish a bug fix, we do this:

```
npm version patch
npm publish
```

By writing **npm version patch**, the patch portion of the version number in your **package.json** file is automatically incremented by one. For instance, **1.2.3** becomes **1.2.4**. You can also type **npm version minor** to increment the minor version number, and so on.

## Use Your Package

In your repository create a project:

```
CreateAllExpress Week03-NpmProject
```

Working from the root of your new project, take steps to use, to integrate, your package into your new project. The following code will install your package into **node_modules**, thereby making it available to your project:

```
npm install <mypackage> --save
```

From **routes/index.js** first **require** your package and then create a **get** method that sends the output from your **getPackageDescription** method back to your client. On the server side, place this code near the top of **routes/index.js**:

```javascript
const getPackageDescription  = require('isit322-calvert');
```

This code imports the sole function exported from your package for use in your project. Base the code that that sends the package description to the client on the server side code you created for the **RestBasics** assignment:

- [See the foo route from api.js][foo-route]

In this case you can set the route to **packageInfo** and put the method you create in **routes/index.js**:

```javascript
router.get('/package-info', function(request, response) { ... })
```

## Client side

Create a method on the client that uses **fetch**. That method should retrieve the value from the server and display it. You can display the string that is returned in an HTML paragraph tag.

Base your work on the **App.js** component from **RestBasics**.

[Use **fetch** to call the **/api/foo** route][api-foo]

## Link in React

The main issue we are facing here is our combination of the standard "old school" express app and the modern React code. We have, however, faced this kind of problem before. In Week01, we worked through the ReactBasics assignment. In that lesson, we learned how to use **WebPack** and **Babel** to transpile ES6 code into ES5:

- [Transpile with WebPack][trans-pack]

At some point, you are going to have to absorb how WebPack works, but for now I will give you some hints. I've placed the React component in **/public/javascripts/GetPackageInfo.js**:

```javascript
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './public/javascripts/GetPackageInfo.js',
    output: {path: __dirname, filename: './public/javascripts/bundle.js'},
    module: {
        loaders: [
            {
                test: /GetPackageInfo.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {presets: ['env', 'react']}
            }
        ]
    },
};
```

There are other steps you will need to take, but they are all outlined in the **ReactBasics** assignment. In quoting the code above, I just wanted to provide some help with three properties from **webpack.config.js**:

- **entry**: This is the first, and in our case only, file that contains ES6 that needs to be transpiled.
- **output**: Where to put the transpiled code
- **module.loaders.test**: Tell WebPack and Babel which file or files need to be processed to create our package.

## Turn it in

Submit your repository. I'll review the two new folders your created and test your code to be sure it works. I'm expecting to see two folders:

- **Week03-NpmProject**
- **NpmLastName**. For instance, **NpmCalvert**

When I run **Week03-NpmProject** I'm expecting to see output from your package in the browser.

[foo-route]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/RestBasics.html#routing-middleware
[api-foo]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/RestBasics.html#rewrite-the-client
[trans-pack]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactBasics.html#transpiling-with-webpack
[client-view]: https://s3.amazonaws.com/bucket01.elvenware.com/images/npm-publishing-client.png
