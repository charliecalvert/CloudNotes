## Overview

It is a take home, you will have about a week to do it. Check back for updates, which will be announced if they occur, but the basic plan is this:

## Goals

- Same app, same name, new tag and branch both labeled **midterm**
- Include a styled menu and component switching
  - Home (This is the GitUser view)
  - GetFoo
  - Numbers
- Make at least two more requests of GitHub API
  - Include in the menu
  - Switches between all three Git views (The one we have plus two more)
- Possible extra credit: Integrate git-convert into the code so it converts JSON to field-definitions automatically
- You should have at least fifty meaningful tests.
- Polish.

## JSCS

I couldn't figure out what was going on with JSCS earlier in the quarter, or perhaps WebStorm was broken with ES6 code. At any rate, something has changed either in my head or in the world.

You should now first make sure JSCS _**is turned on**_ in WebStorm. Go to **Settings | Languages and Frameworks | JavaScript | Code Quality Tools | JSCS** and make sure it is **enabled**.

Put this **.jscsrc** file in the root of your projects. Probably one for **client** and one for **server**:

```json
{
    "preset": "google",
    "validateIndentation": 4,
    "excludeFiles": ["**/node_modules/**", "**/bower_components/**"],
    "requireCamelCaseOrUpperCaseIdentifiers": false,
    "maximumLineLength": 120
}
```

Go to **Setting | Editor | Code Style | JavaScript**. On the Settings tab, in the first section, called **Before Parentheses**, set **In Function Expression** to false (unchecked). This means there should be no space after the word **function.**. Our code should look like this: **function() {}**. Not like this **function () {}**. Note the space after the word function in the second example.

JSCS should pass for your files. You can probably make this happen by choosing **Code | Reformat** in WebStorm, or by running the NPM package called **js-beautify**, which should be installed on your system in the global ~/npm/bin directory. If it is not installed, install it. But I do most of my formatting with WebStorm not **js-beautify**.

[Hopefully works for you too][jscs-config]

[jscs-config]:https://s3.amazonaws.com/bucket01.elvenware.com/images/jscs-config.png

## Extra Credit Option One

This appears to be more than one way to achieve the goal I was looking for in the extra section. I'll give you both options and let you choose one or the other or both or what have you.

One option would involve letting **git-convert** curl the data, then generate the field definitions, then copy them into the client directory. That's a simple yet still very useful solution.

If you go this route, consider writing a Bash script:

- First line gets the data with **curl**
- In the second line run your JavaScript code and then pipe it into the appropriate file in the client directory using relative paths.

You could possibly integrate your bash script into your **package.json** file as a task that was run before each start of your application. This post seems to go into some depth on **pre** and **post** scripts in **package.json**:

- [Pre and Post Hooks for NPM Scripting](http://www.marcusoft.net/2015/08/pre-and-post-hooks-for-npm-scripting.html)

He points to more documentation here:

- [NPM Official Docs](https://docs.npmjs.com/misc/scripts)

## Extra Credit Option Two

An alternative solution for the Extra credit might look like this. Right now we import the field definitions:

```javascript
import fieldDefinitions from '../field-definitions';
```

I was thinking that instead of importing them, we generate them on the fly. We would use modified version of **git-convert** to generate the definitions. But in this case **git-convert** would be integrated into our code. We would simply run **git-convert** against the code we get back from GitHub when we call **fetch**. I like this solution because it is cool, but is probably not as efficient as the above version, since the code generation would be done at run time.

This solution would perhaps make it impossible to have a default set of data: we wouldn't know the structure of the fields until we queried the server for the JSON. On the other hand, the default data we display was perhaps more of a learning exercise than anything we want in a shipping product.

It's extra credit, so I leave it up to you how you solve these problems. Consider using a branch when making the changes, so that you can always go back easily to the code you had before you tried any major surgery.

## Turn it in

Add, commit, push, tag and branch. T

Git **add**, **commit** and **push**. Create a **branch** called **midterm** and then add a **tag** that you push to the origin. The **branch** and **tag** should both have the word **midterm** in their very short tag/commit message. If there is any doubt as to which folder and branch your midterm is in, be sure to spell it out. For instance, I would like to see something like this, even if you are using the defaults:

- Branch: **midterm**
- Tag: v6.00 with a message for **midterm**
- Folder: **GitExplorer**

You can update the **midterm** branch at any time until the actual due date for the assignment. Even then, I would probably prefer a late update to a broken program.
