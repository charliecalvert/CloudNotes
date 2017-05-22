# React Address Data Maven

We are going to add a new component called **DataMaven** so that we can refactor and get rid of **AddressChanger**.

## Change the Menu

The **Routes** from the **ElfMenu** will move to this component. The display of the menu will stay in **ElfMenu**:

```javascript

<Router> <=== MOVES ===<
   <div>
       <div className='App'>
           <ul>
               <li><Link to='/'>AddressShow</Link></li>
               <li><Link to='/edit'>AdressEdit</Link></li>
               <li><Link to='/small'>SmallNumbers</Link></li>
           </ul>
       </div>
       <Route exact path='/' component={Address}/>      <=== MOVES ===<
       <Route path='/edit' component={AddressChanger}/> <=== MOVES ===<
       <Route path='/small' component={SmallNumbers}/>  <=== MOVES ===<
   </div>
</Router> <=== MOVES ===<
```

Or to state the same thing somewhat differently, this is the part that we want to move to **DataMaven**:

```javascript
<Route exact path='/' component={Address}/>
<Route path='/edit' component={AddressChanger}/>
<Route path='/small' component={SmallNumbers}/>
```

As a result of this refactoring, **DataMaven** will be able to launch all our Components. It will launch **Address, AddressEdit**, and **SmallNumbers**. This means that we can move all the **state** into this one component. The components will only see **props**.

## Add DataMaven Test

We test first. So the first thing we do is create a test to see if we have a viable component called **DataMaven**. Create a file called **DataMaven.test.js** in your **\_\_tests\_\_** folder. Add the following content:

```javascript
describe('DataMaven Suite', function() {

    it('renders DataMaven component without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<DataMaven />, div);
    });

});
```

Run your tests. If necessary, press **p** and type in **DataMaven**. This ensures that only our new test suite runs.

```
FAIL  src/__tests__/DataMaven.test.js
 ● DataMaven Suite › renders DataMaven component without crashing

   ReferenceError: ReactDOM is not defined

     at Object.it (src/__tests__/DataMaven.test.js:10:9)
     at process._tickCallback (internal/process/next_tick.js:109:7)

 DataMaven Suite
   ✕ renders DataMaven component without crashing (1ms)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.088s, estimated 1s
Ran all test suites matching "DataMaven".

Watch Usage
› Press a to run all tests.
› Press o to only run tests related to changed files.
› Press p to filter by a filename regex pattern.
› Press q to quit watch mode.
› Press Enter to trigger a test run.
```

This test tells us that **ReactDOM** is not defined. We don't think, we don't plan. This is test driven development. The test is in charge. We just do what the test tells us to do. In particular, we fix that problem with **ReactDOM**.

```javascript
import ReactDOM from 'react-dom';

describe('DataMaven Suite', function() {

    it('renders DataMaven component without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<DataMaven />, div);
    });

});
```

Now we have a new error: **ReferenceError: React is not defined**. Don't think. Don't plan. This is Test Driven Development. The test is in charge. Do what it tells you to do! Fix the problem by importing the needed library. (I'll leave that step up to you.)

Once that problem is fixed, find the next one, and fix it. And so on, until the test passes. We don't add any code unless the test "tells" us to add it.

## Create DataMaven

At some point, during your tests, you will be asked to create **DataMaven**. Here is how to get started:

```javascript
import React, {Component} from 'react';

class DataMaven extends Component {

    render() {
        return (
            <div></div>
        );
    }
}

export default DataMaven;

```

This is, in effect, the simplest possible React component.

Create your file in the **components** directory and make sure your tests are passing.

## Add the Router to DataMaven

At this stage we are ready to begin moving our routes to **DataMaven**. Let's begin by seeing if **DataMaven** has the first necessary piece, which is the **Router**:

```javascript
it('renders and displays a Router', () => {
    const wrapper = shallow(<DataMaven  />);
    elfDebug.getAll(wrapper);
    var router = wrapper.find('Router');
    expect(router.length).toEqual(1);
});
```

This produces the following results:

```
FAIL  src/__tests__/DataMaven.test.js
 ● DataMaven Suite › renders and displays the default last name

   ReferenceError: shallow is not defined

     at Object.it (src/__tests__/DataMaven.test.js:22:25)
     at process._tickCallback (internal/process/next_tick.js:109:7)

 DataMaven Suite
   ✓ renders DataMaven component without crashing (2ms)
   ✕ renders and displays the default last name (1ms)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   0 total
Time:        0.105s, estimated 1s
Ran all test suites matching "DataMaven".

Watch Usage
› Press a to run all tests.
› Press o to only run tests related to changed files.
› Press p to filter by a filename regex pattern.
› Press q to quit watch mode.
› Press Enter to trigger a test run.
```

You can see that we have a problem on line 22 of **DataMaven.test.js** because **shallow is not defined**. I'll leave it up to you to cut and paste the code from one of your other tests to fix this problem.

The next problem is that **elfDebug** is not defined. The comment at the top of the [ElfDebugEnzyme gist][edeg] explains how to create an instance of this object:

```javascript
import ElfDebugEnzyme from '../ElfDebugEnzyme';
const elfDebug = new ElfDebugEnzyme(true, 'DataMaven.test.js');
```

**ElfDebugEnzyme** tells us the current state of our component:

```
console.log src/ElfDebugEnzyme.js:30
  DataMaven.test.js:
  <div />
```

As we can see, the component contains a **DIV**, but not a **Router**. So we change the component so that it contains a router:

```javascript
import React, {Component} from 'react';

class DataMaven extends Component {

    render() {
        return (
            <Router />
        );
    }
}

export default DataMaven;
```

Unfortunately, this doesn't work out so well. In fact, after this change. Both our tests fail. We seem to be moving backwards. The core error is this one: **ReferenceError: Router is not defined**. Clearly we are missing an import statement.

Looking in **ElfMenu**, we find the missing piece:

```javascript
import { BrowserRouter as Router } from 'react-router-dom';
```

Paste this code into **DataMaven**.

Now our test is very close to passing. Its sole complaint is that the component creates a **BrowserRouter** not a **Router**. Since **Router** is just an alias for **BrowserRouter**, we can feel comfortable in updating our test to support it:

```javascript
it('renders and displays a BrowserRouter', () => {
    const wrapper = shallow(<DataMaven  />);
    elfDebug.getAll(wrapper);
    var router = wrapper.find('BrowserRouter'); << == HERE ==<
    expect(router.length).toEqual(1);
});
```

**NOTE**: _Normally it is completely against the rules to change a test in order to get it to pass. However, we should not be too dogmatic, and this illustrates one of the occasions where a change to a test is warranted._

## Understanding the Enzyme find {#enzyme-find}

The test we just created has one bit of code we have not used before in this context. We call **find** on the wrapper:

```javascript
var router = wrapper.find('BrowserRouter');
```

You may recognize this code from our **ElfDebugEnzyme** file:

```javascript
getElement(wrapper, element, showMe) {
    if (this.showData || showMe) {
        const paragraphData = wrapper.find(element).debug();
        this.display(paragraphData);
    }
}
```

As you can see, it also calls **find**. Calls to **find** return an Ezyme wrapper around all the elements in the component that match the name on which you search. For instance, if you had 5 **DIVs** in the HTML produced by your component, then **find** would return these **DIVs** if you searched for them. But our enzyme debug tool calls the **debug** method on the element that Enzyme finds. The code in our test doesn't call **debug**, it just returns the **wrapper**.

If you looked at the wrapper returned from this call you would see that it contains a **length** property. Lets use **console.log** to output that wrapper, so that we can take a look:

```javascript
it('renders and displays a BrowserRouter', () => {
    const wrapper = shallow(<DataMaven  />);
    elfDebug.getAll(wrapper);
    var router = wrapper.find('BrowserRouter');
    console.log(router);
    expect(router.length).toEqual(1);
});
```

As you can see, our code now outputs the value returned from our call to find. It produces, in part, the following output:

```javascript
nodes:
  [ { '$$typeof': Symbol(react.element),
      type: [Object],
      key: null,
      ref: null,
      props: {},
      _owner: null,
      _store: {} } ],
 length: 1,            <== HERE ==<
 options: {},
 complexSelector:
  ComplexSelector {...}
```    

If Enzyme found no matches for our search string, **length** would be set to 0. If, as in the case described above, it found 5 elements of the type we searched for, then **length** would be set to 5. In our case, we want to find one, and only one, **BrowserRouter** element. So we test to be sure that is true:

```javascript
var router = wrapper.find('BrowserRouter');
console.log(router);
expect(router.length).toEqual(1);  << == HERE ==
```

Now that you understand the test, delete or comment out the call to **console.log**. It creates a lot of output, and we don't really need to see it anymore now that it has served its purpose.

## Test for Routes

Our next step is test for the **Route** object:

```javascript
it('renders and displays at least one Route', () => {
    const wrapper = shallow(<DataMaven  />);
    elfDebug.getAll(wrapper);
    var router = wrapper.find('Route');
    expect(router.length).toBeGreaterThan(0);
});
```

This test checks to see if you have at least one **Route** element in the **render** method for **DataMaven**. Note that we use the **toBeGreaterThan** method to test that we have at least one instance of this object.

Recall that we are trying to do here is move this code from **ElfMenu** to **DataMaven**:

```javascript
<Route exact path='/' component={Address}/>
<Route path='/edit' component={AddressChanger}/>
<Route path='/small' component={SmallNumbers}/>
```

For this to work, we will need to wrap the code inside the **Router** object:

```javascript
<Router>
  <Route exact path='/' component={Address}/>
  <Route path='/edit' component={AddressChanger}/>
  <Route path='/small' component={SmallNumbers}/>
</Router>
```

You can't use the exact code I show above, and there are a number of other changes you have to make to **DataMaven** before the test will pass, but I'll leave those relatively mundane tasks up to you to perform. One step you should take in the process, is to not only change the imports in **DataMaven**, but also remove the now unused **imports** from **ElfMenu**.

When you are done, you might at least temporarily turn off **ElfDebugEnzyme** and admire your work:

```bash
PASS  src/__tests__/DataMaven.test.js
 DataMaven Suite
   ✓ renders DataMaven component without crashing (9ms)
   ✓ renders and displays a BrowserRouter (2ms)
   ✓ renders and displays at least one Route (1ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.225s, estimated 1s
Ran all test suites matching "DataMaven".

Watch Usage
› Press a to run all tests.
› Press o to only run tests related to changed files.
› Press p to filter by a filename regex pattern.
› Press q to quit watch mode.
› Press Enter to trigger a test run.
```

**NOTE**: **_DataMaven** will not be the final location of our **Router** object. In order to get more control in our tests, will later refactor our code and move the **Router** to our main **index.js** file. However, I think it is simplest if you see it first in **DataMaven**. Then it will be easier to understand why the code still works when we move it to **index.js**. I have feeling this may not be the last time refactor this aspect of our code. Remember, we write tests, we get them to pass, and then we refactor. The process never ends._

## Testing ElfMenu

To help prove to ourselves that we have properly updated **ElfMenu**, lets create or update **ElfMenu.test.js** so that it contains at least the following two tests:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import DataRouter from '../components/DataMaven';
import ElfMenu from '../components/ElfMenu';
import {shallow} from 'enzyme';

describe('ElfMenu Suite', function() {

    beforeEach(function() {
        const localStorageMock = (function() {
            let storage = {};
            return {
                getItem: function(key) {
                    return storage[key];
                },
                setItem: function(key, value) {
                    storage[key] = value.toString();
                },
                clear: function() {
                    storage = {};
                }
            };
        })();
        Object.defineProperty(global, 'localStorage', {value: localStorageMock});
    });

    it('renders the ElfMenu component without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<DataRouter><ElfMenu /></DataRouter>, div);
    });

    it('Shows there is no BrowserRouter in ElfMenu', () => {
        const wrapper = shallow(<ElfMenu />);
        const router = wrapper.find('BrowserRouter');
        expect(router.length).toEqual(0);
    });

});
```

The key point here is that it proves we have removed the **BrowserRouter** (alias Router) object from **ElfMenu.js**. This kind of test is a bit odd, in that it proves a negative. But by asking you to get this test to pass, I'm helping you ensure that you properly refactored your code.

Be sure the **ElfMenu** test actually runs by typing **p** and then **ElfMenu**, or by typing 'a' and running all your tests.

## Remove AddressChanger

At this stage, we are finally ready to excise my ill-conceived **AddressChanger**. In its simplest form, this involves simply replacing our code that loads **AddressChanger** with code that loads **AddressEdit**.

To get started, make sure you are focused on testing **DataMaven.test.js**. Type **p** followed by **DataMaven**. That should ensure that you test only the **DataMaven.test.js** file.

In order to excise **AddressChanger**, we need to change this line in **DataMaven**:

```javascript
<Route path='/edit' component={AddressChanger}/>
```

The new line, in our naive first try, looks like this:

```javascript
<Route path='/edit' component={AddressEdit}/>
```

That procduces this error: **ReferenceError: AddressEdit is not defined**. That is easy enough to fix by making a single simple change in our **import** section: instead of importing **AddressChanger**, we should import **AddressEdit**:

```javascript
import AddressEdit from './AddressEdit';
```

Interestingly, our tests now fail by passing. In other words, all our tests pass, but if we go to the app itself in the browser, we can see that it errors out with the following: **Failed context type: The context `router` is marked as required in `Link`, but its value is `undefined`**. We also see this stack dump in the Chrome Developer tools debugger:

```javascript
    in Link (at ElfMenu.js:17)
    in li (at ElfMenu.js:17)
    in ul (at ElfMenu.js:16)
    in div (at ElfMenu.js:15)
    in div (at ElfMenu.js:14)
    in ElfMenu (at index.js:9)
    in div (at index.js:7)
```

As we can see, the ultimate source of the problem is **index.js**, line 7.

Here is the **render** method **index.js**:

```javascript
ReactDOM.render(
    <div>
        <ElfHeader />
        <ElfMenu/>
    </div>,
    document.getElementById('root')
);
```

Our problem is that **ElfMenu** now contains code that needs to appear inside a **Router** object. We have moved the **Router** object to **DataMaven**. This means that we need to move **ElfMenu** into **DataMaven**. While we are at it, we might as well move **ElfHeader** there as well. We can replace them with **DataMaven** itself. Our render method in **index.js** is now very simple:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import DataMaven from "./components/DataMaven";

ReactDOM.render(
    <div>
        <DataMaven/>
    </div>,
    document.getElementById('root')
);
```

Here are two tests to place in **DataMaven.test.js**. They help convince us that our DataMaven component includes both the header and the menu:

```javascript
it('renders and displays the ElfHeader', () => {
    const wrapper = shallow(<DataMaven  />);
    elfDebug.getAll(wrapper, false);
    var router = wrapper.find('ElfHeader');
    expect(router.length).toEqual(1);
});

it('renders and displays the ElfMenu', () => {
    const wrapper = shallow(<DataMaven  />);
    elfDebug.getAll(wrapper, false);
    var router = wrapper.find('ElfMenu');
    expect(router.length).toEqual(1);
});
```

The objects in the **DataMaven** render method should appear in the following order:

- Router
- DIV
- ElfHeader
- ElfMenu
- And three or more Routes

## DataMaven and AndressEdit

Don't cut and paste yet. Instead, copy the following from **Address.js**:

- The Constructor
- onAddressChange
- onNameChange

You can delete **onNameChange** from **Address**.

We now need to instantiate **AddressEdit** which means we need to pass props to it. This is not easy. The syntax, which I find very cumbersome, looks like this:

```javascript
<Route path='/edit' render={(props) => (
    <AddressEdit {...props}
         address={this.state.address}
         onAddressChange={this.onAddressChange}
         onNameChange={this.onNameChange}
    />
)}/>
```

We are declaring an arrow function for the render method. It is passed props, which are properties from **react-router-dom**. We use the spread operator on these props, and then pass in our own props.

At this point your program should be working and all your tests should be passing.

## Testing ElfMenu

React Router DOM expects components to be created in a certain order. For instance, you need to put your React Router DOM **Link** components inside a **Router**:

```javascript
<Router>
  <ul>
    <li><Link to='/'>Address Show</Link></li>
  </ul>
</Router>
```

Our new code for **ElfMenu**, however, no longer includes a **Router** object. That means that tests like this will fail because there is no **Router** enclosing the **Link** objects:

```javascript
it('renders the ElfMenu component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ElfMenu />, div);
});
```

This results in errors like this:

```
TypeError: Cannot read property 'history' of undefined
Warning: Failed context type: The context `router` is marked as required in `Link`, but its value is `undefined`.
```

The fix is obvious enough once you understand what is wrong. In your test, just wrap your **ElfMenu** in a **Router**:

```javascript
it('renders the ElfMenu component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><ElfMenu /></Router>, div);
});
```

## Switch Client Routes when Testing

Start by reading this text from Elvenware:

- [Elvenware on Testing React Router Dom][errd]

## Turn it in

I'll be grading **React Address Mock** and **React Address DataMaven** assignments at the same time from the same codebase. You will get two grades, but I will be looking at one copy of **CongressAddress** when I grade them. I don't want to have to get two versions of **CongressAddress** going. Therefore, I will start a single version of the program, run the tests, and expect to be able to grade both assignments based on the code from the same commit. Two assignments, one version of **CongressAddress**:

- [React Address Mock][ram]
- [React Address DataMaven][radm]

Once you have a version of **CongressAddress** that contains code fulfilling the requirements for both assignments, then you should push, branch and tag:

```
git add .
git commit -m "Code for React Address Mock and React Address DataMaven"
git push
git branch week07-DataMavenMock
git tag -a v7.X.X -m "Code for React Address Mock and React Address DataMaven"
git push origin v7.X.X
```

Of course, the X.X bit would contain your idea of the appropriate numbering scheme. For instance: **v7.0.0**.

## Hint

Don't forget that in your constructor for **Address** that you need to initialize **this.state.address** with dummy data. Just take an object from the array of objects in **mock-data.js**.

And also, in the methods that handle button clicks, don't call **addresses[this.addIndex]**. The **addresses** variable is no longer valid. Call **getByIndex** instead. I'll leave the details to you.

[edeg]: https://gist.github.com/charliecalvert/51daef341699943b07c9570c3ad2cbab
[ram]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactAddressMock.html
[radm]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactAddressDataMaven.html
[errd]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptReactMenu.html#testing
