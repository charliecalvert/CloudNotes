---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Browser/MaterialUiUpdate.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/Browser
fileName: MaterialUiUpdate.md
relativePath: /Browser/MaterialUiUpdate.md
title: MaterialUiUpdate
directoryName: Browser
category : browser-guide
---

## Overview

In a bit of bad luck, the **material-ui** folks have updated to a new version which they are labeling 1.0.

## Videos

The main video is the first, the second shows how to merge your code back into the master branch when you are done.

- [Material Ui Update][muiu]
- [Material Ui Update Merge][muium]

[muiu]: https://youtu.be/itCt2CRj7Ns
[muium]: https://youtu.be/3omqaK4XMsw

## Install

```bash
yarn add @material-ui/core
yarn add @material-ui/icons
yarn remove material-ui
```

or

```
npm i @material-ui/core
npm i @material-ui/icons
npm i material-ui
```

## Convert Imports

If you have pulled the latest **JsObjects** and run these commands, then a symbolic link to **FindNp** should be in your **~/bin** folder:

```bash
slb
git pull
./CreateSymbolicLinks
```   

Run the following from the **client/src** folder:

```bash
FindNp "*.js" -print0 | xargs sed -i "s/material-ui/@material-ui\/core/"
FindNp "*.js" -print0 | xargs sed -i "s/RaisedButton/Button/g"
```

This will replace the old style import statements with the new style in all your JavaScript files:

```javascript
import Button from '@material-ui/core/Button';
```

As you can see, the new style has an @ symbol and the **core** path.

## Mui Themes

The MuiThemeProvider has been significantly updated.

Here is a minimal **index.js** file that shows how to work with the new code:

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import registerServiceWorker from './registerServiceWorker';


const themeDark = createMuiTheme({
    palette: {
        type: 'dark'
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={themeDark}>
        <App/>
    </MuiThemeProvider>,

    document.getElementById('root')
);

registerServiceWorker();
```

I think we will eventually get rid of **index.css**, but I'm leaving it in for now, until I get a better understanding of how it works.

Here is a more complex example that shows various ways to create custom themes:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import registerServiceWorker from './registerServiceWorker';


const themeBlue = createMuiTheme({
    palette: {
        primary: blue,
    },
});

const themeDark = createMuiTheme({
    palette: {
        type: 'dark'
    }
});


const themeCustom = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#ff4400',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contast with palette.primary.main
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // error: will use the default color
    },
});


const themePurple = createMuiTheme({
    palette: {
        primary: {
            light: purple[300],
            main: purple[500],
            dark: purple[700],
        },
        secondary: {
            light: green[300],
            main: green[500],
            dark: green[700],
        },
    },
});

const themes = [themeDark, themeBlue, themePurple, themeCustom];

ReactDOM.render(
    <MuiThemeProvider theme={themes[0]}>
        <App/>
    </MuiThemeProvider>,

    document.getElementById('root')
);

registerServiceWorker();
```

## Add tileData for ElfHeader Menu

This is not a necessity, but the docs seem to recommend defining our menu items in a separate file that we will call **components/tileData.js**. Oddly, we will not use **MenuItem** objects, but instead **ListItems**:

```javascript
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import { Link } from 'react-router-dom';

export const gitItems = (
    <div>
        <ListItem
            button
            component={Link}
            to="/">
            <ListItemIcon>
                <InboxIcon/>
            </ListItemIcon>
            <ListItemText primary="GitUser"/>
        </ListItem>
        <ListItem
            button
            component={Link}
            to="/micro">
            <ListItemIcon>
                <StarIcon/>
            </ListItemIcon>
            <ListItemText primary="Micros"/>
        </ListItem>
        <ListItem
            button
            component={Link}
            to="/gist-lister">
            <ListItemIcon>
                <SendIcon/>
            </ListItemIcon>
            <ListItemText primary="Gist Lister"/>
        </ListItem>
    </div>
);

export const demoItems = (
    <div>
        <ListItem
            button
            component={Link}
            to="/api-foo">
            <ListItemIcon>
                <DraftsIcon/>
            </ListItemIcon>
            <ListItemText primary="API Foo"/>
        </ListItem>

    </div>
);
```

It may be necessary to heavily edit the **ListItems** to create a menu that makes sense for your program. Just use your commonsense to edit the menu items as you deem necessary. I have not chosen the best icons for these **ListItems**.

## ElfHeader itself

We will import **tileData.js** into our new **ElfHeader**:

```javascript
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { gitItems, demoItems } from './tileData';


const styles = {
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    },
};


class ElfHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    render() {
        const { classes } = this.props;
        const sideList = (
            <div className={classes.list}>
                <List>{gitItems}</List>
                <Divider />
                <List>{demoItems}</List>
            </div>
        );
        return (
            <div>
                <AppBar
                    position="static"
                >
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Menu"
                            onClick={this.handleToggle}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            GitExplorer
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.open} onClose={this.handleToggle}>
                    <div
                        role="button"
                        onClick={this.handleToggle}
                        onKeyDown={this.handleToggle}
                    >
                        {sideList}
                    </div>
                </Drawer>

            </div>
        );
    }
}

ElfHeader.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ElfHeader);
```

The nice thing about this system is that **ElfHeader** becomes boilerplate. There should be no reason ever to modify even when ported to a new project.

**NOTE**: _Or perhaps I should put it this way: "It will not be necessary to rewrite to use it in a new project or to add new menu items. If you want to change the appearance of **ElfHeader**, then of course you will have to modify it. I should add the **sideList** may need to be edited in some cases._

## Updated Buttons

Finally, let's look at the new "raised" buttons:

```javascript
import Button from '@material-ui/core/Button';
// Lots of code omitted here.

// Down in render we define the button
<Button
    variant="raised"
    color="primary"
    onClick={this.queryServer}
    id="queryServer"    
>
    Query API
</Button>
```

## Icon Buttons Simple

```JavaScript
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

/// Code Omitted here

<Button
    color='secondary'
    variant='raised'
    onClick={e => this.addAddress({firstName: 'foo', lastName: 'bar'}, e)}
>
    <Icon>arrow_back</Icon>
</Button>
```

## With Styles

Here are the things you must have to use **withStyles**. Why this is better or good I do not know.

In **index.html** do this if you have not done so already:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
```    

See also <https://www.npmjs.com/package/material-design-icons>

And here is the code you need:

```javascript
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    rightIcon: {
        marginLeft: theme.spacing.unit,
    }
});

class MyObject extends Component {
  render() {
      const { classes } = this.props;
      return (
          <div>
            // An example of using it. Not required.
            // We do everything else so we can do this.
            <Icon className={classes.rightIcon}>arrow_back</Icon>
          </div>
      )
  }
}

MyObject.propTypes = {
    classes: PropTypes.object.isRequired
};


export default withStyles(styles)(MyObject);
```

## Icon Buttons withStyles


```javascript
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

/// Code Omitted here

<Button
    color='secondary'
    variant='raised'
    onClick={e => this.props.setAddress(-1, e)}
>
    <Icon className={classes.rightIcon}>arrow_back</Icon>
</Button>
```                    

## Updated Tests

I'll just give you at least part of my ElfHeader tests:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ElfHeader from '../components/ElfHeader';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import {createMuiTheme} from "@material-ui/core/styles/index";

configure({ adapter: new Adapter() });

describe('ElfHeader tests', function() {

    const themeDark = createMuiTheme({
        palette: {
            type: 'dark'
        }
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MuiThemeProvider theme={themeDark}>
                <BrowserRouter>
                    <ElfHeader />
                </BrowserRouter>
            </MuiThemeProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders title and tests with containsMatchingElement', () => {
        const wrapper = shallow(<ElfHeader />);
        const target = <Typography>Address Maven</Typography>;
        expect(wrapper.dive().containsMatchingElement(target)).toBe(true);    
    });
});
```

The most important change was to **MuiThemeProvider**. Finding a way to get the header title was simple once I saw how to do it with dive().

Here is the code from **ElfHeader.js** we are trying to match in the **title with containsMatchingElement** test:

```html
<Typography variant="title" color="inherit" className={classes.flex}>
    Address Maven
</Typography>
```

Make sure you copy of **ElfHeader.js** contains that string, or **GitExplorer**, or whatever is appropriate. Use your common sense to match the text found in **ElfHeader** in your **ElfHeader.test** file.

There are some notes on testing with material-ui, but at least at the time of this writing I don't see what they bring to the party.

- [MUI Testing](https://material-ui.com/guides/testing/)

## Commentary on tests

I found that material-ui was not breaking my tests even when using **withStyles** and that this worked just fine using plain old enzyme:

```javascript
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// CODE OMITTED HERE

it('renders title matches it with containsMatchingElement', () => {
     const wrapper = shallow(<ElfHeader />);
     const target = <Typography>Address Maven</Typography>;
     expect(wrapper.dive().containsMatchingElement(target)).toBe(true);
});
```

Here was the JSX I wanted to match:

```html
<Typography variant="title" color="inherit" className={classes.flex}>
    Address Maven
</Typography>
```

And here was the messy code material-ui produced:

```html
<WithStyles(Typography) variant="title" color="inherit" className="ElfHeader-flex-100">
       Address Maven
</WithStyles(Typography)>
```

Nevertheless, my test passed.

I say this only because I want to reassure others that this type of test should pass even when using **withStyles**.

## Turn it in

Save and push your work. Tell me:

- Branch (if neccesary)
- Directory
- Tag

Remember, your tag might look a bit like this:

```
git tag -a v9.0.0 -m "Updated material-ui to 1.1"
git push origin v9.0.0
