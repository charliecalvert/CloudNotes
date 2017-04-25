## Logger

There are some very good loggers out there, and we should probably be using those. Still, there is perhaps some value in writing our own loggers. If nothing else, they show us why the best loggers are so good. The key trait we want in a logger is the ability to turn logging on and off. The issue, of course, is that sometimes **console.log** statements are very useful, and sometimes they just get in the way. Being able to turn them on and off is useful.

This is still a bit tentative, but here is useful, if somewhat naive, simple logger. I've saved it in my **src** directory as **elf-logger.js**:

```javascript
/**
 * Created by charlie on 4/18/17.
 */

const ElfLogger = class {

    constructor(initQuiet) {
        this.display = initQuiet;
    }

    log = (message1, message2, message3) => {
        if (typeof message2 === 'undefined') {
            message2 = '';
        }
        if (typeof message3 === 'undefined') {
            message3 = '';
        }
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

As you can see, the logger can except up to three parameters.

**NOTE**: _When I get time, I'd like to have the logger work depending on whether or not an environment variable is set, as that is more flexible than this module by module approach:_

```javascript
if (process.env.SERVERFOO) {
  console.log(message1, message2, message3);
}
```

## Enzyme mount vs shallow

Suppose one component nests another. For instance, suppose that your custom component **MyComponent** renders a second component called **MyOtherComponent**. Here is **MyComponent&#39;s** render method :

```javascript
class MyComponent extends Component {
  render() {
      return (
          <div>
              <MyOtherComponent />
          </div>
      );
  }
}
```

Here **MyComponent** does nothing by as **MyOtherComponent** to render itself.

In cases like this, if you use Enzyme&#39;s [shallow][enzsh], you will only see the output from **MyComponent**. Indeed, that is often what you want. But sometimes, it is simpler to see the output from both **MyComponent** and **MyOtherComponent**. To do that, you use **mount** rather than **shallow**. We usually do this:

```javascript
import { shallow } from 'enzyme';
```

If you want to see output from both components, then do this:

```javascript
import { mount } from 'enzyme';
```

[enzsh]:https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md

## Testing Element with Complex Attributes {#on-change=attrs}

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

Yet testing for that exact string seems to fail no matter what I do, probably because [Function] is being expanded to something more than what is shown here. One solution, I found was to use **containsMatchingElement** instead of **contains**.

Here was my first attempt to match that that output:

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

## Creating ShowUserInfo

Make a copy of **GetUserInfo** and call it ShowUserInfo. Open your new file in an editor (probably webstorm) and change instances of the variable **GetUserInfo** to **ShowUserInfo**. There will be at least two such instances.

For now, you can leave most of **ShowUserInfo** as is, except for removing the method that queries the server with **fetch**. That method stays in **GetUserInfo**.

Open **GetUserInfo** in your editor and change the **render** method to look something like this:


```javascript
import fieldDefinitions from './field-definitions';

// CODE OMITTED

render() {
        return (
            <div className="App">
                <ShowUserInfo
                    fields={fieldDefinitions}
                    body={this.state.body}
                />
            </div>
        );
    }
```

This will not be our final solution, but it is a start. But before we try to get any further, we should set up our tests.

## Component Children

Now that you understand the difference between testing with **shallow** and **mount**, we are free to create a component that has a child Component. We will break up the GetUserInfo component into two pieces:

- GetUserInfo: This owns and handles the data
- ShowUserInfo: This component displays the data

The words that the React DOCS use are as a bit like following: "There should always be one canonical place where state is maintained." In our case, that is **GetUserInfo**. It will have state. It was also share that state with other components, in our case, **ShowUserInfo**. Quite often, and in our case, **ShowUserInfo** should have no state. If it does have state, it is not related to the properties that it receives from **GetUserInfo**.

The state passed by **GetUserInfo** to **ShowUserInfio** enters the constructor in the form of **props:**

```javascript
class ShowUserInfo extends Component {
    constructor(props) {
        super(props);
    }
}
```


## Testing ShowUserInfo

When we test **GetUserInfo** we might want, in some cases, to use Enzyme's **mount** because GetUserInfo has a child called **ShowUserInfo**. But **ShowUserInfo** has no such child, so we can test it with **shallow**. Inf fact, all your tests



## Multiple Fields

Code that looks like this is create if you have just a few fields.

```javascript
render() {
        return (
            <div className="App">

                <p className="App-intro">
                    state.userLogin: {this.state.userLogin}
                </p>

               <button className="getUser" onClick={this.getUser}>Get User</button>
            </div>
        );
    }
```

Here I have only one field, called **userLogin**. If you have many fields, as we will when we query Git, we will want to automatically generate the fields to save time. To do this, we need two files:

- One that describes the fields we want to create (field-definitions.js)
- One that knows how to create fields of a certain type. (ElfElements.js)

Here is the **src/field-definitions.js**:

```javascript
/**
 * Created by charlie on 4/20/17.
 */

/*eslint no-unused-vars: "off" */
const unknown = 'unknown';
const PARAGRAPH=0;
const TEXT=1;
const DEFAULT=PARAGRAPH;
const types = ['paragraph', 'text'];

export default [
    {
        id: 'login',
        label: 'loginName',
        type: types[DEFAULT],
        sample: 'login-' + unknown
    },
        label: 'Avatar Url',
        type: types[DEFAULT],
        sample: 'ai' + unknown
    },
    {
        id: 'url',
        label: 'Url',
        type: types[DEFAULT],
        sample: 'url' + unknown
    },
    {
        id: 'html_url',
        label: 'HTML Url',
        type: types[DEFAULT],
        sample: 'htmlUrl' + unknown
    },
    {
        id: 'followers_url',
        label: 'Followers URL',
        type: types[DEFAULT],
        sample: 'followersUrl' + unknown
    }
]
```

You probably recognize this data, as it mirrors some of the fields from our initial user query of GitHub:

```
curl https://api.github.com/users/charliecalvert
```

- **id** is the HTML id attribute for your control
- **label** is the text to put in the label for our control
- **type** is the element kind, such as P, TEXT, TEXTAREA, etc.
  - We will make TEXT controls INPUT controls of type **text**
- **sample** is the default text to display in the control

Here is a simple **Component** that knows how to read this file and return HTML elements of the right type and shape:

```javascript
import React, {Component} from 'react';
import '../css/forms.css';
import Debug from '../elf-logger';
const logger = new Debug(false);


class ElfElements extends Component {
    constructor(props) {
        logger.log("FORM INPUT", 'constructor called', props);
        super(props);
        logger.log("FORM PROPS", this.props);
    }


    render() {
        const common = {
            id: this.props.id,
            value: this.props.defaultValue,
            onChange: this.props.onChange
        };

        switch (this.props.type) {

            case 'year':
                return (
                    <input
                        {...common}
                        type="number"
                        value={this.props.value || new Date().getFullYear()}
                    />
                );

            case 'paragraph':
                return <p
                    className="ElfFormParagraph"
                    id={this.props.id}

                    onChange={this.props.onChange}
                >{this.props.value}</p>;

            case 'textarea':
                return <textarea {...common} className="ElfFormInput" value={this.props.value} />;

            case 'text': {
                return <input
                    className="ElfFormInput"
                    id={this.props.id}
                    value={this.props.value}
                    type={this.props.type}
                    onChange={this.props.onChange}
                />;
            }

            default:
                return <input {...common} type="text"/>;
        }
    }
}

export default ElfElements
```

For instance, the first definition in **field-definitions** return something like this JSX/HTML:

```HTML
<p class="ElfFormParagraph" id="login">login-unknown</p>
```

We can understand some of what is going on here, but how did the control the write data. We do it like this:

```javascript
/**
 * Created by charlie on 4/20/17.
 */

import React, {Component} from 'react';
import '../css/forms.css';
import 'whatwg-fetch';
import Debug from '../elf-logger';
import ElfElements from './ElfElements';
const logger = new Debug(false);

class ShowUserInfo extends Component {
    constructor(props) {
        super(props);
        //this.shouldUpdate = true;
        logger.log('ShowUserInfo constructor called.');
        logger.log('ShowUserInfo props.' + JSON.stringify(this.props.userData, null, 4));
    }

    getForm = (field, index) => {
        return (
            <div className="ElfFormRow" key={field.id}>
               <label className="ElfFormLabel" htmlFor={field.id}>{field.label}:</label>
               <ElfElements {...field}
                        value={this.props.body[field.id]}
                        onChange={this.props.onChange}
               />
            </div>
        )
    };

    render() {

        return (
            <form className="Form">{
                this.props.fields.map((field, index) => {
                    return this.getForm(field, index)
                })
            }
            <button className="getUser" onClick={this.props.onChange}>Get User</button>
            </form>
        )
    }
}

export default ShowUserInfo;
```

## Passing Fields to ShowUserInfo

```javascript
The props shown in the **constructor** is the state passed from **GetUserInfo**. Here is the relevant code from **GetUserInfo** even if it is not entirely comprehensibe quite yet:

```HTML
import fieldDefinitions from './field-definitions';

// CODE OMITTED

render() {
        return (
            <div className="App">
                <ShowUserInfo
                    fields={fieldDefinitions}
                    body={this.state.body}
                    onChange={this.getUser}
                />
            </div>
        );
    }
```

As you can see, **GetUserInfo** passes in three pieces of state to **ShowUserInfo**. These become the **props** seen in the constructor of **ShowUserInfo**. They are used when **ShowUserInfo** generates its code.
