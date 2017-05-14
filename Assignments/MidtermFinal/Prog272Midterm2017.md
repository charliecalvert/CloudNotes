# Prog272 Midterm 2017

A description of what I want to see on the midterm.


## Goals

- Display at least three views:
  - **AddressShow**
  - **AddressEdit**
  - **SmallNumbers**
    - Show at least five numbers, but you can update them with a single button click.
  - It's best if React components are in a file that begins with a capital letter and uses Pascal casing.
- Menu
  - Make sure you are [styling it](https://www.w3schools.com/css/css_navbar.asp).
  - I picked the first of the **Horizontal Navigation Bar Examples**
  - Replace the default "Atom" **logo.svg** file with one of your own choosing.
- Iterate back and forth over at least 5 addresses
  - Extra credit button go to first and last
  - Be able to edit any of the address
  - Changes should remain through the session
- Testing
  - You should have at least 5 test files
  - **Address.test.js**, **AddressEdit.test.js**, **AddressShow.test.js**
  - **ElfHeader.test.js** and **SmallNumbers.test.js**
- Refactoring
  - Make sure you have the following folders with appropriate content:
  - **src/\_\_tests\_\_**
  - **src/components**
  - **src/css**
  - **src/images**
  - I'll get back to you with more details of how many tests I want to see, but for now, assume that 30 reasonable tests across all files.

## ElfDebugEnzyme

  You can find ElfDebugEnzyme here:

  - [DebugEnzyme](https://gist.github.com/charliecalvert/51daef341699943b07c9570c3ad2cbab)

Here is an example of how to use it:

  ```javascript
  import ElfDebugEnzyme from '../ElfDebugEnzyme';
  const elfDebug = new ElfDebugEnzyme(true);

  elfDebug.getIndex(wrapper, '.AddressShowDiv', 0);
  ```

## JSCS

I couldn't figure out what was going on with JSCS earlier in the quarter, or perhaps WebStorm was broken with ES6 code. At any rate, something has changed either in my head or in the world.

If you have not done so already, install JSCS globally:

  npm install -g jscs

Make sure JSCS _**is turned on**_ in WebStorm. Go to **Settings | Languages and Frameworks | JavaScript | Code Quality Tools | JSCS** and make sure it is **enabled**.

Put this **.jscsrc** file in the root of your projects. Probably one for **client** and one for **server**:

```json
{
    "preset": "google",
    "maximumLineLength": null,
    "validateIndentation": 4,
    "excludeFiles": [
        "**/node_modules/**",
        "**/config/**",
        "**/scripts/**",
        "**/bower_components/**",
        "**/address-list.js",
        "**/mock-user-info.js"
    ]
}
```

Go to **Setting | Editor | Code Style | JavaScript**. On the Settings tab, in the first section, called **Before Parentheses**, set **In Function Expression** to false (unchecked). This means there should be no space after the word **function.**. Our code should look like this: **function() {}**. Not like this **function () {}**. Note the space after the word function in the second example.

JSCS should pass for your files. You can probably make this happen by choosing **Code | Reformat** in WebStorm, or by running the NPM package called **js-beautify**, which should be installed on your system in the global ~/npm/bin directory. If it is not installed, install it. But I do most of my formatting with WebStorm not **js-beautify**.

![Hopefully works for you too][jscs-config]

[jscs-config]:https://s3.amazonaws.com/bucket01.elvenware.com/images/jscs-config.png

## JSCS Punctuator

Here is our current AddressChange:

```javascript
onAddressChange = (event) => {
    this.addressIndex += 1;
    const address = addresses[this.addressIndex];

    this.setState({
        address: address
    })
};
```

Get rid of the arrow function syntax, which is cutting edge experimental code that JSCS is not handling correctly:

```javascript
onAddressChange(event) {
    this.addressIndex += 1;
    const address = addresses[this.addressIndex];

    this.setState({
        address: address
    })
};
```

All this is good and well, but now the **this** variable in **onAddressChange** is no longer valid. To fix it, add this code to the **constructor**:

```javascript
this.onAddressChange = this.onAddressChange.bind(this);
```

The call to bind shown above is the traditional way to solve this problem. I was enamored of the arrow function syntax and thought it a nice better way to solve the "invalid this" problem. But that solution is not certain to make it into the final ES6 spec. So I'm opting for this alternative solution, even if we lose the array function syntax.

See the **setQuiet** method in this gist for a complete working example of the fix:

- <https://gist.github.com/charliecalvert/cf20ae73a21bb34d6605a1f533c9d988>

**NOTE**: _When I got the punctuator error, the editor did not usually point right at the source of the problem. Instead, for me, it was often pointing at the first **import** statement at the top of the file. Eventually, I realized the problem was not the **import** statement, but the arrow functions. I found this to be quite confusing, and it took me several tries before I sorted it out. Once I removed the arrow function, however, the other JSCS errors were easier to find, and WebStorm pointed me at the place in the file where the error occurred._

## Turn it in

Git **add**, **commit** and **push**. Git **tag** and/or create a **branch**. (If you are doing both, add the tag after you create the branch.) Use the word **Midterm** in your tag and/or branch messages. If there is any doubt as to which folder and branch your midterm is in, be sure to spell it out. For instance:

- Branch: **midterm**
- Tag: v6.00 with a message for **midterm**
- Folder: **CongressAddress**

I'm happy if your branch is master, but if you feel comfortable creating a **midterm** branch, then do so just before you submit the assignment. You can update the branch at any time until the actual due date for the assignment. Even then, I would probably prefer a late update to a broken program.

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

Remember that for tests on our input elements we need to use containsMatching element:

**contains** insists that all attributes for a tag match exactly, while **containsMatchingElement** allows you to match just one out of multiple attributes. In other words, it ignores attributes you don't care about. We have to use **containsMatchingElement** when testing our input controls since they contain **onChange** functions, and it is not easy or perhaps not even possible to match a function:

```javascript
const inputElement = <input value='Robin Dudette'/>;
// Code omitted
expect(wrapper.containsMatchingElement(inputElement)).toEqual(true);
```

This works even if the **input** control has a number of other attributes other than **value**.

## Don't Use Fetch on Midterm

Unless you are absolutely sure you know what you are doing, don't call **fetch** on the midterm as it will break your tests. Just continue to get the data from **address-list.js**.

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
Even though I had several tests in my \_\_tests\_\_ folder, only the one that had **Foo** in its name was run.

- [More information in the docs](https://facebook.github.io/jest/docs/api.html)
