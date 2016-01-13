## Overview

Learn how to use NPM Publishing to put your code on NPM.

## Account

Go to NPM and create an account. You are going to have to use a public email address. As a result, you will probably want to go to Yahoo, Google, Microsoft or somewhere and create a trash account that you never intend to use.

**OPTIONAL**: *Go to Gravatar and add this trash address to your account so that you can have your picture published.*


## Log In

Once you have the account set up and verified, go to the command line and log in:

```bash
npm login
```

Just enter the user name and password that you just set up.

Verify that all is good by going to this site:

- <https://npmjs.com/~>

And by issuing this command:

```bash
npm config ls
```

## Create Your Package

Create a folder in your repository called NpmLastName where lastname is your name. Put a **package.json** file in your folder:

```
npm init
```

The **name** and **version** fields are required. For your name, add something like **lastname-code**, for instance, **calvert-code**. (Actually, my package is called **elven-code**, but for now, it would be simplest if you just used your last name so I can more easily grade and track your work.)

Put some code in your folder in a file called **index.js**:

```
exports.getPackageDescription = function() {
  console.log("This is Charlie Calvert's package");
}
```

You should, of course, put your name rather than mine in your package.

## Publish

The first time:

```bash
npm publish
```

The second time, you should increment either the major, minor or patch version number found in your package.json file. Your version number looks like this:

```javascript
 "version": "1.1.1"
```

The first number is the major number, the second the minor number and the third is a patch number:

- major.minor.patch
- 0.0.0

So if the major number is 3, the minor number is 2, and patch number is 1, then the version number is:

- 3.2.1

As a rule, we only increment a major version number when we publish a breaking change. The minor version number is usually for new features. The patch is when we publish a bug fix.

So, if we are about to publish a bug fix, we do this:

```
npm version patch
npm publish
```

By writing **npm version patch**, the patch portion of the version number in your **package.json** file is automatically incremented by one. You can also type **npm version minor** to increment the minor version number, and so on.

## Use Your Package

In your repository create a project:

```
CreateAllExpress Week02-NpmProject
```

Use your package:

```
npm install <mypackage> --save
```

From **routes/index.js** first **require** your package and then create a **get** method that sends the output from your **getPackageDescription** method back to your client. Display the string that is returned in an HTML paragraph tag.


## Turn it in

Submit your repository. I'll review the two new folders your created and test your code to be sure it works.