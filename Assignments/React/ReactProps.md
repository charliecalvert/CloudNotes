# React Props

We will learn a bit about React props by continuing to expand the **week02-rest-basics** program. We will try to understand properties, and to see how they can be passed from one component to another.

In this assignment we are trying to create something that looks a bit like this:

![React Props UI](https://s3.amazonaws.com/bucket01.elvenware.com/images/ReactPropsUi.png)

At the top we see some data from our GitHub account. Yours will, of course, differ from what I see in my app. Next we see a call to one or more Micro Servers. Finally, we see the original data retrieved from our **/foo/api** route developed in a previous assignment.

## Define Terms

There are a few terms we need to know here:

- API: An Application Programming Interface provides means of communication between software components. It allows us to call functions or objects. It is the same as a Web Service, but without the network, and without SOAP and WSDL.
- Web Service: A means of communicating across a network, usually by calling functions or objects over the network. Since it is over the web, the protocol used is usually HTTP. Web Services usually use WSDL or SOAP to define their interface. It is an API defined with WSDL or SOAP and called across a network.
- Web API. Same as an API, but with a network and without the WSDL and SOAP. Usually we just use HTTP to call Routes (endpoints) across a network. Our micro services are Web APIs.

The Github API is a web API. It allows us to make calls across a network, but spares us the arcane details found in SOAP and WSDL.

## Tag

Since we are often working on a single project that has multiple phases, let's create a Git **tag** marking our current status:

```bash
$ git tag -a v3.0.0 -m "Start Week03"
$ git push origin v3.0.0
$ git tag -n1
```

The first command creates a tag that has a message associated with it. The message works much like the message in a commit.

The second command pushes the tag from your local machine to the cloud.

The last command lists your tags and their message on one line. If you have only a single tag, it is not particularly useful, but once you have multiple tags you will see how helpful this can be. Increase the value of the number after -n? to see more information about your tag. You can read about tags here:

- [git tag docs](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

You might create multiple tags for an assignment, but one of the tags should be made just after you commit and push the code you want me to see. Then turn in that tag with the assignment.


## New Branch

If you have not already done so, create a new branch called **Week03**. You **must** put your homework for week three in this branch! (You can do it!)

```bash
git branch Week03
git checkout Week03
```

Write some code, commit your work. Push it:

```bash
git push --set-upstream origin Week03
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

Now modify the **import** statement in **App.js** that loads your logo. You should load the image you downloaded instead. Note that I have picked an SVG file which should both be small and should load quickly.

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

The key goal will be to move **App.js** to **components/App.js**. Then break **App.js** into discrete components such as **components/Header.js**, **components/GetFoo.js** and **components/SmallNumbers.js**.

For instance:

```bash
git mv App.js components/.
```

Right now, we are doing, or in the process of doing, two things in **App.js**. We are calling, with fetch, our server with the following routes:

| Module | Route     | Description |
| :------------- | :------------- |  :------------- |
| App.js         | /api/foo      | Get file, status, result |
| Micro01.js     | /bar       | Call You Rang in Micro Services |
| GitUser.js     | /user      | Get user information from GitHub |

Each module will contain

- A React Component with the same name as the file in which they reside
- **Constructor**
- A method that calls fetch
- A **render** method containing some JSX

We have not implemented the server side code of the **GitUser** call, but we will do so later in this assignment. So we might as well get started. Just set up a module with the four pieces described above and assume we will define the details later.

You will need to include code to properly maintain the state of each component. For instance, **App.js** will contain code for maintaining the following properties:

- file
- status
- result

**Micro01**, on the other hand, will only track **state** for one property called **youRang**.

For now, put all the buttons in the **render** method for **App.js**. Do not include them in the other modules. The buttons should have the following labels:

- Query API (App.js)
- Query Micro
- Query Git API  

Finally, you will need a module called **components/Header.js** that contains only the header:


## Refactor

After looking at this, we might decide that index.js is doing too much, and App.js should either be renamed or we should change its task by refactoring it. Let's do two things:

- Give App.js the responsibility to load the components that make up our app.
- Refactor App.js, and split out the call to the server into a new component.

| Module | Route     | Description |
| :------------- | :------------- |  :------------- |
| App.js         | None      | Load components |
| Header.js  | None   | Show Header  |
| FooApi.js      | /api/foo      | Get file, status, result |   
| Micro01.js     | /bar       | Call You Rang in Micro Services |
| GitUser.js     | /user      | Get user information from GitHub |


## Props

In **index.js** pass in some default numbers to **components/App.js**:

```javascript
const appInit = {
    file: 'File name will be placed here.',
    status: 'status will go here',
    result: 'result will go here',
};

class App extends Component {


    render() {
        return (
            <div className="App">
                // CODE TO LOAD OTHER COMPONENTS OMITTED
                <ApiFoo appInit={appInit} />
            </div>
        );
    }
}

export default App;

```

And then use it in **App.js**:

```javascript
import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
              file: props.appInit.file,
              status: props.appInit.status,
              result: props.appInit.result
      }
  }
  // CODE OMITTED Here
}

App.propTypes = {
    appInit: PropTypes.shape({
        file: PropTypes.string,
        status: PropTypes.string,
        result: PropTypes.string
    }),
};

export default App;
```

Do something similar for all your modules.

## Put appInit in its Own File {#num-int}

I called mine **app-init.js**, and for now, mine happens to be in the **src** directory, but ultimately we might want to refactor and move it elsewhere.

Of course, you will now need to import this data into **index.js** and into your tests:

```javascript
import appInit from './app-init';
```

## Query the GitHub API

Install request: **npm install --save request**

In **server/routes/api.js** add this method. If you have GitHub account, use yours, not mine:

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

We should refactor our code now. In the server/routes folder create a file called **git-api.js**. Move the method shown above into that file. Modify **server/app.js** to load **routes/git-api.js**. Modify our client side code to call the new **git-api/user** route.

## Tests

As you refactor your components, your tests might need to change. For instance, if you move the H1 for your app into **components/Header.js**, you might need to change your tests. Consider this code:

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
import Header from './components/Header';

// Code omitted here

it.only('renders and reads H1 text', () => {
    const wrapper = shallow(<Header />);
    const welcome = <h2>Welcome to React</h2>;
    expect(wrapper.contains(welcome)).toEqual(true);
});
```

**HINT**: _When writing your tests, don't forget that App now has an attribute/parameter passed to it._

## Logger Console {#control-console}

Here are Three steps to a poor man&#39;s logger:

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

Move your tests and **ElfDebugEnzyme** into their own folder called **src/\_\_tests\_\_**.

Refactor your tests into modules that might look a little like this:

- App.test.js
- GetFoo.test.js
- Header.test.js
- SmallNumbers.test.js

That's two underscores, the word _tests_, followed by two more underscores.

Some of the individual file names are not right for this project, but this screenshot should help you get a sense of what your directory structure should look like.

![Project Structure][proj-struct]

[proj-struct]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-refine-project.png

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


[gmm]: https://facebook.github.io/jest/docs/jest-object.html#jestgenmockfrommodulemodulename
