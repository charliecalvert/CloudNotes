## Overview

In a bit of bad luck, the **material-ui** folks have updated to a new version which they are labeling 1.0.

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
FindNp "*.js" -print0 | xargs sed -i "s/material-ui/@material-ui\/core"/
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

## Rewrite ElfHeader

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

I have not chosen the best icons for these **ListItems**.

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

## Updated Buttons

Finally, let's look at the new "raised" buttons:

```javascript
import Button from '@material-ui/core/Button';
// Lots of code omitted here.

// Down in render we define the button
<Button
    variant="raised"
    onClick={this.queryServer}
    id="queryServer"
    color="primary"
>
    Query API
</Button>
```
