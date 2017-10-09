## Overview

Learn how to use NPM Publishing to put a library of your code on NPM.

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

Just enter the user name and password that you just set up.

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

The **name** and **version** fields are required. For your name, use only small letters. Add something like **isit322-lastname**, for instance, **isit322-calvert**. (Actually, my package is called **elven-code**, but for now, it would be simplest if you just used your last name so I can more easily grade and track your work.)

Put some code in your folder in a file called **index.js**:

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

Take together, the the major, minor and patch portions of your version number look like this: **1.2.3**. The first number is the major number, the second the minor number and the third is a patch number:

- major.minor.patch
- 0.0.0

So if the major number is 3, the minor number is 2, and patch number is 1, then the version number is:

- 3.2.1

The versioning system described here is captured in a standard called [semver](http://semver.org/). It is very wildly used and is something that you, as a developer, should understand.

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

Use your package:

```
npm install <mypackage> --save
```

From **routes/index.js** first **require** your package and then create a **get** method in routes/index.js that sends the output from your **getPackageDescription** method back to your client. Create a method on the client that uses **fetch**. That method should retrieve the value from the server and display it. You can display the string that is returned in an HTML paragraph tag.

On the server side, here is how to add code to the top of **routes/index.js** to use the function found in your package:

```javascript
const getPackageDescription  = require('isit322-calvert');
```

Now just create a route that calls this method and returns (sends) the result to the client when it receives the appropriate request.

## Turn it in

Submit your repository. I'll review the two new folders your created and test your code to be sure it works. I'm expecting to see two folders:

- **Week03-NpmProject**
- **NpmLastName**. For instance, **NpmCalvert**

When I run **Week03-NpmProject** I'm expecting to see output from your package in the browser.
