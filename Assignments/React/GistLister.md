# Gist Lister

Create a Component that can list gists.

This component might also be used to delete and display the content of gists.

## GistLister Test Start

We test first. So create an initial test:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import {shallow} from 'enzyme';

describe('ElfHeader Suite', function () {

    it('renders the GistLister component without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<GistLister />, div);
    });

});
```

Get it to pass

## Title

Write a test to check for a title.

```javascript
it('renders and reads GistLister H2 text', () => {
    const wrapper = shallow(<GistLister />);
    elfDebugEnzyme.getAll(wrapper);
    const welcome = <h2>Gist Lister</h2>;
    expect(wrapper.contains(welcome)).toEqual(true);
});
```

Prove to your self that you have **elfDebugEnzyme** set up correctly. Before you add the header, it should produce something like this:

```html
<div className="App" />
```

Get it to pass.

## Writing Gist Lister

Start out with the simplest possible component. It should have an empty DIV in the render method. The constructor should use the **ElfLogger**. Something like this:

```javascript
imports here...
const logger = new ElfLogger('gist-lister');

class GistLister extends Component {
    constructor(props) {
        super(props);
        logger.log('Gist List Constructor');
    }

    render() {...}
}

export etc...
```

Set up the environment variable for the logger and test that ensure that your tests are working. Using 'p' to filter so that you are seeing only this one test suite, the output from the two loggers should look something like this when both tests are passing:

```
PASS  src/__tests__/GistLister.test.js
 ElfHeader Suite
   ✓ renders the GistLister component without crashing (5ms)
   ✓ renders and reads GistLister H2 text (3ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.369s, estimated 1s
Ran all test suites related to changed files.

Watch Usage
› Press a to run all tests.
› Press p to filter by a filename regex pattern.
› Press q to quit watch mode.
› Press Enter to trigger a test run.
 console.info src/elf-logger.js:49
   gist-lister Gist List Constructor  

 console.info src/elf-logger.js:49
   gist-lister Gist List Constructor  

 console.log src/ElfDebugEnzyme.js:30
   GistLister.test.js:
   <div className="App">
   <h2>
   Gist Lister
   </h2>
   </div>
```

## Test for a UL

```javascript
it('renders GistLister UL Element', () => {
    const wrapper = shallow(<GistLister />);
    elfDebugEnzyme.getElement(wrapper,'ul');
    //var a = wrapper.find('ul');
    //console.log(a.length);
    expect(wrapper.find('ul').length).toEqual(1);
});
```

## Query the List

Lets swtich to the server side for a second.

Create a file called **gists.js**. Rename **api.js** to **users.js**.

```javascript
me.listGists().then(function({data}) {
       console.log('USER PROMISE', data);
       const results = data.map((item) => ( {Return Object with 4 props} );
       response.status(200).send({
           'count': results.length,
           'result': results
       });
   }).catch(function(err) {
       console.log('USER Promise Rejected', err);
       response.status(500).send({'result': err});
   })
 });
```

## Jasmine

```javascript
npm install --save-dev supertest
npm install --save-dev jasmine
npm install --save-dev jasmine-spec-reporter
```

Here it is:

```javascript
var Jasmine = require('jasmine');
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var noop = function() {};

var jrunner = new Jasmine();
jrunner.configureDefaultReporter({
    print: noop
}); // remove default reporter logs
jasmine.getEnv().addReporter(new SpecReporter({  // add jasmine-spec-reporter
    spec: {
        displayPending: true
    }
})); // add jasmine-spec-reporter
jrunner.loadConfigFile(); // load jasmine.json configuration
jrunner.execute();
```

And put this in **spec/support/jasmine.json**:

```javascript
{
  "spec_dir": "spec",
  "spec_files": [
    "test-basic.js",
    "test-results.js"
  ]
}
```

The test:

```javascript
/**
 * Created by charlie on 10/7/15.
 */

var request = require('supertest');
var app = require('../app');

describe('Elvenware Simple Plain Suite', function() {

    'use strict';

    it('expects true to be true', function() {
        expect(true).toBe(true);
    });

    it('get the foo route', function(done) {
        request(app)
            .get('/foo')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                done();
            });
    });

});
```

Then run it:

```
$ node jasmine-runner.js
notoken
Spec started

  Elvenware Simple Plain Suite
    ✓ expects true to be true
GET /foo 200 7.146 ms - 52
    ✓ get the foo route

Executed 2 of 2 specs SUCCESS in 0.04 sec.

```

## Loggers

Many of us have been using **console.log** heavily in our routes. Now that we are running tests, we need to get more control over the amount of information we are sending to the console.

Copy the **elf-logger** over from the client and put it in the **routes** directory. It is set up to handle ES6, switch it to use **require** by changing the way it exports the **ElfLogger**. Instead of **export default**, write this:

```javascript
module.exports=ElfLogger;
```

You will probably need to end up inserting the logger in all our test files, and in each of the files in the **routes** directory. When setting up the Environment variable to use, use the name of the file itself as well as path to it:

```javascript
const Logger = require('../elf-logger');
var logger = new Logger('gitapi-gists');
```

Then, before you run the test, set the environment variable:

```
export REACT_APP_ELF_LOGGER='gitapi-gists'
nodemon jasmine-runner.js
```

In fact, we should put the test statement in our **package.json**:

```javascript
"scripts": {
  "test-karma": "karma start",
  "test": "nodemon jasmine-runner.js",
  "start": "nodemon ./bin/www"
},
```

I believe this also works on Linux, but not on Windows:

```javascript
"scripts": {
  "test-karma": "karma start",
  "test": REACT_APP_ELF_LOGGER='gitapt-gists' "nodemon jasmine-runner.js",
  "start": "nodemon ./bin/www"
},
```

## Server Side Tests

In **test-gists.js**:

```javascript

it('gets the basic gists list', function(done) {
    request(app)
        .get('/gitapi/gists/get-basic-list')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            if (err) {
                throw err;
            }
            done();
        });
});

it('checks the gist response', function(done) {
    request(app)
        .get('/gitapi/gists/get-basic-list')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(response) {
            logger.log(response.body);
            expect(typeof response.body.count).toBe('number');
            expect(typeof response.body.result).toBe('object');
        })
        .end(function(err, res) {
            if (err) {
                throw err;
            }
            done();
        });
});

it('checks the gist response', function(done) {
    request(app)
        .get('/gitapi/gists/get-basic-list')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(response) {
            logger.log(response.body.result[0]);
            const gist = response.body.result[0];
            expect(gist.html_url).toBeDefined();
            expect(gist.id).toBeDefined();
            expect(gist.description).toBeDefined();
            expect(gist.git_pull_url).toBeDefined();
        })
        .end(function(err, res) {
            if (err) {
                throw err;
            }
            done();
        });
});
```

## Client Side Test

More mock data for the **mock-data.js**:

```javascript
case '/gitapi/gists/get-basic-list':
    return {
        result: [
            {
                html_url: 'https://gist.github.com/a023c7db77926ff58d35087821e12020',
                id: 'a023c7db77926ff58d35087821e12020',
                git_pull_url: 'https://gist.github.com/a023c7db77926ff58d35087821e12020.git',
                description: 'Simple React Component'
            },
            {
                html_url: 'https://gist.github.com/17f8ec886c1ae22f66501fc3cbe760ac',
                id: '17f8ec886c1ae22f66501fc3cbe760ac',
                git_pull_url: 'https://gist.github.com/17f8ec886c1ae22f66501fc3cbe760ac.git',
                description: 'React Npm Install'
            }
        ]
    };
```

Write  a test.

## Client Side Implementation

Add a menu item:

```html
<li><Link to='/get-gist-list'>GetGist List</Link></li>
```

In DataMaven, set up some dummy state:

```javascript
this.state = {
  // Stuff here
  gistLister: 'Fill this in with an appropriate type and dummy data'
}
```

In DataMaven, create a method called **fetchGistList**. Don't forget to bind it to this!

Write code in render that passes the data on to the **GistLister**:

```javascript
<Route path='/get-gist-list'
   render={(props) => (...)}
/>
```

In GistLister, display the data.

## Turn it in

Push, branch, tag.

## Hint

- [Git Tag][git-tag]
- [Understanding Tags][under-tag]

[git-tag]: http://www.elvenware.com/charlie/development/cloud/Git.html#git-tag
[under-tag]: http://www.elvenware.com/charlie/development/cloud/Git.html#understanding-tags
