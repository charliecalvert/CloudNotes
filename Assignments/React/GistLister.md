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
me.listGists(
   ).then(function({data}) {
       console.log('USER PROMISE', data);
       const results = data.map((item) => ( {Return Object with 4 props} );
       response.status(200).send({
           'count': results.length,
           'result': results
       });
   }).catch(function(err) {
       console.log('USER Promise Rejected', err);
       response.status(500).send({'result': err});
   });
```
