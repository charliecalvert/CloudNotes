## Overview

The goals of this assignment are:

- Create a menu, no matter how limited
- Switch views between **AddressShow**, **AddressEdit** and **SmallNumbers**

## React Router Install

We will use a tool called **react-router** to help us both route user selections through the application and also to switch between views. When we switch between views we frequently display a particular component and hide other components. This kind of technology is often talked about as a Single Page App, or SPA.

The first step is to install the library we will use to help us accomplish our goals:

```bash
npm install --save react-router-dom
```

As you know, this will both install the **react router** and also place an entry for it in **package.json**. If you do this at school, then later pull your changed **package.json** and other files down to your home machine, you will need to run **npm install** on your home machine's updated project folder.

**NOTE** _Running **npm install** in this situation usually does not result in our completely reinstalling all packages on our home machine, but only that the new **react router** package is installed on our home machine._

## Strategy

We want to be able to display either the **AddressShow** component, or the **AddressEdit** component or the SmallNumbers component.

![AddressShow][add-show]

**IMAGE** _AddressShow with paragraph elements_

![AddressEdit][add-edit]

**IMAGE**: _Address Edit with input elements_

![SmallNumbers][add-sm]

**IMAGE**: _Small Numbers, our hello world._

All this is well and good, but we have a problem. Our current architecture has us showing both the **AddressShow** and the **AddressEdit** component from the **Address** component. In particular, reclass this bit of code found in our current implementation of **Address**:

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
               <AddressShow
                   address={this.state.address}
                   onAddressChange={this.onAddressChange}
               />
           </div>
       );
   }
```

Here we have the **Address** component displaying both **AddressShow** and **AddressEdit**. So far, that has been fine, as we only wanted to prove to ourselves that we could display them. But now, we want to show them one at a time.

The solution I have chosen, and there are many possible solutions, is to let **Address** continue to display **AddressShow**, bit to create a new specialization of **Address** called **AddressChanger**. It will extend **Address**, but display not **AddressShow** but **AddressEdit**.

**NOTE**: _Hopefully we can come up with a better naming scheme at some point. For now, I'm choosing the word **AddressChanger** because it captures that idea that this component can change, can edit, the values in an address._

## Address Changer

To create **AddresChanger**, first make a copy of **Address**. Have the component extend Address rather than **Component**:

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

## Define a Menu

At this stage, we have three components that can render the separate views that we want to display:

- Address renders the **AddressShow** view
- **AddressChange** renders the **AddressEdit** view
- And **SmallNumbers** renders **getNine** and similar views.

The next step will be for us to define a menu that will allow us to switch between these views. We will do this in a file called **components/ElfMenu.js**.

**NOTE**: _I call it **ElfMenu** rather than **Menu** in part because the word Menu is such a common word that it is likely to collide with some other name in our program or in the global name space. In particular, **Menu** is an element in HTML._

Start just with a sparsely populated class that brings in one class from **react router** called Router:

```javascript
import React, {Component} from 'react';
import Address from './Address';
import AddressChanger from './AddressChanger';
import SmallNumbers from './SmallNumbers';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import '../css/App.css';

class ElfMenu extends Component {

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
<Route path="/edit" component={AddressChanger}/
```

Note that the home path has the word **exact** in front of it. This is because other paths, such as **/edit** contain both the **/** and the **/edit** paths. So we say that we want an exact match on **/** not a match on either **/** or **/edit**.

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
