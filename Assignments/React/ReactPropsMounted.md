## Overview

We have several major goals in this assignment. To learn how to:

- Nest components
- Pass state from the parent to the child component
- Test with Enzyme **shallow** and mounted
- To build a set of HTML controls based on a specification

## Logger

There are some very good loggers out there, and we should probably be using those. Still, there is perhaps some value in writing our own loggers. If nothing else, they show us why the best loggers are so good. The key trait we want in a logger is the ability to turn logging on and off. The issue, of course, is that sometimes **console.log** statements are very useful, and sometimes they just get in the way. Being able to turn them on and off is useful.

This is still a bit tentative, but here is a useful, if somewhat naive, simple logger. I've saved it in my **src** directory as **elf-logger.js**:

```javascript
/**
 * Created by charlie on 4/18/17.
 */

const ElfLogger = class {

    constructor(initQuiet) {
        this.display = initQuiet;
    }

    log = (message1, message2='', message3='') => {
        if (this.display) {
            console.log(message1, message2, message3);
        }
    };

    setQuiet = (newValue) => {
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

When we test **GetUserInfo** we might want, in some cases, to use Enzyme's **mount** because GetUserInfo has a child called **ShowUserInfo**. But **ShowUserInfo** has no such child, so we can test it with **shallow**. Inf fact, all your tests
