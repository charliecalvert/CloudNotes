# React Bootstrap

It's time to tweak our apps appearance so that it works on a phone. We will use bootstrap to help us achieve our goal.

## Get started

The first thing we want to do is to [install Bootstrap].

```
npm install --save bootstrap
npm install --save react-bootstrap
npm install --save react-router-bootstrap
```

Then in **index.js**, we load some bootstrap css:

```javascript
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
```

## container

The next step is to ensure all your code is included in a bootstrap **container**. The simplest thing might be to put it in the outer div in **DataMaven**:

```javascript
render() {
    return (

            <div className="container">
                <ElfMenu />
                // AND SO ON
            </div>
    )
}
```

## The header

We will now begin using some bootstrap components. If you are not familiar with bootstrap, you should visit their website and get up to speed with it as best you can. Even if you do know bootstrap, you should continuously be going back to both their reference page for components and for css:

- [Bootstrap Home](http://getbootstrap.com/)
- [Bootstrap Components](http://getbootstrap.com/components/)
- [Bootstrap CSS](http://getbootstrap.com/css/)

You probably noticed that we installed something called **react-bootstrap**. This library is currently under construction, but it will allow us to use bootstrap in our JSX.

**NOTE**: _It is possible that I will give up on **react-bootstrap** after a time, but let's try it for now._

The **react-bootstrap** package turns bootstrap components in JSX components. Lets start working with it by using the **Jumbotron** in our header:

```javascript
import React, {Component} from 'react';
import logo from '../images/goldfish.svg';
import {  Jumbotron } from 'react-bootstrap';

class ElfHeader extends Component {

    render() {

        return (
            <div>

            <Jumbotron>

                <div>
                    <img src={logo} className='App-logo' alt='logo'/>
                    <h2>Welcome to Prog272</h2>
                </div>

            </Jumbotron>
            </div>
        );
    }
}

export default ElfHeader;
```

Notice that we import **Jumbotron**:

```javascript
import {  Jumbotron } from 'react-bootstrap';
```

We can then use it just as we would any other JSX class. After applying it, look at your app in the browser. It's going to take awhile to get it looking as we would wish, but this is a start.
