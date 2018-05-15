## React Material Bits and Pieces

DON'T EDIT. COMPARE THIS TO REACT ADDRESS MATERIAL. 

The Goal is to add Material-UI to our application to gussy up the menu and give our app a more standard appearance.

![Git Explorer App Bar][ge-ab]

**IMAGE**: _Git Explorer with an AppBar on top_

![Git Explorer Menu Open][gem]

**IMAGE**: _Git Explorer with the menu open. We combine a [Material-UI][limu] [AppBar][ab] and [Drawer][dr] to make the menu._

## Get Started

Link in [Material-UI][limu].

```bash
npm install --save material-ui
```

I'm not sure this is necessary, and of course we not using Pug in this project:

```
link(rel="stylesheet", href="https://fonts.googleapis.com/css?family=Roboto:300,400,500")
link(rel="stylesheet", href="https://fonts.googleapis.com/icon?family=Material+Icons")
```

## Create Menu

In **ElfHeader**:


```javascript
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
```

In the render method:

```javascript
<AppBar
	title="GitExplorer"
	iconClassNameRight="muidocs-icon-navigation-expand-more"
	onLeftIconButtonClick={this.handleToggle}
/>
```

A method of **ElfHeader**:

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

```javascript
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

<!-- Elven Links -->

[ab]: http://www.material-ui.com/#/components/app-bar
[mi]: http://www.material-ui.com/#/components/menu
[dr]: http://www.material-ui.com/#/components/drawer
[limu]: https://www.material-ui.com/#/
[ge-ab]:https://s3.amazonaws.com/bucket01.elvenware.com/images/git-explorer-mui-app-bar.png

[gem]: https://s3.amazonaws.com/bucket01.elvenware.com/images/git-explorer-mui-menu.png
