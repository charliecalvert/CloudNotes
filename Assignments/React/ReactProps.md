## Overview

We will learn a bit about React props by continuing to expand the [rest-basics][restb], [ReactBasics][rb] and [ReactMicroServices][rms] programs. We will try to understand properties, and to see how they can be passed from one component to another.

In this assignment we are trying to create something that looks a bit, but not very much, like this:

![React Props UI](https://s3.amazonaws.com/bucket01.elvenware.com/images/ReactPropsUi.png)

At the top we see some data from our GitHub account. Yours will, of course, differ from what I see in my app. Next we see a call to one or more Micro Servers. Finally, we see the original data retrieved from our **/test-routes/foo** route developed in Rest Basics.

## Define Terms

There are a few terms we need to know here:

- API: An Application Programming Interface provides means of communication between software components. It allows us to call functions or objects. An API may be defined in process, in the OS, across the web or even in a database. In short, the word API is very generic. Contrast with our Web API defined below.
- Web Service: A means of communicating across a network, usually by calling functions or objects over the network. Since it is over the web, the protocol used is usually HTTP. Web Services usually use WSDL or SOAP to define their interface. It is an API defined with WSDL or SOAP and called across a network. Ultimately we are just calling an endpoint, but it usually looks like a regular function call rather than **fetch** request. (Underneath it might be using **fetch** or similar, but it doesn't look that way to us.)
- [Web API](https://en.wikipedia.org/wiki/Web_API). Same as an API, but with a network and without the WSDL and SOAP. Usually we just use HTTP to call Routes (endpoints) across a network. Our micro services and Main Server host simple Web APIs.

The [Github API](https://developer.github.com/v3/) is a Web API. It allows us to make calls across a network, but spares us the arcane details found in SOAP and WSDL.

## Tag

Since we are often working on a single project that has multiple phases, let's create a Git **tag** marking our current status. If you already have a [properly formatted tag][emtf] in your repository, then use [elf-tagger][emt].

If you don't have any tags in your repository yet, then do this to create a properly formatted tag:

```bash
$ git tag -a v1.0.0 -m "Finished core of RestBasics"
$ git push origin v1.0.0
$ git tag -n1
```

The first command creates a tag that has a message associated with it. The message works much like the message in a commit.

The second command pushes the tag from your local machine to the cloud.

The last command lists your tags and their message on one line. If you have only a single tag, it is not particularly useful, but once you have multiple tags you will see how helpful this can be. Increase the value of the number after -n? to see more information about your tag. You can read about tags here:

- [git tag docs](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

You might create multiple tags for an assignment, but one of the tags should be made just after you commit and push the code you want me to see. Then turn in that tag with the assignment.

After creating this first tag, we should be able to use [elf-tagger][emt] for the rest of our tags.

## New Branch

If you have not already done so, create a new branch called **Week04**. You **must** put your homework for week four in this branch and merge you completed code back into master! (You can do it!)

```bash
git branch Week04
git checkout Week04
```

Write some code, commit your work. Push it:

```bash
git push --set-upstream origin Week04
```

## Images and CSS

Let's change the revolving image found at the top of our default **create-react-app** program perhaps called something like **Week02-RestBasics**.  I found images here:

- <https://pixabay.com/en/gold-fish-aquarium-goldfish-fins-30831/>
- <https://pixabay.com/en/goldfish-fins-tropical-animal-47022/>
- <https://commons.wikimedia.org/wiki/File:Small_SVG_house_icon.svg>
- <https://commons.wikimedia.org/wiki/File:Flower-of-Life-91circles36arcs.svg>
- <https://commons.wikimedia.org/wiki/File:Tree-of-Life_Flower-of-Life_Stage.svg>

It's easy to swap in one of the these images for the default spinning "atomic logo". For instance, employ **wget** like this to help you get the job done:

```bash
cd src
mkdir images
cd images
wget https://upload.wikimedia.org/wikipedia/commons/6/60/Tree-of-Life_Flower-of-Life_Stage.svg
```

Now modify the **import** statement in **App.js** that loads your logo. You should load the image you downloaded instead. Note that I have picked an SVG file which should both be small and should load quickly. If a file name from the web is long, I sometimes rename it to something easier to read such as **tree-of-life.svg**.

Depending on your tastes and the image you choose to load, you may also want to edit the **background-color** for the **.App-header** in **App.css**.

To find more images you might like, try this search in Chrome/Chromium:

```
https://www.google.com/search?q=svg+free+small
```

In Google, turn to the images page. Select tools, and select **Labeled for non-commercial reuse** or something similar.

Also, let's put our images and CSS in their own folders:

- **src/css**
- **src/images**

You will need to make some changes to your code after doing this. In fact, you may have to play with these paths several times over the course of this assignment.

## Modularize

The key goal will be to move **App.js** to **components/App.js**. Then break **App.js** into discrete components such as **components/ElfHeader.js**, **components/Qux.js**, **components/GetUser.js** and **components/GetGists.js**.

For instance:

```bash
git mv App.js components/.
```

Right now, we are doing, or in the process of doing, two things in **App.js**. We are calling, with **fetch**, our **server** and microservices with the endpoints defined in the [ReactMicroServices][rmsep] assignment.

Each module will contain

- A stateless (function) React Component with the same name as the file in which they reside
- Parameters to pass in needed functionality as props. For instance, we will need to pass in **queryServer** to most of our components.

We have not implemented the server side code of the **GitUser** call, but we will do so later in this assignment. So we might as well get started.

Start be defining the stateless function in the module called **components/ElfHeader.js**. This component is as simple as the stateless component in ReactBasics, so I'll let you do that on your own.

**NOTE**: _I am realizing that I have erred in using the term stateless component. I should have been calling them **function components**. Some details are here:_

[Function and Class Components](https://reactjs.org/docs/components-and-props.html#function-and-class-components)

For now, whenever I say, or said, stateless component, assume I meant to say function component. If you see me call something a function component, assume I am talking about the thing I used to call stateless component. There is no excuse for getting this wrong, but before the new React Hooks came along in 16.8, there wasn't much difference between a function component and a stateless component. As a result, I tended to confuse the terms. No longer.

## Implement Qux

We have not yet covered passing props to stateless components, so I'll implement Qux for you, then let you do the other ones.

Here is how to define Qux without passing state:

```javascript
import React from "react";

export const Qux = () => (
    <button data-url="/qux-you-rang" onClick={this.queryServer}>Ring Qux</button>
);
```

It is short and sweet and also lightweight because it does not have the overhead of a **class**. That is why people like stateless components.

Unfortunately, it does not compile because **this.queryServer** is not defined. Even though we are not yet passing in **queryServer** as prop, let's right the code that would handle the paramenter if it were passed in:

```javascript
import React from "react";

export const Qux = ({queryServer}) => (
    <button data-url="/qux-you-rang" onClick={queryServer}>Ring Qux</button>
);
```

Notice that we now pass in a paramenter to our function. In our JSX, we call the paramenter directly, rather than qualifying it with **this.**.

Now go back in **components/App.js** and pass in **queryServer** as props. This part of the syntax is unchanged from similar examples you saw in **Isit320**:

```javascript
<Qux queryServer={this.queryServer}/>
```

The point is that we have replaced the **Qux button** originally declared in **App.js** with a call to the **Qux** stateless component that we just created. Or, to put it differently, we have moved the button from **App.js** to **Qux.js**. WebStorm will probably import **Qux.js** for you, but if it does not, manually add the code near the top of **components/App.js**.

Take a moment to make sure you understand how we use [target.dataset][tds] to tell **queryServer** which button was called and which URL to use. If you don't understand, ask me in class or discuss the matter in the discuission area. It is important to understand this part of modern HTML.

## Refactor

Now go ahead and refactor all the components out of App.js. When you are done, there should be no button declarations in App.js.

Note that in your implementation of **GitUser.js** you will need to add a **DIV** to your stateless function to wrap its two buttons.

When you are done, you should have at least the following in the components folder:

- App.js
- TestRoutes.js
- Qux.js
- GetUser.js
- GetGist.js

![React Props Refactored Button](https://s3.amazonaws.com/bucket01.elvenware.com/images/react-props-refactor.png)

Here you can see in the console window the proper responses to clicks on the various buttons.

## PropTypes

You can also use [PropTypes][ptrt] to get better warnings at runtime for props type mismatches.

![PropType warnings at run time][ptwrt]

First install the prop-types package in the **client** directory:

    npm install --save prop-types

Then add the tool to your Qux component:

```javascript
import PropTypes from 'prop-types';

export const Qux = ({queryServer}) => (
    <div>
        <button data-url="/qux-you-rang" onClick={queryServer}>Ring Qux</button>
    </div>
);

Qux.propTypes = {
  queryServer: PropTypes.func
};
```

Here we have declared **queryServer** to be of type function. If we passed in something that was not a function, or if declared that **queryServer** were of some other type such as string, then we would get an exception at runtime.

Do something similar for all your modules.

You can read more about PropTypes [here][aa] and [here][ab] and [here][ac].

## Query the GitHub API

Install request: **npm install --save request** in the **server** directory and in any other project that uses request. (For now, I think that is only **server**, but if you **require** (import) it elsewhere, then you will need to install it.)

In **git-user/routes/index.js** add the following method. If you have GitHub account, use yours, not mine:

```javascript
var request = require('request');

// EXISTING CODE OMITTED HERE
router.get('/user', function(req, res, next) {
    const options = {
        url: 'https://api.github.com/users/charliecalvert',
        headers: {
            'User-Agent': 'request'
        }
    };

    request(options, function(error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        const jsonBody = JSON.parse(body);
       console.log('body:', JSON.stringify(body, null, 4));
       res.send({error: error, response: response, body: jsonBody});
    });

});
```

## Prepare for Tests

In **client/src/index.js** pass in some default values to **components/App.js**:

```javascript
const appInit = {
  file: 'unknown',
  result: 'unknown',
  status: 'unknown',
  server: 'unknown',
  body: {login: 'unknown', id: 'unknown'}
};

ReactDOM.render(<App appInit={appInit} />, document.getElementById('root'));

```

And then use it in **App.js**:

```javascript
constructor(props) {
    super(props);
    this.state = props.appInit
}
```

Once you have that working, refactor a second time and put **appInit** in its own file. I called mine **app-init.js**, and for now, mine happens to be in the **src** directory, but ultimately we might want to refactor and move it elsewhere. Export the object literal.

You will now need to import this data into **client/src/index.js** and into your tests:

```javascript
import {appInit} from './app-init';
```

## Tests

As you refactor your components, your tests might need to change. For instance, if you move the H1 for your app into **components/ElfHeader.js**, you might need to change your tests. Consider this code:

```javascript
import App from './App';

// Code omitted here

it.only('renders and reads H1 text', () => {
    const wrapper = shallow(<App />);
    const welcome = <h2>Welcome to React</h2>;
    expect(wrapper.contains(welcome)).toEqual(true);
});
```

It will likely end up like this:

```javascript
import ElfHeader from './components/ElfHeader';

// Code omitted here

it.only('renders and reads H1 text', () => {
    const wrapper = shallow(<Header />);
    const welcome = <h2>Welcome to React</h2>;
    expect(wrapper.contains(welcome)).toEqual(true);
});
```

**HINT**: _When writing your tests, don't forget that App now has an attribute/parameter passed to it as props. So you will need to tweak the code to have it do more or less what it does on **client/src/index.js**. I'm being intentionally vague, as I want you to figure our the rest yourself._

## Logger Console {#control-console}

This section is optional and perhaps you should just skip it, as I would like to replace it at some point. Here are three steps to a poor man&#39;s logger:

- Declare a boolean in your constructor on your object called **quiet**.
- Create a method on your object called **debug**
- Use **debug** instead of console.log

Perhaps a bit like this:

```javascript
constructor() {
    super();
    this.state = {
        file: 'File Result will be placed here.',
        foo: 'waiting for express server'
    };

    // SET quiet TO false TO SEE DEBUG MESSAGES        
    this.quiet = true;
    this.debug('GetFoo constructor called');
}

debug = (message) => {
    if (!this.quiet) {
        console.log(message);
    }
};

getFoo = () => {
    const that = this;
    fetch('/api/foo')
        .then(function (response) {
            that.debug('GETONE-FETCH-ONE');
            return response.json();
        }).then(function (json) {
            that.debug('GETONE-FETCH-TWO');
            that.debug('parsed json', json);
            that.setState(foo => (json));
        }).catch(function (ex) {
            console.log('parsing failed', ex);
        });
};
```

## Refactor Tests

Create a directory called **src/tests** and put all your tests in it. Refactor your tests into modules that might look a little like this:

- App.test.js
- GetGist.test.js
- GetUser.test.js
- ElfHeader.test.js
- TestRoutes.test.js
- Qux.test.js

All we need now is simply to get the basic "I can load the module" test to work. In my case, at least, only **App.js** needed to be passed props to get the test to pass. Later, we will need to pass props to these other components, but you should not need to pass anything in at this point. More specifically, we are not yet at the point where we need to pass in **queryServer**.

In the images shown below, some of details may be slightly askew, but nevertheless these screenshots should help you get a sense of what I'm looking for and what your directory structure might look like.

![Test Output][rpt]
![Project Structure][proj-struct]

Simple components like **Qux** have a button on them. When we click the button, a method is called. So all we want to do is test if the method we pass in as props is called when the button is clicked.

## Test for Simple Components {#simple-component-test}

This worked for React Class Components:

```javascript
it('should call queryServer for a React Class Component', () => {
    const wrapper = shallow(<Qux queryServer={jest.fn()}/>);
    console.log('WRAPPER', wrapper.debug());
    const instance = wrapper.instance();
    console.log('INSTANCE', instance);
    const spy = jest.spyOn(instance.props, 'queryServer');
    wrapper.find('button').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1)
});
```

This worked for either a React Function Component or a React Class Component:

```javascript
it('should call queryServer for either React Class or Function', () => {
    const elfObj = { func: jest.fn() };
    const wrapper = shallow(<Qux queryServer={elfObj.func}/>);
    const spy = jest.spyOn(elfObj, 'func');
    wrapper.find('button').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1)
});
```

## Turn it in

First commit and push. Then tag and push. Designate the directory and branch in your repo where you did your work:

- Branch: XXX
- Folder: YYY

## Props Single Node Error {#props-single-node}

Please go here:

- [Elvenware React][elf-sync]

[elf-sync]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptReact.html#props-single-node

## ENOSPC Error {#enospc}

Please look here:

- [Elvenware React][elf-enospc]

[enospc]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-props-enospc.png
[elf-enospc]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptReact.html#enospc

## Bower

This is an outdated section, and no longer necessary. More specifically, you should already have **bower_components** in your **.gitignore** if you don't, put it there. I am, however, keeping this section for now in case some specific person needs to do this. However, most students can just ignore this entire section.

Unless you are sure you mean to do it. make sure that **components** is not listed in your **.gitignore** files.

Modify the hidden file **.bowerrc** to reference **public/bower-components**.

Add **bower-components** to **.gitignore**:

```
# Dependency directories
node_modules
jspm_packages
bower-components
```

Once again, be sure that you remove **components** from **.gitignore**

Here is **server/views/layout.jade** after this change with **bower-components** instead of **components**:

```javascript
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    link(rel='stylesheet', href='/bower-components/bootstrap/dist/css/bootstrap.css')
    // CODE YOU NEED TO MODIFY OMITTED HERE
  body
    block content
```

<!--       -->
<!-- links -->
<!--       -->

[aa]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactPropBasics.html#add-proptypes
[ab]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactPropsEsLint.html#proptypes
[ac]: https://reactjs.org/docs/typechecking-with-proptypes.html

[emt]: /teach/assignments/linux/ScriptMasterTags.html
[emtf]: /teach/assignments/linux/ScriptMasterTags.html#prime-the-pump
[gmm]: https://facebook.github.io/jest/docs/jest-object.html#jestgenmockfrommodulemodulename

[ptrt]: https://github.com/facebook/prop-types

[ptwrt]: https://s3.amazonaws.com/bucket01.elvenware.com/images/prop-types-runtime.png
[rb]: /teach/assignments/react/ReactBasics.html
[restb]: /teach/assignments/react/RestBasics.html
[rms]: /teach/assignments/react/ReactMicroServices.html
[rmsep]: /teach/assignments/react/ReactMicroServices.html#micro-endpoints
[tds]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
[rpt]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-props-tests.png
[proj-struct]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-props-file-structure.png
[proj-struct-old]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-refine-project.png
