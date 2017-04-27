## Overview

Learn to create a component that can automatically generate the HTML elements displayed in its Render method.

We have several major goals in this assignment. To learn how to:

- Learn about Nested components
- Pass state from the parent to the child componen
- To build a set of HTML controls based on a specification

## Creating ShowUserInfo

Make a copy of **GetUserInfo** and call it **ShowUserInfo**. Open your new file in an editor (probably WebStorm) and change instances of the variable **GetUserInfo** to **ShowUserInfo**. There will be at least two such instances.

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

Once we understood the difference between testing with **shallow** and **mount**, we are free to create a component that has a child Component. We did so when we broke up the **GetUserInfo** component into two pieces:

- **GetUserInfo**: This owns and handles the data
- **ShowUserInfo**: This component displays the data

As menmtioned earlier, the words that the React DOCS use are as a bit like following: "There should always be one canonical place where state is maintained." In our case, that is **GetUserInfo**. It will have state. It was also share that state with other components, in our case, **ShowUserInfo**. Quite often, and in our case, **ShowUserInfo** should have no state. If it does have state, it is not related to the properties that it receives from **GetUserInfo**.

**NOTE**: _fetch stays in GetUserInfo because we are using that component to handle cases in which data changes. Specifically, **fetch** retrieves data from the server and we use that data to change state. We use **GetUserInfo** when we want to manipulate data, and **ShowUserInfo** when we want to display data. This follows the rule "Each component should have only one reason to change." Or, to say the same thing somewhere differently: "Each class should do one thing and do it well." A third rule that applies here is specific to React: "There should be one place, and one place only, where data maintains state and can be mutated." Other components have **props** and are, at least in theory, immutable._

The state passed by **GetUserInfo** to **ShowUserInfio** enters the constructor in the form of **props:**

```javascript
class ShowUserInfo extends Component {
    constructor(props) {
        super(props);
    }
}
```

As you know, this state contains two objects:

- fields: A definition of the fields to display
- body: The data retrieved from GitHub

## Too Many Fields

Code that looks like this is easy to use if you have just a few fields.

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

Here I have only one field, called **userLogin**. It is fairly easy to write code that displays this one field.

If you have many fields, as we will when we query Git, the task becomes more difficult. In such cases, it might be helpful to automatically generate the fields.

**NOTE**: _A second reason to automatically generate fields is that it helps us to create regular, well formed code. Our code is easier to read if IDs. CLASSNAMES and attributes always come in a certain order, and if we follow certain coding practices such as using the same techniques for handling labels._

## Generating Fields

To automatically generate code for working with our fields requires two files:

- One that describes the fields we want to create (field-definitions.js)
- One that knows how to create fields of a certain type. (ElfElements.js)

## Field Definitions

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

You probably recognize this data, as it mirrors some of the fields from our initial user query of GitHub. Recall that you run code like this to view the data:

```
curl https://api.github.com/users/charliecalvert
```

- **id** is the HTML id attribute for your control
- **label** is the text to put in the label for our control
- **type** is the element kind, such as P, TEXT, TEXTAREA, etc.
  - We will make TEXT controls INPUT controls of type **text**
- **sample** is the default text to display in the control

## Processing Field Definitions {#process-fields}

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

## Using ElfElements

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

The props shown in the **constructor** of **ShowUserInfo** is the state passed from **GetUserInfo**. Here is the relevant code from **GetUserInfo**:

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

We got fields by loading a file that we created. The **body** comes from querying our server. But what is **onChange**? Lets tackle it in the last section of this document.

## Passing Events

The parent component, in this case **GetUserInfo** controls the data. In particular, we maintain the data in **GetUserInfo's** state, and we change it with this method:

```
getUser = (event) => {
  const that = this;
  fetch('/api/user')
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    logger.log('parsed json', json);
    var body = JSON.parse(json.body);
    that.setState({
      body: body
    });
    etc....
```

As mentioned earlier, we pass this method as a prop from **GetUserInfo** to **ShowUserInfo**:

```javascript
<ShowUserInfo
    fields={fieldDefinitions}
    body={this.state.body}
    onChange={this.getUser}
/>
```

Then we use it in **ShowUserInfo** like this:

```javascript
<button id="getUser" onClick={this.props.onChange}>Get User</button>
```

Given our knowledge of JavaScript, it is fairly simple to see how **this.props.onChange** becomes a call to the **GetUserInfo.getUser** The key fact, which is hard to grasp at first is how the changes made by that method are propagated back down to **ShowUserInfo**.

Obviously the task is handled by React. In particular, when we call **setState**, as we do in **getUser**, then two things happen:

- **GetUserInfo**'s **render** method is called.
- **ShowUserInfo**'s **render** method is called

It is the latter call that might not be intuitively obvious to us. It happens because **ShowUserInfo** is a child of **GetUserInfo** and hence react knows that properly re-rendering **GetUserInfo** involves also re-rendering **ShowUserInfo**.

## Turn it in

Add, commit, push. Tell me what directory your code is in. Then either tag it and give me the tag, or put it in a branch. For instance, after you pushed, issue this command:

  git branch Week04-ReactPropsShow

There is not even a need for you to ever switch to that branch. You can just continue working in your current branch, which is probably **master**. When it comes time to grade your work, I can open your branch and take a look. Or perhaps I will simply look at your most recent code instead. For that reason, you might submit two pieces of information:

- The branch you put the assignment in
- The branch you are working in

For instance:

- Assigment Branch: Week04-ReactPropsShow
- Working Branmch: master
