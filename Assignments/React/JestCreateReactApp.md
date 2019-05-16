## Overview

By: _Charlie Calvert_

Learn how to write [Jest][jest] tests with the npm packaged called **create-react-app**.

A deck to accompany this assignment is here:

- [http://bit.ly/jest-cra](http://bit.ly/jest-cra)

This document has some sections in it not found in deck, so view both documents.

You need only follow the instructions found on the Deck from the first link above. You should do the [ESLint](#eslint) section. It's best to also setup the [ElfDebugEnzume.js](#elf-debug-enzyme) bits. Unless you want to. We will cover both of those subjects in class soon.

## Install

**create-react-app** is probably already on your system in **~/npm/bin**. That directory should be on your path in the default Pristine Lubuntu system.

If **create-react-app** is not on your system, then install it like this:

```
npm install -g create-react-app
```

Make sure you are on the latest version:

    ncu -g

If any globally installed apps are outdated, then reinstall them:

    npm install -g create-react-app

While we are at it, update JsObjects:

    jo
    git pull

If you want to be a bit more thorough, do this instead or in addition to the above:

    slb
    git pull
    ./CreateSymbolicLinks

## ENOSPC

When running tests, you may get an ENOSPC (Not Enough Space or something similar). Let's try to fix this problem up front. The explanation of what you need to do is here:

- [ENOSPC on Elvenware][enspc]

## Set the Default Port

Load your **.bashrc** file into an editor and add this line near the bottom of the file, if it is not already there:

```bash
export PORT=30025
```

Some of our programs will use this as the default PORT on which to run.

**NOTE**: _We might want to run some programs, especially Express programs, on some other port than 30025, such as 30026. Note that they will default to the port set in the manner described above. As a result, we will sometimes need to take steps to ensure they run on the port we want. One technique is to define the port in **package.json**:_

```JavaScript
"config": {
    "port": "30026"
},
```

Then in **www/bin**:

```javascript
const port = process.env.npm_package_config_port || 30026;
```

## Get Started

If we are using branches in your class, switch to your Week0X branch, where X is the current week.

- Navigate to the root of your repository
- Issue this command:
  - create-react-app **weekxx-react-address**, where xx is the number of the current week of this quarter.  
- Open up the project in WebStorm
- Set WebStorm to use JSX, React and ES6
  - File | Settings | Languages and Settings | JavaScript | React/JSX
- If you get lots of JsHint, EsLint or other errors, for now, just disable them:
  - File | Settings | Languages and Settings | JavaScript | Code Quality Tools Tools

## Sanity Tests

Create a folder called **src/tests**. Move **App.test.js** into it.

Navigate into the **src/tests** directory and run **get-gists**. Select the **ElfDebugEnzume** option.

Working in any directory that is part of your project, install **Enzyme** and **elven-code**:

    npm install --save-dev enzyme react-test-renderer enzyme-adapter-react-16 elven-code prop-types

While we are on a role, let's install Material UI as well:

    npm i @material-ui/core @material-ui/icons @material-ui/styles

Open up a new tab and start running your tests: **npm test**. There is only one test at this point. If it is not passing, do what you need to do to make it pass.

Create a folder called **src/sanity-tests/**. Navigate into it. Run **get-tests** and choose **Address React Tests**. When you are done you should have a file called something like **Sanity.App.test.js** in your **sanity-tests** folder.

All of the tests in this file use **xit** to skip tests. In other words none of the tests are active at first. We will activate bit by bit as we build the app. To begin, change the first four tests from **xit** to **it**. They should all be passing.

## New App.js {#new-app}

Let's replace the default **create-react-app** React component with one of our own.

- Navigate into the **src** directory
- Run get-gist
- Select option **N**: **Simple React Class Component**

This downloads a file called **ElfApp.js**. Let's replace the default **create-react-app** React component with the one we just downloaded.

- Delete **App.js** and use WebStorm to rename **ElfApp.js** to **App.js**.
  - WebStorm should have automatically changed the name of the class in our file from **ElfApp** to **App**
- Open **App.js** and confirm that the class found in it is called **App**. If it is not, then manually rename the class from **ElfApp** to **App**.

Load the Material UI **Typography**:

    import Typography from '@material-ui/core/Typography';

Change the text for the H1 element in the control to use **Typography** and to read **Welcome to Elf Address**:

```javascript
<Typography variant="h5" gutterBottom>
    Welcome to Elf Address
</Typography>
```

This heading is still inside the **DIV** returned by the **render** method. (I could be clearer, but I want you to have a think at least a bit here.)

Finally, let's use the Material UI **withStyles** option. This is more than a little confusing at first, but the fundamental idea behind it is simple: _we want to start writing CSS in our JavaScript rather than in a CSS file._ Frankly, I'm not yet in love with this system, but ALL of the Material UI examples use it, so it is easier in the long run for us to play along.

There are four steps:

1. Start near the top by importing **withStyles**
- Declare your CSS using the CSS in JS style of programming
- Pull the classes property from our props,
- Modify the **export** statement to create what is called a Higher Order Component (HOC).

```javascript
// STEP ONE
import { withStyles } from '@material-ui/core/styles';  

// STEP TWO
const styles = theme => ({                              
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 5,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    typography: {
        color: theme.palette.primary.dark
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class App extends Component {

  render() {      
      const {classes} = this.props;      // STEP THREE     
      return (...)
  }
}

export default withStyles(styles)(App);  // STEP FOUR
```

Now activate the **renders and reads Typography heading text** sanity test.

## Themes

On the theory that one might as well be hung for sheep as a goat, let's go ahead and create our own theme, which will allow us to take advantage of the styles system.

Overwrite the code in **src/index.js** with this:

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const themePurple = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            light: purple[300],
            main: purple[500],
            dark: purple[700]
        },
        secondary: {
            light: green[300],
            main: green[500],
            dark: green[700]
        }
    }
});
ReactDOM.render(
    <MuiThemeProvider theme={themePurple}>
        <App/>
    </MuiThemeProvider>
    , document.getElementById('root')
);

serviceWorker.unregister();
```

Now you have them made of purple and green colors. Apply the them to our **Typography** element:

```javascript
<Typography className={classes.typography} variant="h5" gutterBottom>Welcome to Elf Address</Typography>
```

Now the text should be purple because of these lines in our **styles** object:

```javascript
typography: {
    color: theme.palette.primary.dark
}
```

Finally, let's wrap our heading in some **Paper** and set its color by using the paper rule from **styles**:

```javascript
import Paper from '@material-ui/core/Paper';
// CODE OMITTED HERE
<Paper>
    <Typography className={classes.typography} variant="h5" gutterBottom>
        Welcome to Elf Address
    </Typography>
</Paper>
```

At this point you should umcomment the **renders Paper** test.

To see our theme, just use the **paper** rule from our **styles**

```javascript
<paper className={classes.paper}>
```

Now the paper should be purple, or green, or something besides white. The text should also now be justified.

## Declare State. {#constructor-state}

Once you know how to test for static HTML generated by your React component, then next step will be to test the dynamic code, the code that changes when you -- for instance -- press a button. Let's begin by adding a **constructor** to your the React component found in **src/App.js**.

The **constructor** is a function on your component. React calls is it before it mounts the component. Call super() first or else the this variable will not be valid in the constructor.

```javascript
class App extends Component {
   constructor() {
       super();
       this.state = {
            address: {firstName: 'unknown', lastName: 'unknown', state: 'unknown'}
        };
    }
    // CODE OMITTED HERE
}
```

React will keep your state variables up to date in your UI if you display and play by certain rules. In particular, when you change these variable, use **setState** as described later in this chapter.

## In render, display the state {#display-state}

In our JSX, we:

- Create a second sheet of paper
- Style it not with a **className**
- Display our state in a react expression defined with curly braces.

```html
<Paper className={classes.paper}>
    <Typography className={classes.typography} variant="body1" gutterBottom>{this.state.address.firstName}</Typography>
    // YOU FILL IN THE LAST NAME AND STATE
</Paper>
```

## Define a function called getFile {#define-getnine}

We declare an arrow function function in our component called **getFile**. Inside it, we call **setState**. The **setState** call can take an object literal defining the new state.

```javascript
getFile = () => {
    console.log('getFile called.');
    this.setState({address: {firstName: 'Patty', lastName: 'Murray', state: 'Washington'}});
};
```

## Create a Button {#render-state}

In our JSX, we:

- Declare a button
- Give it **_not_** an HTML **onclick** attribute, but a JSX **onClick** attribute
- And use a react expression, defined with curly braces, to call **getFile** when the button is clicked.

```html
<Paper className={classes.paper}>
    <Button
        id="getFileAction"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={this.getFile}>
        Get File
    </Button>
</Paper>
```

## ESLint

Eslint should be installed globally in **~./npm/bin**.

Add this **.eslintrc.json** file to your project. Use the system with **git-gist** that is [outlined here][eslint] to install eslint support in the base of your project. Just read the automate section. You don't need to read through the entire assignment unless you interested.


Run it like this:

```bash
eslint .
```

If the code returns with no errors, you are done. If you see errors, do your best to fix them. Note that you can often fix errors simply by typing **eslint --fix .**

The **get-gist** utility returns my latest eslint configuration files. To see my current working **.eslintrc.json** file, go [here][eslintrc].

## Testing

- [I am still working on this](JestCreateReactTests.html)

## Turn it in

Place your work in your repository if it is not already there. Merge your finished project into **master**.

Push your repository. Go to GitHub or BitBucket and ensure that the code you want to turn in is actually in your repository and that it contains the files and folders you expect it to contain.

Find the assignment on Canvas and submit it. Add text that states the name of the folder where you placed your assignment. A link to your folder on GitHub/Bitbucket is nice.

For most of the assignments, I'll just say something like: "Put your work in your repo and push," or simply "Push your work". That's a shorthand for something along the lines of what I'm saying here.

<!--       -->
<!-- links -->
<!--       -->

[eslintrc]: https://gist.github.com/charliecalvert/c5952541925c04479150bbd8c40feac6
[enspc]: https://www.elvenware.com/javascript-guide/JavaScriptReact.html#enospc
[eslint]: https://www.elvenware.com/teach/assignments/react/ReactEsLint.html#automate
