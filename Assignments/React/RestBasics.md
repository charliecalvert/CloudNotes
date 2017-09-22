# Rest Basics

Use Rest with React.

## Get Started

Create a directory called week02-rest-basics in your Repository.

**NOTE**: _Let's try switching to all small letters for now, since npm is getting fussy about this issue._


## Create Project Directory

We are going to have two projects in this assignment, so lets set up a directory for them. Navigate to the root of your repository and enter the following commands:

```
mkdir RestBasics
cd RestBasics
```

## Create Server

In the **RestBasics** directory, run the following command:

  CreateAllExpress server

Let's put our server api in its own file. In the **routes** folder create a file called **api.js**:

```javascript
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/foo', function(request, response, next) {
    var message = { 'result': 'success', 'foo': 'bar', 'file': 'api.js' };
    console.log('Foo called on server with message:', message);
    response.send(message);
});

module.exports = router;
```

Now we need to link in this new file. You know how to do this, but just to remind in: in **app.js** around lines 10 and 28:

```javascript
var api = require('./routes/api');  // on line 10
app.use('/api', api);               // on line 20
```

The first line just allows us to gain access to our new file: it links it into our project. The second line states what we want to do: _we want to **use** it as middleware._

Now set the port, in **bin/www**, to **30026**. We are going to run the client on port 30025, so we are setting the port for the server to some other number. I've chosen 30026 in the hopes that it will be easy to remember.

If you want, go ahead and start your new server:

```
npm start
```

## Create Client

You'll need to create a new bash tab, since the one we were using is now busy: CTRL-SHIFT-T. While still in **week02-rest-basics**, create your client:

```
create-react-app client
cd client
```

**NOTE**: _Though I don't recommend it, and in fact recommend that you don't do it, if you are terminally curious, you can run this command: npm run eject. The command, which you should not use very often, exposes the inner workings of **create_react_app**. In particular, it creates a **scripts** directory and modifies **package.json**. Look at **package.json** to see the relationship between the two. Rather than do this with a project that you might want to keep, I would do create a temporary project, and try this command there. It's interesting to learn more about **create-react-app**._

**NOTE**: _Don't forget to set the **File | Settings | Languages and Frameworks | JavaScript** to **React JSX**_

**NOTE**: _Some students may want to copy in **.jscsrc** from the **server** project._

In **package.json**, just before the dependencies section, add this:

```javascript
"proxy": "http://localhost:30026",
```

This tells our react app to forward requests for REST calls to our Express Server running on port 30026. See code in **scripts/start.js** for more details.

Install **fetch**, which we will use in lieu of **$.ajax** or **$.getJSON**. The **fetch** call is part of the ES6 standard, though it is not finalized anywhere yet, as far as I know.

```
npm install --save whatwg-fetch
```

I believe you also need to add it to **config/webpack.config.dev.js** in the **entry** property:

```javascript
entry: [
    'whatwg-fetch',
    ... and so on
]
```

And here is **app.js**:

```javascript
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';

class App extends Component {
    constructor() {
        super();
        this.state = {
            file: 'Get Nine Result will be placed here.',
            foo: 'waiting for server'
        };
    }

    bar = () => {
        const that = this;
        fetch('/api/foo')
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                console.log('parsed json', json);
                that.setState(foo => (json));
            }).catch(function(ex) {
                console.log('parsing failed', ex);
            });
    };

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>

                <p className="App-intro">
                    state: {this.state.foo} file: {this.state.file}
                </p>
                <button onClick={this.bar}>Bar</button>
            </div>
        );
    }
}

export default App;
```

## Turn it in

Push, submit.
