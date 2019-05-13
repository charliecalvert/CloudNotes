# React Address Menu

The goals of this assignment are:

- Create a menu, no matter how limited
- Switch views between our **Go** and **First** components.

A silent video showing what we want to do:

<iframe width="560" height="315" src="https://www.youtube.com/embed/4y62k7UrSh0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Tag

Before working on the assignment, do this:

```
$ git tag -a v6.0.0 -m "Add menu to address simple"
git push origin v6.0.0
```

Once you are ready to turn in assignment, do this to mark the commit that contains your finished code. First add, commit and push your repo, then tag it:

```
git tag -a v6.0.X -m "Address Menu Assignment Complete"
```

Here we are using version 6 to say we did this work in the sixth week of the quarter. The X starts at zero, and increments each time you create a new tag for week 6. For instance:

```
v6.0.0
v6.0.1
v6.0.2
etc
```

One you have created the tag, push it to your GitHub repo with this code:

```
git push origin v6.0.X
```

Again, substitute the exaction version number that you want to push for the letter X. For instance:

```
git tag -a v6.0.1 -m "Address Menu Assignment Complete"
git push origin v6.0.1
```

To view your tags, type this:

```
git tag -n
```

To go back to the tag later do this:

    git co -b tagcheck v6.0.0


## Install

Install **material-ui**:

    npm i @material-ui/core @material-ui/icons

Also, be sure you have prop types:

    npm i prop-types

## Strategy

We want to be able to display either the **Go** component, or the **First** component.

Our current architecture has us showing either the **Go** or the **First** component from the **control** file. We want to be able to display two components at once. In particular, we want to be able to do something like this:

```javascript
render() {       
       return (
           <div>
              <First/>               
              <Go/>               
           </div>
       );
   }
```

## Create App

Let's begin by creating a new component called **App.** From the WebStorm menu, select **File | New | JavaScriptFile**. Save the file as **/source/App.js**.

Insert a very simple component in it:

```javascript
import React, {Component} from 'react';

class App extends Component {
    render() {
        return (
            <div>
                <First/>  
                <Go/>                
            </div>
        );
    }
}

export default App;
```

For the above code to work, you will need to add two import statements. I'll leave that up to you.

Take a moment to study the code found in **App**. Notice that after that the **return** statement we have an open parenthesis. In general, we surround our JSX with parenthesis rather than curly braces. Also note that we wrap our two components in a DIV. As mentioned earlier, this is because the render method is expected to return a single entity. Rather than returning **Go** and **First**, which would be two items, we wrap them both in a DIV and then return the DIV. Thus we are returning a single item, even if that single DIV we return wraps two components.

Now turn to **control.js**. Instead of having **ReactDOM** render **Go**, change the code so that it renders our new **App** component. Again, I'll leave that up to you.

Viewing serveral components on one "page":

![Two Components at Once][tcao]

[tcao]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-menu-first-go.png

**IMAGE**: _We see **First** and **Go** on a single page._

Here we have the **App** component displaying several other React components. To get this display, I added an H2 element with the text **First Component** to the **First** component. To do this, you have to obey the rules about returning only a single item that were discussed earlier in this section of the text. I also change the H1 element in **Go** to an **H2**.

## Define a Menu

The code shown in screenshot shown above is nice enough, but now, we want to show our **First** and **Go** components one at a time. We want to allow the user to switch between them.

**NOTE**: _Most React applications solve this problem by creating a Single Page App, or SPA. There are, however, a number of complications and problems that arise when we use a SPA. As a result, I teach a technique for creating multipage apps in this course, and reserve SPAs for my Bachelor level courses. It is good to know both techniques as they each have advantages. An important advantage of multipage apps is that they can help you get better scores from Google and other SEO drivers. In other words, they can help you market your website._

Our solution for this problem, and there are many possible solutions, is to use the use a menu from the material-ui library and a trick that helps us launch one page at a time when the user makes a selection from the menu.

Our menu will allow us to switch between the **Go** and **First** views. We will also modify **App** so that it becomes a nascent Home page.

We will do this in a new file called **components/ElfHeader.js** and in **components/control.js**.

**NOTE**: _I call it **ElfHeader** rather than **Header** in part because the word **Header** is such a common word that it is likely to collide with some other name in our program or in the global name space. In particular, **header** is an element in HTML 5._

## Create the Menu

First, install some tools so we can use **material-ui** to display a menu. We also add **file-loader** to help us load a PNG file.

    npm install @material-ui/icons @material-ui/core file-loader

Let's write code in a new file called **source/ElfHeader.js** to display the simple menu. Create the file and then put the boilerplate code from the [MaterialUiElfHeader gist](https://gist.github.com/charliecalvert/5cff61d7888cfd4097076835c5bc45c2) in it. Around line 55, change the title to include our app name and your last name:

    GitExplorer => Simple Address LastName

**NOTE**: _When trying to select code from a gist, it is often best to press the RAW button to get an unadorned view of the code._

Create a file called **source/tileData.js** and put the contents of the [MaterialUiTileDataListItem gist](https://gist.github.com/f74265a2711a5e4252db88ff53cd44cc.git) in it.

Modify **tileData.js** so that it displays three menu items:

- Home
- Go
- First

Set the paths as follows:

| Component | Path   |
|:----------|:-------|
| Home      | /worker?title=App      |
| Go        | /worker?title=Go    |
| First     | /worker?title=First |

For instance:

```JavaScript
<ListItemLink button component="a" href="/worker?title=First">
```

In this code we are setting up a situation where we can pass a query to the server. In this case, we are stating that the query contain a parameter called **title** that is set to the value First. We will use this data on the server, in the file called **routes/index.js**.

## Display Pages

This code will allow us to switch between the **Go** and **First** components when they are selected from the menu.
```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import ElfHeader from './ElfHeader';
import Go from './Go';
import First from './First';
import App from './App';

const APPS = {
    Go,
    First,
    App
};

function renderAppInElement(choice) {
    var AppTool = APPS[choice.dataset.app];
    if (!AppTool) return;

    // get props from elements data attribute, like the post_id
    const props = Object.assign({}, choice.dataset);

    ReactDOM.render(<AppTool {...props} />, choice);
}

window.onload = function() {

    ReactDOM.render(
      <ElfHeader/>,
      document.getElementById('root')
    );

    document
        .querySelectorAll('.__react-root')
        .forEach(renderAppInElement);
};
```

And our code in **views/worker.pug**:

```nohighlighting
extends layout

block content

    #root

    .__react-root(id= title data-app= title)

    script(src="bundle.js")
```

This code will set the **id** and **data-app** attributes of a DIV decorated with the class name **.__react-root** to the value of the title we set in **routes/index.js**. In other words, we are using templating to change this value so that our app will know which component to show.

Here is most of the code for our new endpoint in **routes/index.js**:

```JavaScript
router.get('/worker', (request, response) => {
    response.render('worker', {
        title: WHAT_GOES_HERE
    });
});
```

I have left one challenge for you. When trying to set the **title**, recall what you know about passing queries to a server. Recall that in **tileData** we defined **worker** route that took a query parameter called **title**. Use the **request** object to access the value of title and assign it to the title property in the second parameter of the call to **render**. As an FYI, I'll remind you that the first parameter of the call to render is the name of the PUG file that we want to _render_ into HTML.

Finally, let's make a change to **views/index.pug** to allow us to bootstrap the app the first time it loads:

```nohighlighting
extends layout

block content

    #root

    .__react-root(id="App" data-app="App")

    script(src="bundle.js")
```

This code is used by **control.js** to load the **App** component the first time it is loaded. We should also undo our previous work in **App.js** since we now have another way to load **Go** and **First**:

```javascript
import React, {Component} from 'react';
import logo from './images/tree-of-life.png';

class App extends Component {
    render() {
        return (
            <div>
                <h2>Welcome Home</h2>
                <img src={logo} className="App-logo" alt="logo"/>
            </div>
        );
    }
}

export default App;
```

## Clean up

To display the menu correctly we need to clean some things up.

Remove this code from **views/index.pug**:

    h1= title
    p Welcome to #{title}

Set the padding in **public/stylesheets/style.css** to 0:

```css
body {
  padding: 0px;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
}
```

## Add Material Button

Let's style our button in **Go.js** the material-ui look and feel. Import the button from the material library and display it:

```javascript
import Button from '@material-ui/core/Button';

// CODE OMITTED HERE

<Button
    variant="contained"
    color="primary"
    data-url="/git-gist-you-rang"
    onClick={event =>
        this.elfQuery('/foo', this.setFooData, event)
    }
>
    Query Foo
</Button>
```

The properties of the button are [pretty self explanatory](https://material-ui.com/demos/buttons/).

## Click Doesn't Work {#no-click}

This line in your tests might begin to fail:

```javascript
wrapper.find('button').simulate('click');
```

To fix the problem, add an **id** field in your buttons in **Go.js**:

```javascript
<Button
    id="elfQueryAction"
    variant="contained"
    color="primary"
    data-url="/git-gist-you-rang"
    onClick={event =>
        this.elfQuery('/foo', this.setFooData, event)
    }
>
    Query Foo
</Button>
```

And then use the ID in your test:

```javascript
wrapper.find('#elfQueryAction').simulate('click');
```

## Load an Image

You can download the tree of life into a directory called **source/images** like this:

    wget https://s3.amazonaws.com/bucket01.elvenware.com/images/tree-of-life.png

There are three steps involved:

- Create the **images** directory
- Navigate into it
- Issue the **wget** command

Note that the Tree of Life is a PNG file, not an SVG. You should, therefore replace the extension in the appropriate line near the top of **ElfHeader** and play with the relative path to its location.

```javascript
import logo from './images/tree-of-life.png';
```

Here is the Tree of Life.

![Tree of Life no-size](https://s3.amazonaws.com/bucket01.elvenware.com/images/tree-of-life.png)

To load the image, you need to add a new rule to webpack. The rule looks like this:

```javascript
{
    test: /\.(png|jpe?g|gif|svg)$/,
    use: [
        {
            loader: 'file-loader',
            options: {},
        },
    ],
}
```

The symtax in Webpack is tricker. Therefore I will show you the same code again, but this time in context. I'm trying to show you where in **webpack.config.js** you want to put the next rule. It belongs in the **rules** property of the **module** section. So we do it like this:

```javascript
module: {
    rules: [
        {
            test: /.js?$/,
            exclude: /(node_modules|bower_components)/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            ]
        },
        {
            test: /\.(png|jpe?g|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {},
                },
            ],
        },
        {
            test: /\.svg$/,
            use: [{
                loader: 'svg-inline-loader',
                options: {}
            }]
        }
    ]
}
```

Now there are two rules in webpack, one for loading babel and one for loading images.

The above needs to be done one time. After that, you can load images easily from your bundle. For instance, you can add this code to **App.js**:

```javascript
import logo from './images/tree-of-life.png';

<img src={logo} className="App-logo" alt="logo"/>
```

After making the updates, if you program is running (npm start) stop it with **Ctrl-C** and start it again.

## Tests

We should now make sure we have tests for the App component.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
configure({ adapter: new Adapter() });

describe('Go Tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders and reads H1 text', () => {
        const wrapper = shallow(<App/>);
        // console.log(wrapper.debug());
        const welcome = <h1>Address Simple Home</h1>;
        expect(wrapper.contains(welcome)).toEqual(true);
    });

});
```

## Images in Tests

We have to take an [extra step][unites] to test components that contain images. Create a new directory in the root of your project called **\_\_mocks\_\_**. Thats underbar, underbar, mocks, underbar, underbar.

In it, put two files:

- styleMocks.js
- fileMocks.js

In **styleMocks** put only this:

    module.exports = {};

In **fileMocks**, put only this:

    module.exports = 'test-file-stub';

Then add this to the bottom of your package.json file:

```json
"jest": {
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  }
}
```

Now, whenever a test tries to load an image, it will load a _mock_ empty file instance. This is fine in tests, since we don't usually need to actually do anything with the image itself in a test.

## Fill Menu

Your goal will be to fill in the menu for all the components we have created. When the program starts, none of them are visible, just the the area where we display data:

![Menu Open no-size](https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-menu-open.png)

**IMAGE**: The menu. First item is sort of home, the rest point to various components. (We will do login later. You can ignore it.)

![Home View no-size](https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-menu-home.png)

**IMAGE**: The home menu selected. (No components chosen)

![Test Routes no-size](https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-menu-go.png)

**IMAGE**: Go with material-ui buttons

![Git Menu no-size](https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-menu-first.png)

**IMAGE**: Go selected from menu


## Turn it in

Add, commit, push, tag and/or branch. When you submit the assignment, let me know what tag and/or branch you used when submitting the assignment.

## Images for Header

I found images here:

- <https://pixabay.com/en/gold-fish-aquarium-goldfish-fins-30831/>
- <https://pixabay.com/en/goldfish-fins-tropical-animal-47022/>
- <https://commons.wikimedia.org/wiki/File:Small_SVG_house_icon.svg>
- <https://commons.wikimedia.org/wiki/File:Flower-of-Life-91circles36arcs.svg>
- <https://commons.wikimedia.org/wiki/File:Tree-of-Life_Flower-of-Life_Stage.svg>

Try also, this search in Chrome/Chromium:

```
https://www.google.com/search?q=svg+free+small
```

In the browser, turn to the images page. Select tools, and select **Labeled for non-commercial reuse** or something similar.


## The Main Index

Remember that we have fundamentally changed the structure of our program. Our **src/index.js** entry point file should no longer be responsible for showing **Address**, and **GetFile**. Instead, it should show only **App**.

Here is our modified **index.js** file:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div>
        <App />        
    </div>,
    document.getElementById('root')
);

registerServiceWorker();
```

**NOTE**: _A crucial point, in fact, probably the central point, of this class, is how easy it is for us to move classes and views around when we use the **React** architecture. Yes, it is hard to get up to speed on React, and yes, it is a fairly complex tool. But once you have everything set up, making relatively large changes to our program's architecture are simple. The small, focused loosely coupled components that we have created give us the flexibility to accept changes in specifications with a minimum of disruption._


- <https://www.google.com/search?q=Understanding+File+and+Directory+navigation>

[add-show]: https://s3.amazonaws.com/bucket01.elvenware.com/images/address-menu-no-style.png


[add-edit]: https://s3.amazonaws.com/bucket01.elvenware.com/images/address-menu-debug.png

[add-sm]: https://s3.amazonaws.com/bucket01.elvenware.com/images/address-menu-styled.png

[rr]: https://github.com/ReactTraining/react-router

[rrd]: https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom

[rrn]: https://github.com/ReactTraining/react-router/tree/master/packages/react-router-native

[rrdstm]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptReactMenu.html#style-the-menu

[unites]: https://jestjs.io/docs/en/webpack#handling-static-assets
