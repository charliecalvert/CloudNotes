## Overview

Add [ESLint][esl] and [Prettier][pr] to your [GitExplorer][ge]  assignment.

Details for completing these tasks are in the [ESLint][esla] assignment.

## Video

Watch the [video][v1].

## Prettier

To run the script, first make it executable, then run it:

```bash
chmod +x prettier
./prettier
```

## PropTypes

If an object is passed **props**, ESLint wants you to declare the type for each property. Begin by importing **PropTypes**:

```JavaScript
import PropTypes from 'prop-types';
```

In this example we define the **props** passed to a React component called **MyReactComponent**. The **address** property is an object with two properties: **firstname** and **lastname**.

```javascript
MyReactComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    address: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string
    }),
    save: PropTypes.func    
};
```

This usually appears at the bottom of a file, just above an **export** statement.

You can read more about PropTypes [here][aa] and [here][ab] and [here][ac].

[aa]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactPropBasics.html#add-proptypes
[ab]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactProps.html#proptypes
[ac]: https://reactjs.org/docs/typechecking-with-proptypes.html

## Turn it in

I'm expecting to find the following files in your **GitExplorer** project folder:

- .eslintrc.json (or .eslintrc)
- .eslintignore
- prettier
- .prettierrc

When I run **./prettier** I'm expecting to see that no changes happened to your files. That is, **git status** still comes back with no changes after running **prettier**.

**NOTE**: _Before you turn in an assignment, run **prettier**. Now push. Then again run **prettier** and this time follow it with **git status**. Git should report that no changes happened to your files when you ran **prettier**. Repeat as necessary until **git status** comes back clean after you push and run **prettier**._

We should also be able to run the ESLint command followed by a space and a period (eslint .) without errors or warnings.

For instance, this is not good:

```bash
$ eslint .

/home/charlie/Git/prog272-calvert-2018/AddressMaterial/src/components/App.js
  6:25  error  'Route' is defined but never used  no-unused-vars

✖ 1 problem (1 error, 0 warnings)
```

This is what we want to see:

```bash
$ eslint .
```

The point is that we see nothing: no errors, no warnings, no output at all when we run **eslint**.

Depending on which course you are in, both **AddressMaven/GitExplorer** and **NativeAddress/NativeExplorer** should pass all these tests. You can assume that all future projects should pass these tests, especially the **Midterm** and the **Final**.

[esl]: https://eslint.org/
[esla]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactEsLint.html
[pr]: https://github.com/prettier/prettier
[ge]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactPropsRefine.html
[v1]: https://youtu.be/bsxBHLxYMrA
