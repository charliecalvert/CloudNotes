---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/ReactAddressTestingDataManager.md
relativePath: Assignments/React/ReactAddressTestingDataManager.md
title: ReactAddressTestingDataManager
queryPath: Assignments/React/
subject: React
fileNameMarkdown: ReactAddressTestingDataManager.md
fileNameHTML: ReactAddressTestingDataManager.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

The introduction of the **PouchDdManager** complicates our testing. Let's look at **Address.test.js**.

## Testing ElfHeader

We need to use **MuiThemeProvider**

```JavaScript
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const themeDark = createMuiTheme({
    palette: {
        type: 'dark'
    }
});

// Later

<MuiThemeProvider theme={themeDark}>
```    

## Fake Mock PouchDbManager;

In your tests, don't load the real dataManager. Instead, load a **FakeDataManager**.

```javascript
import dataManager from '../assets/FakeDataManager';
```

This works for us because we are almost always passing our DataManager as props to our objects. Hence, they will use what we pass to them, and not try to create a real DataManager on their own.

The fake **DataManager** might look like this:

```javascript
class FakeDataManager {

    watchChanges = (showAddress) => {
        return showAddress;
    };

    showAddress = () => {
        const data = {
            'docs': [
                {
                    'firstName': 'Patty',
                    'lastName': 'Murray',
                    'street': '154 Russell Senate Office Building',
                    'city': 'Washington DC',
                    'state': 'WA',
                    'zip': ' 20510',
                    'phone': '202-224-2621',
                    'website': 'https://www.murray.senate.gov/public',
                    'email': '',
                    'contact': 'http://www.murray.senate.gov/public/index.cfm/contactme',
                    '_id': '5849dc86-72b9-4fe2-8a08-5d2f43cddb93',
                    '_rev': '1-b8d1d561e7ba4b2db84814aa212cbad0'
                },
                {
                    'firstName': 'Robert',
                    'lastName': 'Aderholt',
                    'street': '235 Cannon House Office Building;',
                    'city': 'Washington DC',
                    'state': 'AL',
                    'zip': ' 20515-0104',
                    'phone': '202-225-4876',
                    'website': 'https://aderholt.house.gov',
                    'email': '',
                    'contact': '',
                    '_id': 'f892d657-3115-44c5-813e-2056c08d158d',
                    '_rev': '1-009c55df07da43bda463089f8ab15379'
                },
                {
                    'firstName': 'Lamar',
                    'lastName': 'Alexander',
                    'street': '455 Dirksen Senate Office Building',
                    'city': 'Washington DC',
                    'state': 'TN',
                    'zip': ' 20510',
                    'phone': '202-224-4944',
                    'website': 'https://www.alexander.senate.gov/public',
                    'email': '',
                    'contact': 'http://www.alexander.senate.gov/public/index.cfm?p=Email',
                    '_id': 'bdad5eb1-ba0c-4df6-ab16-199c92454d3e',
                    '_rev': '1-06ee3531f61e47efb6957da79f0bc599'
                },
                {
                    'firstName': 'Tammy',
                    'lastName': 'Baldwin',
                    'street': '709 Hart Senate Office Building',
                    'city': 'Washington DC',
                    'state': 'WI',
                    'zip': ' 20510',
                    'phone': '202-224-5653',
                    'website': 'https://www.baldwin.senate.gov',
                    'email': '',
                    'contact': 'https://www.baldwin.senate.gov/feedback',
                    '_id': '4d29a806-7187-4f8d-85a9-a56e6e3228d6',
                    '_rev': '1-95b02c43a46f4384b7730e3315a8c57c'
                },
                {
                    'firstName': 'John',
                    'lastName': 'Barrasso',
                    'street': '307 Dirksen Senate Office Building',
                    'city': 'Washington DC',
                    'state': 'WY',
                    'zip': ' 20510',
                    'phone': '202-224-6441',
                    'website': 'https://www.barrasso.senate.gov',
                    'email': '',
                    'contact': 'https://www.barrasso.senate.gov/public/index.cfm/contact-form',
                    '_id': 'a12effc6-062c-41ac-a044-b2c3db68ad4d',
                    '_rev': '1-ef2f284cc83148b4a4ef873555f22c32'
                },
                {
                    'firstName': 'Joe',
                    'lastName': 'Barton',
                    'street': '2107 Rayburn House Office Building;',
                    'city': 'Washington DC',
                    'state': 'TX',
                    'zip': ' 20515-4306',
                    'phone': '202-225-2002',
                    'website': 'https://joebarton.house.gov',
                    'email': '',
                    'contact': '',
                    '_id': '5b5c7ab3-fc83-4391-8562-7cd7a5548641',
                    '_rev': '1-5d8a9df3a182426eb3fe047d6072d40b'
                }
            ]
        };
        return new Promise((resolve) => {
            resolve(data);
        });
    };
}

const instance = new FakeDataManager();

export default instance;
```

**WatchChanges** is never really called, but it must be present. Hence, our implementation of it is not important. **showAddress** is called, and you can see that we have it return a few records in a **Promise**.


## Testing Address

It is a bit difficult to set up the wrapper, so lets do it in one place:

```javascript
let  wrapper = null;

beforeEach(() => {
    wrapper = shallow(<Address
       dataManager={dataManager}
       addressList={addresses} />);
});
```    

This is called once before each test. It sets up the Enzyme **wrapper** that we use in our tests.

We can also write another shortcut that looks like this:

```javascript
const addressProp = wrapper => wrapper
  .find('WithStyles(AddressShow)')
  .prop('address');
```

**NOTE**: _In this case I'm explicitly using **WithStyles**. But in my **contains** and **containsMatchingElement** tests, I can ignore the fact that we use **WithStyles** in the React component under test._

Thus we no longer need lines like this:

```javascript
it('renders and displays the default first name', () => {
    const wrapper = shallow(<Address
       dataManager={dataManager}
       addressList={addresses} />);
    expect(wrapper
      .find('WithStyles(AddressShow)')
      .prop('address')
      .firstName)
      .toEqual('unknown');
});
```

Instead, we can write this:

```javascript
it('renders and displays the default first name', () => {        
    expect(addressProp(wrapper).firstName).toEqual('unknown');
});
```

We can also write these:

```JavaScript
it('renders and displays the default first name from FakeData', () => {
    expect(wrapper.state().address.firstName).toEqual('Patty');
});

it('renders state of firstName after button click', () => {
    wrapper.instance().setAddress(1);
    expect(wrapper.state().address.firstName).toEqual('Robert');
});
```

## Turn it in

You can do this in the final, or in whatever is your latest and greatest. Just point me to a folder containing a working **AddressMaven** that has at least 12 shallow tests running against **Address.js**:

```
PASS  src/tests/Address.test.js
 Address tests
   ✓ renders without crashing (20ms)
   ✓ renders and displays the default first name (2ms)
   ✓ renders state of firstName after button click (1ms)
   ✓ renders and displays the default last name (1ms)
   ✓ renders state of lastName after button click (4ms)
   ✓ renders and displays the default street address (2ms)
   ✓ renders state of street address after button click (1ms)
   ✓ renders and displays the default city (1ms)
   ✓ renders state of city after button click (1ms)
   ✓ renders and displays the default stateName (1ms)
   ✓ renders state of stateName after button click
   ✓ renders and displays the default zip (2ms)
   ✓ renders state of zip after button click (4ms)
   ✓ renders and displays the default phone number (1ms)
   ✓ renders state of phone number after button click (47ms)

Test Suites: 1 passed, 1 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        0.179s, estimated 1s
Ran all test suites matching /Address.test.js/.

Watch Usage: Press w to show more.
```
