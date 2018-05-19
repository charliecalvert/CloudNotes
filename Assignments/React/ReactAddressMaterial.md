## Overview

The Goal is to add [Material-UI][limu] to our application to gussy up the menu and give our app a more standard appearance.

## Videos

Two videos are connected to this assignment:

- [Address Material Part 01][am1]
- [Address Material Part 02][am2]

## Screenshots

We are adding several things to our Web App.

- At the top we see a blue Material-UI **AppBar** with a title in the middle and a hamburger menu on the left.
- Our button is now a blue Material-UI **RaisedButton**.
- We have the ability to style the colors with Material-UI themes, but we are going with the defaults in this example.

![Elf Address App Bar][gem]

**IMAGE**: _Elf Address with an AppBar on top_

When the user clicks on the hamburger menu a Material-UI **Drawer** opens with three Material-UI **MenuItems** on it. In this screenshot the menu has the focus, the main page is in shadow, and the Chrome Developer Tools are open to the **Sources** page.

![Git Explorer Menu Open][ge-ab]

**IMAGE**: _Elf Address with the debugger open. If you click the hamburger menu you see a [Material-UI][limu] [AppBar][ab] and [Drawer][dr] to make the menu as [shown below](#darker)._

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


## Create Menu

In **ElfHeader** import [AppBar][ab] and [Drawer][dr] from the [Material-UI][limu] package:


```javascript
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
```

In the render method create the AppBar:

```javascript
<div>
    <AppBar
        title="GitExplorer"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonClick={this.handleToggle}
    />
</div>
```

You can now delete the default header from the **ElfHeader** render method.

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
        title="Address Maven"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonClick={this.handleToggle}
    />
    <Drawer
        docked={false}
        width={200}
        open={this.state.open}
        onRequestChange={this.handleToggle}
    >
        <AppBar title="Address Maven"/>

        <MenuItem
            primaryText='Address'
            containerElement={<Link to="/"/>}
            onClick={this.handleToggle}
        />

        {/*MORE MENU ITEMS HERE*/}
    </Drawer>
</div>
```

## Setting up Routes

Just as a reminder, recall that in **App.js** we defined our **Route** objects that are paired with the **Link** components from the **ElfHeader**. There is no work for you to do here, but I want to make sure you understand all this:

```javascript
import {BrowserRouter, Route} from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <ElfHeader/>
                    // Define your routes here.
                </div>
            </BrowserRouter>
        );
    }
}
```

## Buttons

We are going to need buttons in each of our components. This means we need to transform code that looks a bit like this:

```JavaScript
<button id="" onClick={...}>
    Set Address
</button>
```

That is JSX for React programs. We need JSX for React Native programs. Our code should therefore look a bit more like this:

```javascript
// Put this code near the top
import RaisedButton from 'material-ui/RaisedButton'
import ActionAndroid from 'material-ui/svg-icons/action/android';

// Further down, where the React JSX was located:
<RaisedButton
    label="Set Address"
    labelPosition="before"
    primary={true}
    icon={<ActionAndroid />}
    style={styles.button}
    onClick={...}
/>
```

**NOTE**: _I'm intentionally not defining the code for the onClick method because I want you to figure it out for yourself. Remember that we are passing a method as props that should be called when the button it clicked._

We need to define our styles in a file called **components/elf-styles.js** which looks like this:

```javascript
export default {
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
```

And then near the top of AddressShow:

```JavaScript
import styles from './elf-styles';
```

## More Button Icons

If you want to have some fun, try this:

```javascript
import FontIcon from 'material-ui/FontIcon';
import { red500 } from 'material-ui/styles/colors';

<RaisedButton
    label="Set Address"
    labelPosition="before"
    primary={true}
    icon={
        <FontIcon class="material-icons" color={red500}>
            rss_feed
        </FontIcon>
    }
    style={styles.button}
    onClick={...}
/>

```

## Define a FontIcon

Add this code near top (line 13?) of **public/index.html**

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

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
        className="material-icons"
        color={red500}>rss_feed</FontIcon>}
    style={styles.button}
    onClick={this.queryGitApi}
/>
```

We are using rss feed, but here is where you can find a bunch of icons you can use in your application:

- <https://material.io/tools/icons/?style=baseline>

For instance, instead of **rss_feed**, try **account_circle**:

```JavaScript
color={red500}>account_circle</FontIcon>}
```

## Add a Darker Theme {#darker}

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

## Tests

For extra credit, get these tests to pass.

In your App.test.js, you will need to wrap the App in **MuiThemeProvider**:

```javascript
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MuiThemeProvider><App /></MuiThemeProvider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
```

Here is the code from **ElfHeader** that defines our **title** in the AppBar:

```javascript
<AppBar
    title="Address Maven"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    onLeftIconButtonClick={this.handleToggle}
/>
```

Here is the test that proves that it is set correctly to **Address Maven**:

```javascript
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MuiThemeProvider>
            <BrowserRouter>
                <ElfHeader />
            </BrowserRouter>
        </MuiThemeProvider>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders and reads Title text', () => {
    const wrapper = shallow(<Header />);        
    const headerText = wrapper.find('AppBar').first().prop('title');
    console.log("HeaderTest", headerText);
    expect(headerText).toBe('Address Maven');
});
```

**NOTE**: _If you get an error about **Cannot read property prepareStyles of undefined** then that usually means you are forgetting to wrap your React object in a **MuiThemeProvider** as shown above._

The key element is the call to **.prop('title')** which picks the text off the virtual DOM.

Here is a test to prove that App.js contains at seem of what you expect it to contain:

```JavaScript
it('renders state of File paragraph after button click', () => {
    const wrapper = shallow(<App />);
    //console.log(wrapper.debug());
    const headerText = wrapper.find('div').childAt(2).prop('path');        
    //console.log(headerText);
    expect(headerText).toBe('/get-file');
});
```

If you uncomment the first console.log statement, it renders this:

```html
<BrowserRouter>
  <div className="App">
    <ElfHeader />
    <Route exact={true} path="/" component={[function]} />
    <Route etc... />
  </div>
</BrowserRouter>
```

## Turn it in

Add another menu item for the Micro page. If you want extra credit, tell me to check your tests then add a note to that effect when you turn in the assignment.

All versions of our App are called GitExplorer at this point. So let's add a tag to designate the place where you added the material theme and pushed this assignment.

- Folder: Week06-AddressShow
- Tag: v6.0.0 - Added Material-UI to GitExplorer

Some reminders on using Git Tag:

```bash
git tag -a v6.0.1 -m "Adding material ui support and a darker theme"
git push origin v6.0.1
git tag -n
```

[Here][sotag] is the [documentation][tagnum] on using the **n\<num\>** flag when displaying git tags: _n\<num\> specifies how many lines from the annotation, if any, are printed when using -l. The default is not to print any annotation lines. If no number is given to -n, only the first line is printed. If the tag is not annotated, the commit message is displayed instead._

You should also merge your latest **Address Maven** back into Master.

## PropTypes

Make sure you have included PropTypes in [AddressShow][asp].

<!-- Elven Links -->

[ab]: http://www.material-ui.com/#/components/app-bar
[am1]: https://youtu.be/aLcTr_G5xcI
[am2]: https://youtu.be/PgMfki8-9ro
[asp]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactAddressShow.html#proptypes
[mi]: http://www.material-ui.com/#/components/menu
[dr]: http://www.material-ui.com/#/components/drawer
[limu]: https://www.material-ui.com/#/
[mi]: http://www.material-ui.com/#/components/menu
[muid]: https://s3.amazonaws.com/bucket01.elvenware.com/images/address-material-darker.png
[muit]: http://www.material-ui.com/#/customization/themes

[muitp]: https://material-ui-next.com/api/mui-theme-provider/
[ge-ab]:https://s3.amazonaws.com/bucket01.elvenware.com/images/address-material-get-file.png
[gem]:https://s3.amazonaws.com/bucket01.elvenware.com/images/address-material-address.png
[sotag]: https://stackoverflow.com/a/14102299/253576
[tagnum]: https://git-scm.com/docs/git-tag#git-tag--nltnumgt
