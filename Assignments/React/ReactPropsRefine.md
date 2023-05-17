---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/ReactPropsRefine.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/React
fileName: ReactPropsRefine.md
relativePath: /React/ReactPropsRefine.md
title: ReactPropsRefine
directoryName: React
category : react-guide
---

# React Props Refine

Clean up the [React Props GitHub API Program][rep].

## Key Features

The main goal will be to query the [GitHub API][gha] for a view of your account. We are building on work we did before.

![Create React Refine View][crrv]

This version of the app displays a few rows from the data returned from GitHub API in a component called **GetUserInfo**. Recall that this is a REST API, so we can call it by simply typing a URL into the address bar of browser. To see this in action, click the link below:

- <https://api.github.com/users/charliecalvert>

In your program remember to query your account not mine.

- Display at least five rows from the users URL as shown above. Don't display them all, as we will find a shortcut to help you create big forms with lots of fields.
- Make sure all your tests pass for the **GetUrlPage** component, the **GetFoo** component, the **SmallNumbers** component and the **ElfHeader** component. Each component's tests should be in its own file and all tests should be in a directory called **src/\_\_tests\_\_**.
- For now, continue to display the other information, such as **SmallNumbers** and **GetFoo**. Ultimately, we will learn how to use client side routes to switch component views, but for now, just show all the data on the same page, as shown below.
- Strive to eliminate all errors and warnings in your tests, in Chrome Developer Tools, and at the command line for your server and client.

Don't fuss too much at this stage with making things beautiful. Right now, we are just trying to get to the point where we can create components and tests. Appearance and site navigation come later. Soon, but later.

![Create React Refine Altogether][crra]

[crra]:https://s3.amazonaws.com/bucket01.elvenware.com/images/create-react-refine-altogther.png

## Rename

Change the name of the folder in which the program is stored to **GitExplorer**. Perhaps something like:

```bash
git mv week02-rest-basics/ GitExplorer
```

## Create CSS and Image Directories

Inside the **src** directory create directories called **css** and **images**. Move your CSS and SVG files into these directories. Check your tests and run your program and make sure you are not getting errors or warnings.

- Start your program: **npm/yarn start**
- In Chrome, open the Developer Tools: F12 or CTRL-SHIFT-I or **Settings | More Tools | Dev Tools**

## Check for Warnings and Errors

Check for warnings or errors

![Uh-oh! A warning][dtw]

**IMAGE**: _Uh-oh! To fix this, I would follow the hints in the warning to my **src/index.js** file._

![Same warning from command line][warncmd]

**IMAGE**: _The same warning as seen from the command line. Sometimes you might see problems at the command line that you don't see in the developer tools and vice versa. As you result, you should check both places._

When you turn in your code, you should always ensure that your program is completely free of warnings and errors.

[dtw]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-refine-warn.png

[warncmd]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-refine-cmdw.png

## Add Display for API User

By this time you should have refactored your code so that there is nothing about headers, **SmallNumbers**, or retrieving information from **/api/foo** in **App.js**. We want to re-purpose **App.js** so that it can be used to handler our request for **/api/users**.

Add request to your server:

  npm install request --save

Require it at the top of **routes/api.js**

```javascript
var request = require('request');
```

The data I return from the server is shaped, for now, like this:

```javascript
router.get('/user', function(req, res, next) {
    var options = {
        url: 'https://api.github.com/users/charliecalvert',
        headers: {
            'User-Agent': 'request'
        }
    };

    request(options, function(error, response, body) {
        // Print the error if one occurred
        console.log('error:', error);
        // Print the response status code if a response was received
        console.log('statusCode:', response && response.statusCode);
        // Print the HTML for the Google homepage.
        console.log('body:', body);
        res.send({error: error, response: response, body: body});
    });

});
```

Note that I'm sending back three properties:

- error
- response
- body

The last contains the core data that we want to retrieve from GitHub. The first few lines should look something like this, with your data rather than mine:

```javascript
{
    "login": "charliecalvert",
    "id": 1811478,
    "avatar_url": "https://avatars3.githubusercontent.com/u/1811478?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/charliecalvert",
    "html_url": "https://github.com/charliecalvert",
    "followers_url": "https://api.github.com/users/charliecalvert/followers",

    // MANY LINES OMITTED
}
```

You will also want to set up CSS to control the Avatar URL:

```javascript
img.avatar {
    width: 75px;
    height: 75px;
}
```

## Display User Data

The first step would be to rename **components/App.js** to **components/GetUserInfo.js**. That might look something like this on your system, where you may need to change or skip the first line:

```bash
$ cd GitExplorer/client/src/
$ git mv components/App.js components/GetUserInfo.js
```

Open up the source for **GetUserInfo.js**, and rename the component class from **App** to **GetUserInfo**. This will take two changes:

```javascript
// CODE OMITTED HERE
class GetUserInfo extends Component {
// CODE OMITTED HERE  
}

export default GetUserInfo;
```

Create a **getUser method** that looks a little like this:

```javascript
getUser = () => {

    const that = this;
    fetch('/api/user')
        .then(function (response) {
            // YOU WRITE IT
        }).then(function (json) {
            // DISPLAY WITH LOGGER AS NEEDED
            // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
            var body = JSON.parse(json.body);
            that.setState({userLogin: body.login});
        }).catch(function (ex) {
            // DISPLAY WITH LOGGER
        });
};
```

Ultmately, your setState method will need to be more complicated than this, as there is more than just a login field to dispay.

Add a paragraph and button in the render method to display your input.

Make any necessary changes in App.js.

![View the login name][vln]

[vln]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-props-refine-get-user.png

## Don't forget Enzyme Debug:

Here are part of my header tests with the debug info:

```javascript
describe('My Header tests', function () {
   import ElfDebugEnzyme from './ElfDebugEnzyme';
   const elfDebugEnzyme = new ElfDebugEnzyme(true, 'App.test.js');

    it('renders and reads H1 text', () => {
        const wrapper = shallow(<Header />);
        const welcome = <h2>Welcome to React</h2>;
        elfDebugEnzyme.getFirst(wrapper, 'h2');
        expect(wrapper.contains(welcome)).toEqual(true);
    });

    // MORE CODE HERE AND ELSEWHERE
});
```

## Each Test Suite Gets Unique Name

Make sure each test suite you create has a unique and easy to understand name:

```javascript
describe('My Get User Info Test', function () {...})
```

We need to be able to easily know where each failing test is located. Give the suite a good name, and it can help us quickly find the failing test so we can fix it:

```
My Get User Info Test › renders default message for state.userLogin

   expect(received).toEqual(expected)

   Expected value to equal:
     true
   Received:
     false
```

## EsLint

Make sure you have [ESLint](https://eslint.org/) installed as part of all your projects:

    npm install --save-dev eslint

Follow the steps in the [ESLint assignment][esl] to set up **.eslintrc.json** and **.eslintignore** as necessary.

## Turn it in

Commit, push. When you turn in the assignment, designate the directory in your repo where you did your work.

It would be good to tag your work just after you push an assignment. An ideal process:

- **add**, **commit**, **push**. When you commit, include a message that mentions the assignment name.
- **tag**, **push**. When you tag, include a message that mentions the assignment name.
- create a branch with the name **ReactPropsRefine**.

You don't have to use the branch, just create it. Then I can look in that branch for the code you submitted for the assignment. The branch would serve as a record of your project at the time your turned it in.

A reminder of how to tag:

```
$ git tag -a v3.0.? -m "Turning in ReactPropsRefine"
$ git push origin v3.0.?
```

The question mark stands for the next tag in your series of tags. For instance, on your system it might v3.0.4.


## Notes

Don't spend a lot of time fretting over whether or not this is the right architecture. I have several refactorings I want us to do as we add new features, but that is for next week. Just get this far.

[crrv]:https://s3.amazonaws.com/bucket01.elvenware.com/images/create-react-refine-view.png

[gha]: https://developer.github.com/v3/

[rep]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactProps.html

[esl]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactEsLint.html
