# React Address Menu

The goals of this assignment are:

- Create a menu, no matter how limited
- Switch views between our **Go** and **First** components.

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

## Install

Install **material-ui**:

    npm i @material-ui/core @material-ui/icons

Also, be sure you have prop types:

    npm i prop-types;

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

Let's write code in **ElfHeader** to display the simple menu shown in the screenshots visible above. Don't fuss over the fact that the menu looks funky at this point. We can fix that later by adding some CSS. Right now, just focus on getting things working:

```javascript
import { Link } from 'react-router-dom';
<div>
  <div className="App">
      <ul>
          <li><Link to="/">Address</Link></li>
          <li><Link to="/get-file">Get File</Link></li>          
      </ul>
  </div>                
</div>
```

Here we use a class from **react router** called **Link**. It automatically creates links from the elements we pass to it. For instance, it generates something like this:

```HTML
<li><a href="/edit">AddressEdit</a></li>
```

## BrowserRouter

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import ElfHeader from './ElfHeader';
import Go from './Go';
import First from './First';

const APPS = {
    Go,
    First
};

function renderAppInElement(choice) {
    var App = APPS[choice.dataset.app];
    if (!App) return;

    // get props from elements data attribute, like the post_id
    const props = Object.assign({}, choice.dataset);

    ReactDOM.render(<App {...props} />, choice);
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

And our pug:

```nohighlighting
extends layout

block content

    #root

    .__react-root(id= title data-app= title)

    script(src="bundle.js")
```
## Style the Menu

Let's add some styling to our menu to make it look prettier. I've also modified **App.css** to chang the color of the Header. Read about it [here][rrdstm].

![Address Menu Styled][add-sm]

**IMAGE**: _The styled menu appears at the top in brown. Compare to the non-syled menus shown at the beginning of the assignment which appear as list items._

Note that you can see **/git-file** URL in the address bar:

    http://localhost:30025/get-file

This is one of the benefits of **React Router**. It allows a user to bookmark a particular screen in your application. In this case the URL shown above should always lead to the **GetFile** component shown in the above screenshot.

## Tests

We should now make sure our tests are working.

We should wrap our Header in a **MemoryRouter** when doing the renders without crashing test because it use ReactDOM:


```javascript
import {MemoryRouter} from "react-router-dom";

// CODE OMITTED

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><ElfHeader /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});
```

You probably won't need this for other tests of on ElfHeader. It's calling ReactDOM **render** that triggers the need.

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

## Hint

If you needed to pass props to your router, and we don't, you would do it like this:

```javascript
<Route path="/about"
       render={(props) => (<AddressShow  {...props}
                 address={this.props.address}
                 onAddressChange={this.props.onAddressChange}
       />)}
/>

<Route path="/topics"
    render={(props) => (<AddressEdit  {...props}
         address={this.props.address}
         onAddressChange={this.props.onAddressChange}
         onNameChange={this.props.onNameChange}
    />)}
/>
```

This code is not nearly as simple as the code we used when defining our Routes. However, it works, and once written we won't need to fuss with it very often.

## Hints and Suggestions

Here are two ways to rename App.js to **GetFile.js**:

```
git mv App.js GetFile.js
git mv App.js components/App.js
```

The exact command you give depends on:

- Your current directory.
- Whether **App.js** is currently in your **src** directory or the **components** directory.

If you can't figure out what to do with these hints, you simply must take time to get a better understanding of the file system and how it works. Beyond these broad hints, my simply giving you the right answer will not help you learn. Unfortunately, going into a tutorial on the file system would be to venture well outside the scope of this course. There are, however, many in depth discussions of this topic on the web and in the library.

- <https://www.google.com/search?q=Understanding+File+and+Directory+navigation>

[add-show]: https://s3.amazonaws.com/bucket01.elvenware.com/images/address-menu-no-style.png


[add-edit]: https://s3.amazonaws.com/bucket01.elvenware.com/images/address-menu-debug.png

[add-sm]: https://s3.amazonaws.com/bucket01.elvenware.com/images/address-menu-styled.png

[rr]: https://github.com/ReactTraining/react-router

[rrd]: https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom

[rrn]: https://github.com/ReactTraining/react-router/tree/master/packages/react-router-native

[rrdstm]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptReactMenu.html#style-the-menu
