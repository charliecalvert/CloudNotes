## Overview

The Goal is to add [Material-UI][limu] to our application to gussy up the menu and give our app a more standard appearance.

## Screenshots

We are adding several things to our Web App.

- At the top we see a blue Material-UI **AppBar** with a title in the middle and a hamburger menu on the left.
- Our button is now a blue Material-UI **RaisedButton**.
- We have the ability to style the colors with Material-UI themes, but we are going with the defaults in this example.

![Git Explorer App Bar][ge-ab]

**IMAGE**: _Git Explorer with an AppBar on top_

When the user clicks on the hamburger menu a Material-UI **Drawer** opens with three Material-UI **MenuItems** on it. In this screenshot the menu has the focus, the main page is in shadow, and the Chrome Developer Tools are open to the **Sources** page.

![Git Explorer Menu Open][gem]

**IMAGE**: _Git Explorer with the menu open. We combine a [Material-UI][limu] [AppBar][ab] and [Drawer][dr] to make the menu._

## Get Started

Link in [Material-UI][limu].

```bash
yarn add material-ui

or:

npm install --save material-ui
```

## Add Roboto Font

I'm not sure this is necessary, but some folks do get fussy about fonts:

Here we Import fonts and icons as HTML:

```HTML
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

We are not using Pug on the client side, but if you ever want to use it:

```
link(rel="stylesheet", href="https://fonts.googleapis.com/css?family=Roboto:300,400,500")
link(rel="stylesheet", href="https://fonts.googleapis.com/icon?family=Material+Icons")
```

## Wrap Everything in MuiThemeProvider {#mui-theme}

In **index.js** wrap your entire application in a Material-UI [MuiThemeProvider][muitp].

```javascript
// YOUR IMPORTS HERE
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
    <MuiThemeProvider>
        <App/>
    </MuiThemeProvider>,
    document.getElementById('root')
);

```

Right now we are using the default theme, but you can use this as a place to introduce [Material UI Themes][muit]

Like this:

```javascript
// YOUR IMPORTS HERE
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <App />
    </MuiThemeProvider>,
    document.getElementById('root')
);

registerServiceWorker();
```

Our new theme is similar to the one shown above, but the colors are a bit muted, a bit darker.

![A darker theme][muid]

[muid]: https://s3.amazonaws.com/bucket01.elvenware.com/images/git-explorer-mui-dark.png

## Create Menu

In **ElfHeader** import [AppBar][ab] and [Drawer][dr] from the [Material-UI][limu] package:


```javascript
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
```

In the render method create the AppBar:

```javascript
<AppBar
	title="GitExplorer"
	iconClassNameRight="muidocs-icon-navigation-expand-more"
	onLeftIconButtonClick={this.handleToggle}
/>
```

A method of **ElfHeader** called **handleToggle** will change the state of open. When **open** changes, the **Drawer** in our menu slides open and closed:

```javascript
constructor(props) {
    super(props);
    this.state = {
        open: false
    };
}

handleToggle = () => this.setState({ open: !this.state.open });
```

The render method has a couple **Material-UI** [AppBars][ab], [MenuItems][mi] and a [Drawer][dr]:

```xml
<div>
    <AppBar
        title="GitExplorer"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonClick={this.handleToggle}
    />
    <Drawer
        docked={false}
        width={200}
        open={this.state.open}
        onRequestChange={this.handleToggle}
    >
        <AppBar title="Git Explorer"/>

        <MenuItem
            primaryText='Git User'
            containerElement={<Link to="/"/>}
            onClick={this.handleToggle}
        />
        // MORE MENU ITEMS HERE
    </Drawer>
</div>
```

## Buttons

```javascript
<RaisedButton
    label="Query Git API"
    labelPosition="before"
    primary={true}
    icon={<ActionAndroid />}
    style={styles.button}
    onClick={this.queryGitApi}
/>
```

We need to define our styles in a file called **components/elf-styles.js** which looks like this:

```javascript
const styles = {
    button: {
        margin: 12,
    },
    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
};

export default styles;
```

## Define a FontIcon

Here is where you can find a bunch of icons you can use in your application:

- <https://material.io/tools/icons/?style=baseline>


```javascript
import FontIcon from 'material-ui/FontIcon';
import { red500 } from 'material-ui/styles/colors';
import styles from './elf-styles';

// CODE OMITTED HERE

<RaisedButton
    label="Query Git API"
    labelPosition="before"
    primary={true}
    icon={<FontIcon
        class="material-icons"
        color={red500}>rss_feed</FontIcon>}
    style={styles.button}
    onClick={this.queryGitApi}
/>
```

## Turn it in

Add another menu item for the Micro page.

All versions of our App are called GitExplorer at this point. So let's add a tag to designate the place where you added the material theme and pushed this assignment.

- Branch: Week06
- Folder: GitExplorer
- Tag: v6.0.0 - Added Material-UI to GitExplorer

Some reminders on using Git Tag:

```bash
git tag -a v6.0.1 -m "Adding material ui support and a darker theme"
git push origin v6.0.1
git tag -n
```

[Here][sotag] is the [documentation][tagnum] on using the **n\<num\>** flag when displaying git tags: _n\<num\> specifies how many lines from the annotation, if any, are printed when using -l. The default is not to print any annotation lines. If no number is given to -n, only the first line is printed. If the tag is not annotated, the commit message is displayed instead._

You should also merge your latest **GitExplorer** back into Master.

<!-- Elven Links -->

[ab]: http://www.material-ui.com/#/components/app-bar
[mi]: http://www.material-ui.com/#/components/menu
[dr]: http://www.material-ui.com/#/components/drawer
[limu]: https://www.material-ui.com/#/
[mi]: http://www.material-ui.com/#/components/menu
[muit]: http://www.material-ui.com/#/customization/themes
[muitp]: https://material-ui-next.com/api/mui-theme-provider/
[ge-ab]:https://s3.amazonaws.com/bucket01.elvenware.com/images/git-explorer-mui-app-bar.png
[gem]: https://s3.amazonaws.com/bucket01.elvenware.com/images/git-explorer-mui-menu.png
[sotag]: https://stackoverflow.com/a/14102299/253576
[tagnum]: https://git-scm.com/docs/git-tag#git-tag--nltnumgt
