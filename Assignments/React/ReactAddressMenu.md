# React Address Menu

The goals of this assignment are:

- Create a menu, no matter how limited
- Switch views between **AddressShow** and **GetFile**.

## Tag

Before working on the assignment, do this:

```
$ git tag -a v6.0.0 -m "In class work in Week06-InClass that gets AddressShow working"
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

## React Router Install

We will use a tool called [react-router][rr] to help us both route user selections through the application and also to switch between views. When we switch between views we frequently display a particular component and hide other components. This kind of technology is often talked about as a Single Page App, or SPA.

The first step is to install the library we will use to help us accomplish our goals:

```bash
yarn add react-router-dom

or:

npm install --save react-router-dom
```

**NOTE**: _Just to be sure you understand what is happening here, check your **package.json** to see that **react-router-dom** has been added to your **dependencies**:_

```javascript
"dependencies": {
    "react": "^16.3.2",
    "react-dom": "^16.3.2",
    "react-router-dom": "^4.2.2", <==== HERE
    "react-scripts": "1.1.4"
    // YOU MAY IMPORT OTHER PACKAGES
  },
```

As you know, this will both install the **react router** and also place an entry for it in **package.json**. If you do this at school, then later pull your changed **package.json** and other files down to your home machine, you will need to run **npm install** on your home machine's updated project folder.

**NOTE** _Running **npm install** in this situation usually does not result in our completely reinstalling all packages on our home machine, but only that the new **react router** package is installed on our home machine._

## Strategy

We want to be able to display either the **Address** component, or the **GetFile** component.

![AddressShow][add-show]

**IMAGE** _GetFile with the firefox Developer Tools debugger open._

![Address Get File][add-edit]

**IMAGE**: _Address Edit with input elements_

![Address Menu Styled][add-sm]

**IMAGE**: _A styled menu._

All this is well and good, but we have a problem. Our current architecture has us showing both the **Address** and the **GetFile** component from the **App** component. In particular, review this bit of code found in our current implementation of **Address**:

```javascript
render() {
       if (this.debug) { console.log("ADDRESS RENDER"); }
       return (
           <div className="App">
               <ElfHeader/>
               <GetFile/>
               <Address/>
           </div>
       );
   }
```

Viewing serveral components on one "page":

![Two Components at Once][tcao]

[tcao]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-two-components.png

**IMAGE**: _We see **ElfHeader**, **GetFile** and **Address** on a single page._

Here we have the **App** component displaying several other React components. So far, that has been fine, as we only wanted to prove to ourselves that we could display them. But now, we want to show them one at a time.

The common solution for this problem, and there are many possible solutions, is to use the tool we call [react-router-dom][rrd].

**NOTE**: _A sister component by the same team, called [react-router-native][rrn] performs the same task on React Native._

## Define a Menu

At this stage, we have various components that can render the separate views that we want to display:

- Address renders the **Address** view
- **GetFile** renders the simple file-url view.
- **ElfHeader** displays the header seen at the top of the page. We will modify this file to display our menu.

Our menu will allow us to switch between the **Address** and **GetFile** views. We will do this in the files called **components/ElfHeader.js** and **components/App.js**.

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

Modify **App.js** to import two classes from **react router** called **BrowserRouter** and **Route**:

```javascript
// YOUR IMPORTS HERE
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <ElfHeader />
                    <Route exact path="/" component={Address}/>
                    <Route path="/get-file" component={GetFile}/>
                </div>
            </BrowserRouter>
        );
    }
}

// ETC ...
```

In the above code I've imported **React** and the classes I want to display, as well as the **react-router** code.

The following excerpt from the code shown above defines the client side routes that will be executed when the user makes selections from the menu:

```javascript
<Route exact path="/" component={Address}/>
<Route path="/get-file" component={GetFile}/>
```

In particular, the home page (**/**) leads to the **Address** component and the **/get-file** route leads to the **GetFile** component.

**Note**: _The home path has the word **exact** in front of it. This is because other paths, such as **/get-file** contains the **/** route. So we say that we want an exact match on **/** not a match on either **/** or **/get-file**._

## Style the Menu

Let's add some styling to our menu to make it look prettier. I've also modified **App.css** to chang the color of the Header. Read about it [here][rrdstm].

![Address Menu Styled][add-sm]

**IMAGE**: _The styled menu appears at the top in brown. Compare to the non-syled menus shown at the beginning of the assignment which appear as list items._

Note that you can see **/git-file** URL in the address bar:

    http://localhost:30025/get-file

This is one of the benefits of **React Router**. It allows a user to bookmark a particular screen in your application. In this case the URL shown above should always lead to the **GetFile** component shown in the above screenshot.

## Tests

We should now make sure our tests handle the edits we have made.

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
