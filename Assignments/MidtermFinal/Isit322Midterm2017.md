# ISIT 322 Midterm 2017

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

If you have not done so already, install JSCS globally:

  npm install -g jscs

Make sure JSCS _**is turned on**_ in WebStorm. Go to **Settings | Languages and Frameworks | JavaScript | Code Quality Tools | JSCS** and make sure it is **enabled**.

Put this **.jscsrc** file in the root of your projects. Probably one for **client** and one for **server**:

```json
{
    "preset": "google",
    "validateIndentation": 4,    
    "excludeFiles": [
        "**/node_modules/**",
        "**/config/**",
        "**/scripts/**",
        "**/bower_components/**",
        "**/field-definitions.js",
        "**/mock-user-info.js"
    ],
    "requireCamelCaseOrUpperCaseIdentifiers": false,
    "maximumLineLength": 120
}
```

Go to **Setting | Editor | Code Style | JavaScript**. On the Settings tab, in the first section, called **Before Parentheses**, set **In Function Expression** to false (unchecked). This means there should be no space after the word **function.**. Our code should look like this: **function() {}**. Not like this **function () {}**. Note the space after the word function in the second example.

JSCS should pass for your files. You can probably make this happen by choosing **Code | Reformat** in WebStorm, or by running the NPM package called **js-beautify**, which should be installed on your system in the global ~/npm/bin directory. If it is not installed, install it. But I do most of my formatting with WebStorm not **js-beautify**.

![Hopefully works for you too][jscs-config]

Remember that you have a **Gruntfile.js** in **GitExplorer/server** directory. This means you can run **grunt jscs** over the **GitExplorer/server** directory without difficulty. I found it only moderately painful to copy it over to **GitExplorer/client** and run it over the client code as well. There were, however, some **Punctuator** errors that I could not eliminate. I do not, however, get the same errors in WebStorm, perhaps because it is using a more recent copy of JSCS. To be sure you have the latest:

  npm install -g jscs

[jscs-config]:https://s3.amazonaws.com/bucket01.elvenware.com/images/jscs-config.png

## JSCS Punctuator in ES6 {#jscs-punctuator}

I can't get JSCS to accept our arrow functions which we use for binding this. In **ElfLogger**, for instance, I write this:

```javascript
setQuiet = (newValue) => {
    this.display = newValue;
};
```

This is well formed, if experimental, ES6 syntax. If I remove the semi-colon, then I get a missing semicolon complaint from JSCS. If I add the semicolon, then I get this error, which I usually see at the very top of my file:

  JSCS: expected end of node list but punctuator found

**NOTE**: _When I got this error, the editor did not usually point right at the source of the problem. Instead, for me, it was often pointing at the first **import** statement at the top of the file. Eventually, I realized the problem was not the **import** statement, but the arrow functions. I found this to be quite confusing, and it took me several tries before I sorted it out. Once I removed the arrow function, however, the other JSCS errors were easier to find, and WebStorm pointed me at the place in the file where the error occurred._

The solution is to go back to the old syntax for binding **this**. In the constructor, I write the following:

```javascript
this.setQuiet = this.setQuiet.bind(this);
```

Now I can switch to the traditional method declaration syntax, and yet still have **this** properly bound. That is, **this** will be valid in the **setQuiet** method. The problem is not unique to this object, and you may need to make similar changes in multiple place to fix the problem.

For an example, look here:

- [ElfLogger Gist](https://gist.github.com/charliecalvert/cf20ae73a21bb34d6605a1f533c9d988)
- [ElfLogger in ReactPropsMounted](http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactPropsMounted.html#logger)

Really sorry about the arrow functions. It's easy to fix our code, easy to switch to the explicit bind syntax, but I'm sad to see the arrow functions go. I liked them, and this seems like a trivial reason to give them up. But I mentioned earlier that there is a real debate about whether to include them or not in the final ES6. The silver lining is that it is good to learn more about **bind**.

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

## Shallow Button Clicks

By definition, enzyme **shallow** works with only one component at a time. When we use **shallow**, it is therefore not possible to check if a button click is working correctly since that involves the interaction of two components.

However, even when we use shallow, an onClick function can be created within a button test to validate that the button responds to clicks. We implement the **onClick** function as a callback, and then confirm that when we click the button the callback is executed.

Here is an example:

```javascript
// button test
it('responds to a button click', () => {
    //create variable to track button click status
    let clicked = false;
    //create function to assign as onClick
    const callback = () => {
        clicked = true;
    };

    const wrapper = shallow(<AddressShow onSetAddress = {callback} address={address}/>);
    wrapper.find('button#setAddress').simulate('click');
    expect(clicked).toEqual(true);

});
```

Thanks to Andrew Wilson for inspiring this tip!

## Contains Matching Element

Remember that for tests on some HTML elements we need to use **containsMatchingElement**. **contains** insists that all attributes for a tag match exactly, while **containsMatchingElement** allows you to match just one out of multiple attributes. In other words, it ignores attributes you don't care about. We have to use **containsMatchingElement** when testing some input controls or when testing for some button controls since they contain **onChange** or **onClick** functions, and it is not easy or perhaps not even possible to match a function:

```javascript
const inputElement = <input value='Robin Dudette'/>;
// Code omitted
expect(wrapper.containsMatchingElement(inputElement)).toEqual(true);
```

This works even if the **input** control has a number of other attributes other than **value**.

## Filter Tests

Also, notice the menu the tests give you. Note the p option for filtering files. Suppose one of your test files is called Foo.test.js and one is called Bar.test.js. Press p and enter Foo. Only Foo.test.js will run:

```
Watch Usage
 › Press a to run all tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.

 pattern › Foo
```

The result might look like this:

```
 PASS src/__tests__/Foo.test.js
 React Foo Suite
 ✓ see if true is true (6ms)

Test Suites: 1 passed, 1 total
Tests: 1 passed, 1 total
Snapshots: 0 total
Time: 0.545s, estimated 1s
Ran all test suites matching "Foo".

Watch Usage
 › Press a to run all tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
 ```

Even though I had several tests in my __tests__ folder, only the one that had **Foo** in its name was run.

- [More information in the docs](https://facebook.github.io/jest/docs/api.html)
