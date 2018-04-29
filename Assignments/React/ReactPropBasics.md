## Overview

Properties are like state, but they are passed down from a component higher in the component hierarchy. Thus we can define a property in one place, but use it in multiple components without having to redeclare it, or having to perform other gymnastics.

## Understanding Props

Let's see it in action. First create a default React project in the root of your repository where you can muck about with properties:

```bash
create-react-app week04-prop-basics
```

Modify **App.js** to use a property called testProp in the JSX

```javscript
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <p>My prop: {this.props.testProp}</p>  <=== THIS LINE ===<
            </div>
        );
    }
}

export default App;
```

The only change it **App.js** is to add this one line which uses a property:

```javscript
<p>My prop: {this.props.testProp}</p>
```

Now let's define the property in index.js and pass it down to App.js:

```javscript
ReactDOM.render(
    <App testProp={2} />,
    document.getElementById('root')
);
```

As you can see, we pass a "parameter" or attribute to App. It defines the value of the testProp property we use in App.js.

We could also do this in index.js:

```javscript
const myProps = {
    testProp: 3
};

ReactDOM.render(
    <App myProps={myProps} />,
    document.getElementById('root')
);
```

And add this in App.js:

```javscript
<p>My prop: {this.props.myProps.testProp}</p>
```

## Add PropTypes

We can get some runtime type checking for our properties with [PropTypes][ptrt].

![PropType warnings at run time][ptwrt]

It is very important that we always keep the Developer Tools (F12 or Ctrl-Shift-I) open when we are running our programs. If we do so, we will see runtime errors in the Console pane, and see a little red icon indicating that there are warnings or errors when we are on that page or some other page. You can see both the warning and the small circular icon with the x in the above screenshot. I'm running Chrome in this example, but the warning is also clearly visible on the console page in Firefox.

Install the **prop-types** package:

```bash
npm install --save prop-types
```
Do this at the top of App.js:

```javascript
import PropTypes from 'prop-types';
```

And then at the bottom of App.js:

```javascript
App.propTypes = {
    appInit: PropTypes.shape({
      testProp: PropTypes.number
    })
};
```

You should install **PropTypes**:

```bash
npm install --save prop-types
```

## Do Something on Your Own

The only work you need to is modify **index.js** and **App.js** so that **App** takes two props, and can display both the values 2 and 3 on separate lines in the final product.

![React Props Basics][rpb]

[rpb]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-props-basics.png

For instance, pass in both of these variables to App.js as props:

```javascript
const myProps = {
    testProp: 3
};

const testProp=2;
```

Now change **ReactDom.render** so that it instantiates **App** and takes both variables as **parameters**, as **attributes**.

## Turn it in

Push your work specify the follwoing when you turn it in:

- Branch (If relevant)
- Folder

[ptrt]: https://github.com/facebook/prop-types

[ptwrt]: https://s3.amazonaws.com/bucket01.elvenware.com/images/prop-types-runtime.png
