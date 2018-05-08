# React Address Menu

The goals of this assignment are:

- Create a menu, no matter how limited
- Switch views between **AddressShow**, **AddressEdit** and **SmallNumbers**

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

**IMAGE** _AddressShow with paragraph elements_

![AddressEdit][add-edit]

**IMAGE**: _Address Edit with input elements_

![SmallNumbers][add-sm]

**IMAGE**: _Small Numbers, our hello world._

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

- Address renders the **AddressShow** view
- **GetFile** renders the simple file-url view.
- **ElfHeader** displays the header seen at the top of the page. We will modify this file to display our menu.

We will define a menu that will allow us to switch between these views. We will do this in the files called **components/ElfHeader.js** and **components/App.js**.

**NOTE**: _I call it **ElfHeader** rather than **Header** in part because the word Menu is such a common word that it is likely to collide with some other name in our program or in the global name space. In particular, **header** is an element in HTML 5._

Start just with a sparsely populated class that brings in one class from **react router** called Router:

```javascript
import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom'

class ElfHeader extends Component {

    render() {
        return (
            <Router>    
            </Router>
        );
    }
}

export default ElfMenu;
```

In the above code I've imported **React** and the classes I want to display, as well as the **react-router** code. As mentioned above, the **<ROUTER>** class comes from **react router**.

We'll focus only on the **render** method, since the rest of the code in our file stays the same throughout this exercise.

Let's write code to display the simple menu shown in the screenshots visible above. Don't fuss over the fact that the menu looks funky at this point. We can fix that later by adding some CSS. Right now, just focus on getting things working:

```javascript
<div>
  <div className="App">
      <ul>
          <li><Link to="/">AddressShow</Link></li>
          <li><Link to="/edit">AdressEdit</Link></li>
          <li><Link to="/small">SmallNumbers</Link></li>
      </ul>
  </div>                
</div>
```

Here we use a class from **react router** called **Link**. It automatically creates links from the elements we pass to it. For instance, it generates something like this:

```HTML
<li><a href="/edit">AddressEdit</a></li>
```

Next, we define the **Route** itself. Here are the first two, you can create the third:

```javascript
<Route exact path="/" component={Address}/>
<Route path="/edit" component={AddressChanger}/>
```

Note that the home path has the word **exact** in front of it. This is because other paths, such as **/edit** contain both the **/** and the **/edit** paths. So we say that we want an exact match on **/** not a match on either **/** or **/edit**.


## Hints and Suggestions

Here are two ways to rename App.js to **SmallNumbers.js**:

```
git mv App.js SmallNumbers.js
git mv App.js components/SmallNumbers.js
```

The exact command you give depends on:

- Your current directory.
- Whether **App.js** is currently in your **src** directory or the **components** directory.

If you can't figure out what to do with these hints, you simply must take time to get a better understanding of the file system and how it works. Beyond these broad hints, my simply giving you the right answer will not help you learn. Unfortunately, going into a tutorial on the file system would be to venture well outside the scope of this course. There are, however, many in depth discussions of this topic on the web and in the library.

- <https://www.google.com/search?q=Understanding+File+and+Directory+navigation>

## Turn it in

Add, commit, push, tag and/or branch. When you submit the assignment, let me know what tag and/or branch you used when submitting the assignment.

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


## Address Changer

To create **AddresChanger**, first make a copy of **Address**. Have the component extend Address rather than **Component**. Be sure to change the component name and the thing it extends:

```javascript
class AddressChanger extends Address {
}
```

Strip out everything except **OnNameChange** and **render**. Edit **render** to look like this:

```javascript
render() {
    if (!this.quiet) { console.log("ADDRESS RENDER"); }
    return (

        <div className="App">
            <AddressEdit
                address={this.state.address}
                onAddressChange={this.onAddressChange}
                onNameChange={this.onNameChange}
            />

        </div>
    );
}
```

As you can see, this is one half of what we had in the **Address** render method.

Having done this, we can strip **AddressEdit** code from the **Address render** method. I'll you do that on your own. It only involves deleting existing code, so it is a relatively simple operation.

[add-show]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-menu-01.png
[add-edit]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-menu-02.png
[add-sm]:https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-menu-nine.png

## Tests

We should now make sure our tests handle the edits we have made.

## The Main Index

We are going to fundamentally change the structure of our program. This means, at least for now, that **index.js** should no longer be responsible for showing **AddressShow**, **AddressEdit** or **SmallNumbers**. Instead, it should show only **ElfHeader** and the class we will use to help us switch between component views. That class will be called **ElfMenu**.

Here is our modified **index.js** file:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ElfHeader from './components/ElfHeader';
import ElfMenu from './components/ElfMenu';

ReactDOM.render(
    <div>
        <ElfHeader />
        <ElfMenu/>
    </div>,
    document.getElementById('root')
);
```

**NOTE**: _A crucial point, in fact, probably the central point, of this class, is how easy it is for us to move classes and views around when we use the **React** architecture. Yes, it is hard to get up to speed on React, and yes, it is a fairly complex tool. But once you have everything set up, making relatively large changes to our program's architecture are simple. The small, focused loosely coupled components that we have created give us the flexibility to accept changes in specifications with a minimum of disruption._

[rr]: https://github.com/ReactTraining/react-router

[rrd]: https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom

[rrn]: https://github.com/ReactTraining/react-router/tree/master/packages/react-router-native
