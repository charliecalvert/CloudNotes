---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/ReactPropsMounted.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/React
fileName: ReactPropsMounted.md
relativePath: /React/ReactPropsMounted.md
title: ReactPropsMounted
directoryName: React
category : react-guide
---

# React Props Mounted

We have several major goals in this assignment. To learn how to:

- Test Nested components with Enzyme **shallow** and **mount**
- Test with Enzyme **shallow** and mounted
- Look at a logger

## Logger

There are some very good loggers out there, and we should probably be using those. Still, there is perhaps some value in writing our own loggers. If nothing else, they show us why the best loggers are so good. The key trait we want in a logger is the ability to turn logging on and off. The issue, of course, is that sometimes **console.log** statements are very useful, and sometimes they just get in the way. Being able to turn them on and off is useful.

This is still a bit tentative, but here is a useful, if somewhat naive, simple logger. I've saved it in my **src** directory as **elf-logger.js**:

```javascript
/**
 * Created by charlie on 4/18/17.
 */

 /**
  * Created by charlie on 4/18/17.
  */

 const ElfLogger = class {

     constructor(initQuiet) {
         this.display = initQuiet;
         this.log = this.log.bind(this);
         this.setQuiet = this.setQuiet.bind(this);
     }

     log(message1, message2 = '', message3 = '') {
         if (this.display) {
             console.log(message1, message2, message3);
         }
     };

     setQuiet(newValue) {
         this.display = newValue;
     }
 };

 export default ElfLogger;
```

Use it like this, where the boolean in the second line turns the logger on or off:

```javascript
import Logger from '../elf-logger';
const logger = new Logger(false);

// THEN, WHEN YOU WANT TO LOG SOMETIHING, CHANGE false TO true ABOVE AND:
logger.log('Logging now');
```

As you can see, the logger can accept up to three parameters.

**NOTE**: _When I get time, I'd like to have the logger work depending on whether or not an environment variable is set, as that is more flexible than this module by module approach:_

```javascript
if (process.env.SERVERFOO) {
  console.log(message1, message2, message3);
}
```

## Enzyme shallow and mount

Before going further, read this section from Elvenware:

- [Emzyme Mount vs Shallow][emvz]

[emvz]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptReact.html#enzyme-mount-vs-shallow

## Testing Elements with Complex Attributes {#on-change=attrs}

In our code so far, we have always been attempting to match exactly and completely what is rendered by an HTML element. For instance, we have written code like this:

```javascript
const fooState = <p className="App-intro">state.foo: bar</p>;
expect(wrapper.contains(fooState)).toEqual(true);
```

Here we are expecting our paragraph element to more or less exactly match the string we assign to **fooState**. However, there are times when the controls we create are more complex than this. On some of these of these occasions, it is, at best, difficult to compose a string that exactly matches our controls output.

In particular, suppose your code produces a control that is reported by Enzyme to render like this:

```html
<input value="Robin Dudette" onChange={[Function]} />
```

Note the **onChange** attribute, and the react expression to which it is equated. It turns out that such code is hard to match.

In such cases you might consider writing test code like this:

```javascript
import { mount } from 'enzyme';

function getLast(wrapper, element) {        
    const eightp = wrapper.find(element).last().debug();
    logger.log("GETUSERINFO TEST GET LAST:", eightp);
}

/*
  * @param {object} wrapper - Container for a bunch of HTML nodes
  * @param {number} index - Index of HTML element in the wrapper
  * @param {boolean} talkToMe - Speak even if quiet is true
  */
 const getIndex = function(wrapper, index, talkToMe) {
     if (!quiet || talkToMe) {
         const ninep = wrapper.find('div#addressShowRender').childAt(index).debug();
         console.log('NINEP:', ninep);
     }
 };

it.only('renders button click message for state.userLogin', () => {
    const wrapper = mount(<GetUserInfo />);
    const inputElement = <input value="Robin Dudette" />;  
    wrapper.find('button.getUser').simulate('click');
    getLast(wrapper, 'input');
    expect(wrapper.containsMatchingElement(inputElement)).toEqual(true);
});
```

Your **getLast** debug method may report that your HTML control is generating something like this:

```html
<input value="Robin Dudette" onChange={[Function]} />
```

Yet testing for that exact string seems to fail no matter what I do, probably because **[Function]** is being expanded to something more than what is shown here. After doing some research, I found it was easier to use **containsMatchingElement** instead of **contains**.

Here was my first attempt to match that output:

```javascript
const inputElement = <input value="Robin Dudette" onChange={[Function]} />
expect(wrapper.contains(inputElement)).toEqual(true);
```

As you can see, I'm trying to mirror what I see in the Enzyme debug. It was a good try, I suppose, but it didn't work. Instead, I ended up doing this:

```javascript
const inputElement = <input value="Robin Dudette" />;  
expect(wrapper.containsMatchingElement(inputElement)).toEqual(true);
```

Note that I'm calling **containsMatchingElement** rather than **contains**. This turns out to be a more forgiving method. Even though the **inputElement** variable shown above does not exactly match the output of the control, it is close enough to pass the test, yet strict enough to catch obvious errors, such as **value** being set to something other than **Robin Dudette**.

## Testing ShowUserInfo

When we test **GetUserInfo** we might want, in some cases, to use Enzyme's **mount** because GetUserInfo has a child called **ShowUserInfo**. But **ShowUserInfo** appears at first to have no such child, so we can naively think it might be possible to test it with **shallow**. In fact, **ShowUserInfo** relies on **ElfElements**, which is a component. As a result, we should use **mount** if we want to check everything.

Testing **ShowUserInfo**:

```javascript
describe('Show User Info mount Test', function () {

    let bodyData = {};

    beforeEach(function() {
        const tempBody = {};
        for (let value of fieldDefinitions) {
            tempBody[value.id] = value.sample;
        }
        bodyData=tempBody;
    });


    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ShowUserInfo
            fields={fieldDefinitions}
            body={bodyData}
            onChange={function() {}}
        />, div);
    });
});
```

## Testing GetUser Info

Read about ElfTestShow on [Elvenware][elf-ed].

```javascript
import { mount } from 'enzyme';
import ElfTestShow from '../ElfTestShow';
const elfShow = new ElfTestShow(false);
jest.mock('whatwg-fetch');

describe('My Get User Info test', function () {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<GetUserInfo />, div);
    });
});
```

## Turn it in

Follow the instructions in **ReactPropsShow**. Call the branch: **ReactPropsMounted**. Or, if your code is in the **ReactPropsShow** branch, let me know. Something like this:

- add, commit, push. When you commit, include a message that mentions the assignment name.
- tag, push. When you tag, include a message that mentions the assignment name.
- if you are not already in a branch named after your project, then create one:  **git branch ReactPropsMounted**. Whether you ever enter and use the branch is up to you. To enter it: **git checkout ReactPropsMounted**.

[elf-ed]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptReact.html#enzyme-debug-class

## Hint

**shallow** can see all the HTML tags in a render method, but it can't see into the sub-components. Consider this code:

```javascript
render() {
    if (!this.quiet) { console.log("ADDRESS RENDER"); }
    return (
        <div className="App">
            <MyAddress />
        </div>
    );
}
```

**shallow** can see that this render method contains a second React component called **MyAddress**, but it can't see the render method of **MyAddress**. **mount** can see into **MyAddress**. This means it can find the list items or paragraphs that may be listed as part of the **MyAddress** react **Component**. In cases like that shown above, it can see the **render** method of **MyAddress**, but shallow cannot.

Just to be clear, it would not matter how many divs, list items, paragraphs or other tags were included in the **render** method shown above. **shallow** could see them all. But it could not see into the contents of the render method of **MyAddress**.
