## Overview

Use Rest with React.

## Get Started

Create a directory called week02-rest-basics in your Repository.

**NOTE**: _Let's try switching to all small letters for now, since npm is getting fussy about this issue._

## Create Server

CreateAllExpress server

Let's put our server api in its own file. In **routes** folder create **api.js**:

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

Now we need to link in this new file. You know how to do this, but just to remind in: in app.js around lines 10 and 28:

```javascript
var api = require('./routes/api');
app.use('/api', api);
```

Set the port, in **bin/www**, to **30026**.
If you want, go ahead and start it:

```
npm start
```

## Create Client

You'll need to create a new bash tab, since the one we were using is now busy: CTRL-SHIFT-T. While still in **week02-rest-basics**, create your client:

```
create-react-app client
cd client
npm run eject
```

The last command, which we probably won't use very often, creates a **scripts** directory and modifies **package.json**. Look at **package.json** to see the relationship between the two.

**NOTE**: _Don't forget to set the **Settings | Languages and Frameworks | JavaScript** to **React JSX** Also, copy in **.jscsrc** from the **server** project._

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
