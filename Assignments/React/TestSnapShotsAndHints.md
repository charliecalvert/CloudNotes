## Overview

SnapShot tests do not replace all our standard tests. SnapShot testing is not TDD because you can't meaningfully write the test first and then get it to pass.

In all our tests, whether they are SnapShot tests or not, we use **shallow** and don't use **mount**. There are times when **mount** is useful, but we are not using them on the Midterm.

- [Configuring Jest][cj]
- [SnapShot Testing][ss]

See these demos in JsObjects. (Run git pull first to be sure you have the latest):

- [Native Fetch Enzyme Tests][wfe]
- [Web App Fetch Enzyme Tests][nfe]


## Watch Tests

In **package.json** use the --watch flag:

```javascript
"test": "jest --watch"
```

## Snapshots

SnapShots allow you to create a text file that contains the output from your component when it is in a particular state. The snapshot is saved to a file. The next time you run the test, the output from your component is compared to the snapshot from your previous run.

In the future, if your component changes an error will occur saying that your component no longer matches your snapshot. Type 'u' to update the snapshot.

You should have a file called **SnapShots.test.js** that contains one snap shot test for each of your major files in the **components** directory.

Example:

```javascript
import React from 'react';
import AddressShow from '../components/AddressShow';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import addresses from '../address-list';

describe('SnapShot Tests', function() {

    it('should take an AddressShow snapshot', () => {
        const elfTree = shallow(<AddressShow address={addresses[0]}/>);
        expect(elfTree).toMatchSnapshot();
    });

});
```

You should add more tests, one for each snapshot.

## Code Coverage

Jest uses a tool called Istanbul to help us be sure that all the methods in our objects are being tested.

Add **--coverage** to your **test** property in **package.json** or just run Jest with it:

```
jest --coverage
```

Here is an example, showing how much still needs to be done.

```
$ react-scripts test --env=jsdom --coverage
 PASS  src/tests/App.test.js
 PASS  src/tests/AddressShow.test.js
 PASS  src/tests/Header.test.js
 PASS  src/tests/Address.test.js
 PASS  src/tests/SnapShots.test.js
 PASS  src/tests/GetFile.test.js

Test Suites: 6 passed, 6 total
Tests:       41 passed, 41 total
Snapshots:   5 passed, 5 total
Time:        1.821s
Ran all test suites.
---------------------------|----------|----------|----------|----------|-------------------|
File                       |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
---------------------------|----------|----------|----------|----------|-------------------|
All files                  |    38.95 |    20.51 |    45.95 |    53.62 |                   |
 src                       |     3.92 |        0 |        0 |        8 |                   |
  address-list.js          |      100 |      100 |      100 |      100 |                   |
  index.js                 |        0 |        0 |        0 |        0 |  1,2,3,4,5,7,9,15 |
  registerServiceWorker.js |        0 |        0 |        0 |        0 |... 39,140,141,142 |
 src/components            |    79.55 |    57.14 |    80.95 |    79.55 |                   |
  Address.js               |    81.48 |    58.33 |       90 |    81.48 |    32,33,39,50,56 |
  AddressShow.js           |       60 |      100 |       50 |       60 |             39,49 |
  App.js                   |      100 |      100 |      100 |      100 |                   |
  ElfHeader.js             |       75 |      100 |    66.67 |       75 |                16 |
  GetFile.js               |    85.71 |       50 |      100 |    85.71 |                15 |
  elf-styles.js            |        0 |        0 |        0 |        0 |                   |
---------------------------|----------|----------|----------|----------|-------------------|
```

A number of problems stem from files that we don't own or don't expect to be tested.

We can fix this by adding a **jest** key to **package.json**:

```javascript
{
    "name": "address-proxy",
    "version": "1.0.0",
    "private": true,
    "proxy": "http://localhost:30026",
    "dependencies": {
        // AND SO ON
    },
    "scripts": {
        // ETC
    },
    "devDependencies": {
        // STUFF HERE
    },
    "jest": {
        "collectCoverageFrom": [
            "**/*.{js,jsx}",
            "!**/coverage/**",
            "!**/node_modules/**",
            "!**/registerServiceWorker.js",
            "!**/elf-styles.js",
            "!src/index.js"
        ]
    }

}

```

Now it looks somewhat better:

```
------------------|----------|----------|----------|----------|-------------------|
File              |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
------------------|----------|----------|----------|----------|-------------------|
All files         |    80.43 |    57.14 |    80.95 |    80.43 |                   |
 src              |      100 |      100 |      100 |      100 |                   |
  address-list.js |      100 |      100 |      100 |      100 |                   |
 src/components   |    79.55 |    57.14 |    80.95 |    79.55 |                   |
  Address.js      |    81.48 |    58.33 |       90 |    81.48 |    32,33,39,50,56 |
  AddressShow.js  |       60 |      100 |       50 |       60 |             39,49 |
  App.js          |      100 |      100 |      100 |      100 |                   |
  ElfHeader.js    |       75 |      100 |    66.67 |       75 |                16 |
  GetFile.js      |    85.71 |       50 |      100 |    85.71 |                15 |
------------------|----------|----------|----------|----------|-------------------|
```

It is usually not practical to get 100% coverage on all files. Usually 80-90% is considered reasonable.

If it is not already there, add **coverage** to your **.gitignore** file.

## Proxy Tests

```
PASS  src/tests/App.test.js
PASS  src/tests/Address.test.js
PASS  src/tests/Header.test.js
PASS  src/tests/AddressShow.test.js
PASS  src/tests/GetFile.test.js

Test Suites: 5 passed, 5 total
Tests:       36 passed, 36 total
Snapshots:   0 total
Time:        0.956s, estimated 1s
Ran all test suites.

Watch Usage: Press w to show more.
```

## Errors

- **Method “simulate” is only meant to be run on a single node. 0 found instead.**
	- Match the **ID** from the **simulate** call in your test to the **ID** of the button you want to click.
	- You can add an ID on a **RaisedButton**
- **TypeError: Network request failed**
	- This usually means you need to create fetch mock.
- **TypeError: Cannot read property 'prepareStyles' of undefined**
	- In your test, wrap the component you want to test in a **MuiThemeProvider**
- **Warning: Failed context type: The context `muiTheme` is marked as required in `AppBar`, but its value is `undefined`.**
	- In your test, wrap the component you want to test in a **MuiThemeProvider**

## Mocking Fetch

As a general rule, we don't ever call across the network while running tests. Instead, we pretend to make the call by creating a mock **fetch**:

```javascript
beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
        const promise = new Promise(resolve => {
            resolve({
                ok: true,
                json: function() {
                    return [
                        {
                            firstName: 'Patty',
                            lastName: 'Murray',
                            address: '154 Russell Senate Office Building',
                            city: 'Washington',
                            state: 'D.C.',
                            zip: '20510',
                            phone: '(202) 224-2621',
                            fax: '(202) 224-0238',
                            tollfree: '(866) 481-9186'
                        }
                    ];
                }
            });
        });
        return promise;
    });
});
```

I use this or a similar method in:

- SnapShots.test.js
- Address.test.js

I need it in **SnapShots.test.js** and **Address.test.js** because we call **fetch** in **componendDidMount**. This means its gets called when we load **Address.js** whether we want it to be called our not.


## Address and after Click Field Tests

How can we test the address component? It much fussing, the solution turned out to be simple. We want to call **setAddress** and pass in an index, and ensure that this gets us new data.

- [FakeDataManager][fdm]

```javascript
import addresses from '../address-list';
import dataManager from '../assets/FakeDataManager';

describe('Address tests', function() {
  let wrapper = null;

  beforeEach(() => {
      wrapper = shallow(<Address
          dataManager={dataManager}
          addressList={addresses}/>);
  });

  const addressProp = wrapper => wrapper.find('WithStyles(AddressShow)').prop('address');

  it('renders and displays the default first name from props', () => {
      expect(addressProp(wrapper).firstName).toEqual('unknown');
  });

  it('renders and displays the default first name from FakeData', () => {
      expect(wrapper.state().address.firstName).toEqual('Patty');
  });

  it('renders state of firstName after button click', () => {
      wrapper.instance().setAddress(1);
      expect(wrapper.state().address.firstName).toEqual('Robert');
  });

});
```

## React Spies

Similar tests from the [ReactFetchTest][wfe] demo:

```JavaScript
it('renders state by calling fetchServer directly', () => {
    const wrapper = shallow(<FetchServer />);
    const statusParagraph = (
        <p className="App-intro">Result: success</p>
    );
    wrapper.instance().fetchServer()
        .then(() => {
            console.log(wrapper.debug());
            wrapper.update();
            try {
                expect(wrapper.contains(statusParagraph)).toBe(true);
            } catch(ex) {
                console.error(ex);
            }
        });

});

it('calls fetchServer button click', () => {
    const spy = jest.spyOn(FetchServer.prototype, 'fetchServer');
    const wrapper = shallow(<FetchServer />);
    wrapper.find('#fetchServer').simulate('click');
    console.log(wrapper.debug());
    expect(spy).toHaveBeenCalled();
});
```

## Testing AddressShow

This is the old style, before we needed to call **dive()**:

```javascript
import addresses from '../address-list';

describe('AddressShow Shallow Suite', function() {
  let wrapper = null;

  const addressTest = {
        firstName: 'Patty',
        lastName: 'Murray',
        street: '154 Russell Senate Office Building',
        city: 'Washington',
        state: 'D.C.',
        zip: '20510',
        phone: '(202) 224-2621',
        fax: '(202) 224-0238',
        tollfree: '(866) 481-9186'
    };

  const setAddress = () => {
  	const address=addresses[1];
  	wrapper.setProps({ address: address });
  };

  const afterClickFieldTest = (name) => {
  	wrapper = shallow(<AddressShow address={addresses[0]} setAddress={setAddress}/>);
  	const patty = <p className="App-intro">{name}</p>;
  	wrapper.find('#setAddress').simulate('click');
  	//console.log(wrapper.debug());
  	expect(wrapper.contains(patty)).toBe(true);
  };

  it('renders and displays the first name', () => {
  	defaultFieldTest('First Name: unknown', 0);
  	afterClickFieldTest('First Name: ' + addressTest.firstName, 0);
  });

});
```	 

Once we add in WithStyles we need to call **dive()**:

```JavaScript
const getIndex = (wrapper, index, talkToMe) => {
    if (debug || talkToMe) {
        const ninep = wrapper
            .find('div#addressShow')
            .childAt(index)
            .debug();
        console.log('NINEP:', ninep);
    }
};

const defaultFieldTest = (name, index, talkToMe) => {
    const wrapper = shallow(<AddressShow address={addresses[0]} />);
    const welcome = <p className="App-intro">{name}</p>;
    getIndex(wrapper, index, talkToMe);
    expect(wrapper.dive().contains(welcome)).toEqual(true);
};

const afterClickFieldTest = (name) => {
  wrapper = shallow(<AddressShow address={addresses[0]} setAddress={setAddress}/>);
  const patty = <p className="App-intro">{name}</p>;
  wrapper.dive().find('#setAddress').simulate('click');
  //console.log(wrapper.debug());
  expect(wrapper.dive().contains(patty)).toBe(true);
};
```


## ESLint

Make sure you have ES6 in your ENV:

```javascript
{
    "extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
    "rules": {
        // enable additional rules
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "quotes": ["warn", "single"],
        "semi": ["error", "always"],

        // override default options for rules from base configurations
        "comma-dangle": ["off", "always"],
        "no-cond-assign": ["error", "always"],

        // disable rules from base configurations
        "no-console": "off"
    },
    "parser":  "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "browser": true,
        "node": true,
        "jest": true,
        "es6": true
    }
}
```

## Material CheckList

- Are your buttons all Material Buttons?

## Native Test

Run our **get-gist** utility and select either h or i to get the packages with either **yarn** or **npm** you need to add to your project for testing.

In your **package.json** file set up Jest:

```
"jest": {
    "preset": "jest-expo",
     "transformIgnorePatterns": [
         "!node_modules/react-runtime"
     ],
    "snapshotSerializers": ["enzyme-to-json/serializer"]
},
```

Example tests:

```javascript
describe('jest test', function() {

    const debug = true;

    it('renders without crashing', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();

    });

    it('should find Header', () => {
        const wrapper = shallow(<App />);
        if (debug) {
            console.log(wrapper.debug());
        }
        const nineSign = <ElfHeader />;
        expect(wrapper.contains(nineSign)).toBe(true);
    });
});
```

This test for finding an element before a button test:

```javascript
it('renders state of File paragraph before button click', () => {
    const wrapper = shallow(<ApiFoo appInit={appInit} />);
    const nineSign = <Text>A status: status will go here</Text>;
    elfDebugEnzyme.getFirst(wrapper, 'p');
    expect(wrapper.contains(nineSign)).toBe(true);
});
```

And then let's do a button click test:

```javascript
it('renders state of status paragraph after button click', () => {
    const wrapper = shallow(<ApiFoo appInit={appInit} />);
    const statusParagraph = (
        <Text>A status: status did go here</Text>
    );
    wrapper.find('#queryServer').props().onPress();
    setImmediate(() => {
        wrapper.update();
        try {
            expect(wrapper.contains(statusParagraph)).toBe(true);
        } catch (e) {
            console.log(e);
        }
    });
});
```

Note that we can do a less precise match like this:

```javascript
expect(wrapper.containsMatchingElement(foo)).toBe(true)
```

This will ignore the props (attributes) on a control.

Notice that there is a difference between selecting a React button and React Native button:

```JavaScript
wrapper.find('#queryServer').simulate('click');
wrapper.find('#queryServer').props().onPress();
```

In React Native, we want the latter.

Or Try these tests:

```JavaScript
it('finds a text element', () => {
    const wrapper = shallow(<ElfHeader />);
    const link = <Text>Home</Text>;
    expect(wrapper.dive().contains(link)).toBe(true);
});

it('finds a link', () => {
    const wrapper = shallow(<ElfHeader />);
    const link = <Link><Text>Home</Text></Link>;
    expect(wrapper.dive().containsMatchingElement(link)).toBe(true);
});
```

## Native Spies

From the [Native Enzyme demo][nfe] tests:

```javascript
it('renders state of File paragraph after button click setimeout', () => {
    const wrapper = shallow(<App />);
    const statusParagraph = <Text>You Rang: hello</Text>;

    return wrapper
        .instance()
        .fetchMicro()
        .then(() => {
            wrapper.update();
            console.log(wrapper.debug());
            expect(wrapper.contains(statusParagraph)).toBe(true);
        });
});

it('calls queryServer button click', () => {
    const spy = jest.spyOn(App.prototype, 'fetchMicro');
    const wrapper = shallow(<App />);
    wrapper
        .find('#fetchMicro')
        .props()
        .onPress();
    console.log(wrapper.debug());
    expect(spy).toHaveBeenCalled();
});
```

## Native Mocks

I found just putting my mock at the top of my test worked in React Native. the **beforeEach** method is called once before each test is run.

```javascript
describe('Test Api Foo', function() {

  const debug = false;

  beforeEach(() => {
      global.fetch = jest.fn().mockImplementation(() => {
          const promise = new Promise((resolve, reject) => {
              resolve({
                  ok: true,
                  json: function () {
                      return {
                          file: 'file name did go here.',
                          status: 'status did go here',
                          result: 'result did go here'
                      };
                  }
              });
          });
          return promise;
      });
  });

  // YOUR TESTS ARE HERE
});
```

## Dive for Regular, Non-Native React

```javascript
function createWrapper() {
    return shallow(
        <MuiThemeProvider>
            <GitUserUI user={userData} />
        </MuiThemeProvider>
    );
}

it('should take a snapshot', () => {
    const elfTree = createWrapper();
    expect(elfTree).toMatchSnapshot();
});

it('renders GitUserUI', () => {
    const wrapper = createWrapper();
    elfDebugEnzyme.getAllDive(wrapper, false);
    const nineSign = <p className="App-intro">login: unknowns</p>;
    expect(wrapper.dive().containsMatchingElement(nineSign)).toBe(true);
});
```

## Turn it in

Attach a screen shot showing that you have run the **--coverage** option.

Add to your AddressMaven project at least one test that uses SnapShots. Push your work. When I look at your projects, I should find a **\_\_snapshots\_\_** directory. For instance, I have one here:

```
AddressProxy/src/tests/__snapshots__
```

Please specify where I should look for your **\_\_snapshots\_\_** directory. Give at least the name of the project.

[fdm]:
http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactAddressTestingDataManager.html

[nfe]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/React/ReactNativeTesting/EnzymeBasics

[wfe]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/React/ReactFetchTests

[cj]: https://facebook.github.io/jest/docs/en/configuration.html

[ss]: https://facebook.github.io/jest/docs/en/snapshot-testing.html
