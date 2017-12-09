## Overview

THIS IS A WORK IN PROGRESS. EACH TIME YOU VIEW IT, PRESS F5 TO REFRESH

The goal of the final is to demonstrate your ability to deploy web sites to the cloud. In particular, I want to see:

- WebCrafts working
- The specified tests working
- Code running on EC2
- Code running on the Firebase site
- Docker Container running on Port 30028

Please get the FirebaseReact assignment melded into your WebCrafts assignment. See below for what I mean by this.

Handy links to at least some assignments:

- [http://www.ccalvert.net/](http://www.ccalvert.net/)

Here you can see that I'm now using the app to create our assignments, including this final:

![Isit320FinalProducer][fpr]

## Routes

Everyone must understand routes to do well in this class. Here is an assignment to show me that you are up to speed:

- At the root of your repository, run1:
  - **CreateExpressProject final-routes**
  - **cd final-routes**
- In **routes/index.js** implement three routes:
  - One that returns { "result" : "route01"}
  - One that returns { "result" : "route02"}
  - One that returns { "result" : "route03"}
- In **index.pug** define three buttons that have the labels:
  - Route01, Route02, Route03
- In **control.js** write code so that the button called
  - **Route01** uses **fetch** to call **/route01**
  - **Route02** uses **fetch** to call **/route02**
  - **Route03** uses **fetch** to call **/route03**
 - Each button should display the result in a **PRE** tag.

By this time, fetch should just be built into the JavaScript implementation for all major browsers, so you probably don't need to run: **npm install whatwg-fetch**.

You don't have to use React or any other specific tools other than **Express** routes and **fetch**. Just make it work!

## Merging Code into WebCrafts

The parts of the Firebase assignments that I would like to see in WebCrafts:

- Login
- The **ShowUsers** and **ShowUser** dialogs that start to display the **ElvenConfig** file to the user in an easier to understand format.
- **Redux**

I think all this implies connection to the Firebase database.

I'm flexible on all of this. Do what you can. If all you get is the login, that's better than nothing. If we get the **ShowUsers** but not the database, that's also better than nothing. Just merge in what you can.

## The Merging: Key Steps {#key-steps}

Watch the [video](https://youtu.be/iA21zK3Idt8)

From **Week10-FirebaseReact** I needed these files:

- The Main Files that load the Login Page. In my case:
  - AppMain.js
  - FireDataPush.js
  - ElvenLogin.js
- ShowUsers.js
- ShowUser.js
- fire-reducer.js

The code from AppMain.js ended up in HomeButtons. And **HomeButtons** had to learn how to support Redux by linking in connect at the top:

    import {connect} from 'react-redux';

And MapStateToProps at the bottom:

```javascript
const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn,
        component: state.component,
        signInLabel: state.signInLabel

    }
};

HomeButtons = connect(mapStateToProps)(HomeButtons);
```

Near the bottom of **layout.pug**, I needed to add the code to load Firebase:

    script(defer='', src='https://www.gstatic.com/firebasejs/4.6.2/firebase-app.js')
    script(defer='', src='https://www.gstatic.com/firebasejs/4.6.2/firebase-auth.js')
    script(defer='', src='https://www.gstatic.com/firebasejs/4.6.2/firebase-database.js')

We are stripping out all the jQuery, so the main react file now starts like this:

```javascript
$(document).ready(function() {
    try {
        const root = document.getElementById('home');
        ReactDOM.render(

            <Provider store={store}>
                <MuiThemeProvider>
                    <div>
                        <HomeButtons/>
                    </div>
                </MuiThemeProvider>
            </Provider>
            , root);
    } catch (e) {
        console.error(e);
        document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
    }
//     homeDiv = document.getElementById('home');
//     home();
//     $.subscribe('reactMakeHtml', reactMakeHtml);
//     $.subscribe('reactMakeImages', reactMakeImages);
//     $.subscribe('home', reactHome);
});
```

The jquery removal:

- Remove the JumboTrons from index.pug and elsewhere.


## The Config File

Place your working **ElvenConfig.json** file in a folder of your repository called **ElvenConfig**. Include a section of the users node called **lastname**, where lastname is your last name. For instance, if your last name is Smith:

```json
{
  "users": {
    "calvert":{...},
    "smith": {...}
  },
  "selectedElvenImages": [...],
  "elvenImages": [...]
}
```

Go through your tests and find the places where the 'calvert' user is being used explicitly, and replace it with your last name. For instance, replace it with Smith.

The goal is to allow me to insert your lastname section in my ElvenConfig file and have it work out of the box.

Make sure the most recent Config file is on EC2.

When I run **Week10-FirebaseReact**, turn to the **Show Users** page and click a button, I expect them to be configured to use **/home/ubuntu**.

Here is how to change all instances of **bcuser** to **ubuntu** inside the **ElvenConfig.json** file:

    sed -i "s/bcuser/ubuntu/g" ElvenConfig.json

## Config File Route

To accommodate the new format for ElvenConfig.json we had to change our code. Specifically, when working on **Week10-FirebaseReact** we changed the **get-config** route in **routes/index.js**. Here is the the updated version of the method as found in **Week10-FirebaseReact**:

```
router.get('/get-config', function(req, res, next) { 'use strict';
    try {
        config.useLocalConfig = false;
        config.loadAsync()
            .then(function (configuration) {
                res.send({ configuration: configuration });
            })
            .catch(function (err) {
                throw err
            })
    } catch(e) {
        throw new Error(e);
    }
});
```

You should replace the **routes/makers** verison of that method with the code shown in above. Note that we changed the name of the route from **config** to **get-config**. That means you have to change the route you call when you press the **insertConfig** button in **FireDataPush**:

```javascript
insertConfig() {
  fetch('/makers/get-config')
    .then(...)
    .then(...)
    .catch(...)
}
```


## Merge Code you Forked

Be sure to merge in the latest changes from the repositories that you forked. I made changes as recently as November 29, 2017, but may do more.

If you have things set up correctly, per the [UpToDate][wu] assigment, it should be relatively easy to **fetch** and **pull**.

The Atom editor makes merging conflicts easier:

![Atom makes merging easy][am]

## Delete all old jQuery code

For instance:

Put a breakpoint here in make-html.js and make sure it never gets called:

```javascript
$.getJSON('/makers/config', function(configSummary) { ... })
```

Then just delete the entire file.

A simple way to get started is to stop loading **require** in **views/layout.pub**:

    //script(data-main="javascripts/main.js" src="/bower_components/requirejs/require.js")

Without **require**, you don't load jQuery, which means you can no longer use **document.ready** in **react-main**:

    //$(document).ready(function() { ... }

Replace it with **window.onload**:

```javascript
window.onload = function() { ... }
```

At that point you should be able to delete code that we commented out earlier. We can also delete the following directories and files:

- **make-html**, **make-image** and **tools**
- **control.js** and **main.js**

The **public/javascripts** directory before deleting all jQuery related code:

```nohighlighting
$ ll
total 3228
drwxrwxr-x 5 charlie charlie    4096 Dec  4 19:38 ./
drwxrwxr-x 6 charlie charlie    4096 Nov 21 11:31 ../
-rw-rw-r-- 1 charlie charlie 1498647 Dec  6 07:30 bundle.js
-rw-rw-r-- 1 charlie charlie 1775651 Dec  6 07:30 bundle.js.map
-rw-rw-r-- 1 charlie charlie     563 Dec  4 19:36 control.js
-rw-rw-r-- 1 charlie charlie    1217 Dec  4 19:36 main.js
drwxrwxr-x 2 charlie charlie    4096 Dec  4 19:36 make-html/
drwxrwxr-x 2 charlie charlie    4096 Dec  4 19:36 make-image/
drwxrwxr-x 2 charlie charlie    4096 Dec  4 19:36 tools/
```

The commands to delete the jQuery related code, These should be issued in the **public/javascripts** directory:

```nohighlighting
git rm control.js main.js
git rm -r make-html/ make-image/ tools/
```

After issuing the before commands:

```nohighlighting
$ ll
total 3208
drwxrwxr-x 2 charlie charlie    4096 Dec  6 07:35 ./
drwxrwxr-x 6 charlie charlie    4096 Nov 21 11:31 ../
-rw-rw-r-- 1 charlie charlie 1498647 Dec  6 07:30 bundle.js
-rw-rw-r-- 1 charlie charlie 1775651 Dec  6 07:30 bundle.js.map
```

## Get latest isit-code and isit-site-tools

Run **npm outdated**

If there are problems, to fix, run **npm update** or get in there and fix it by hand.

```nohighlighting
$ npm outdated
Package                   Current  Wanted  Latest  Location
babel-eslint                8.0.1   8.0.2   8.0.2  isit-web-crafts
enzyme                      3.1.0   3.2.0   3.2.0  isit-web-crafts
enzyme-adapter-react-16     1.0.2   1.1.0   1.1.0  isit-web-crafts
eslint                     4.10.0  4.12.1  4.12.1  isit-web-crafts
eslint-plugin-react         7.4.0   7.5.1   7.5.1  isit-web-crafts
isit-code-lastname         1.0.0   1.0.1   1.0.1  isit-web-crafts
isit-sitetools-lastname    1.0.1   1.0.3   1.0.3  isit-web-crafts
mongoose                   4.12.4  4.13.5  4.13.5  isit-web-crafts
react                      16.0.0  16.2.0  16.2.0  isit-web-crafts
react-dom                  16.0.0  16.2.0  16.2.0  isit-web-crafts
react-test-renderer        16.0.0  16.2.0  16.2.0  isit-web-crafts
webpack                     3.8.1   3.9.1   3.9.1  isit-web-crafts
webpack-dev-server          2.9.3   2.9.5   2.9.5  isit-web-crafts
charlie@rohan-mintc ~/Git/WebCrafts-Isit320/jespinoza/isit-webcrafts-jespinoza (master)
$ npm update
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.1.3 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.1.3: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

+ isit-sitetools-lastname@1.0.3
+ isit-code-lastname@1.0.1
+ react-dom@16.2.0
+ react@16.2.0
+ babel-eslint@8.0.2
+ enzyme@3.2.0
+ eslint-plugin-react@7.5.1
+ enzyme-adapter-react-16@1.1.0
+ eslint@4.12.1
+ mongoose@4.13.5
+ react-test-renderer@16.2.0
+ webpack-dev-server@2.9.5
+ webpack@3.9.1
added 138 packages, removed 17 packages, updated 49 packages and moved 5 packages in 11.72s
````

## Tests

In **isit-web-crafts**, set your **__mocks__/mock-data.js** file to the following:

```javascript
const getData = (url) => {
    switch (url) {
        case '/api/foo':
            return {
                foo: 'url-mock-bar',
                file: 'url-mock-api.js'
            };

        case '/makers/config':
            const configSummary = {
                'base-dir': '/home/bcuser/',
                'bootswatch': 'cosmo',
                'most-recent-date': '2017-08-14',
                'highlight': true,
                'siteDirs': [
                    'Documents/AllTest',
                    'Git/CloudNotes/Isit320'
                ],
                'destinationDirs': [
                    '/var/www/html/AllSite/',
                    '/home/charlie/Git/CloudNotes/Isit320/'
                ],
                'destination-dirs-extra': [{
                    'base': '/var/www/html/',
                    'extra': ''
                }, {
                    'base': '/var/www/html/Assignments/',
                    'extra': 'Assignments'
                }]
            };
            return configSummary;

        case '/makers/walk?siteDirsIndex=1':
            const walkResult = {
                result: 'success',
                baseDir: undefined,
                mostRecentDate: undefined,
                destinationDir: '/home/charlie/Git/CloudNotes/tips/',
                directories: ['/home/charlie/Git/CloudNotes/Tips'],
                masterListOfNames: ['* [Summary.html](Summary.html)'],
                htmlFilesWritten:
                    ['/home/charlie/Git/CloudNotes/tips/Summary.html',
                        '/home/charlie/Git/CloudNotes/tips/master-list.html']
            };

            return walkResult;

        default:
            return {};
    }
};

export default getData;
```

Have the render method for **MakeHtmlDropDowns** contain, among other things, button with the ID **generate** and a PRE tag with the ID **configSummary**:

```HTML
render() {
      return (
          <MuiThemeProvider>
              <div>
                  <h1>Render Markdown as HTML</h1>
                  // OTHER CONTROLS OMITTED HERE
                  <RaisedButton
                      id="generate"
                      style={buttonStyle}
                      primary={true}
                      onClick={this.generateHtml}
                  >
                      {this.state.walk}
                  </RaisedButton>

                  <pre id="configSummary">{this.state.configSummary}</pre>
              </div>
          </MuiThemeProvider>
      );
  }
```

Make sure that **make-html-drop-downs.js** has at least the following in it and that all tests pass:

```javascript
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import MenuItem from 'material-ui/MenuItem';
import MakeHtmlDropDowns from '../MakeHtmlDropDowns';
import ElfDebugEnzyme from '../ElfDebugEnzyme';
const elfDebugEnzyme = new ElfDebugEnzyme(true, 'make-html-drop-downs');

describe('React Home Tests', () => {
    it('renders default value of H1 tag', () => {
        const wrapper = shallow(<MakeHtmlDropDowns />);
        const h1tag = <h1>Render Markdown as HTML</h1>;
        elfDebugEnzyme.getLast(wrapper, 'h1', true);
        expect(wrapper.contains(h1tag)).toEqual(true);
    });

    it('gets drop down value', () => {
        const wrapper = shallow(<MakeHtmlDropDowns />);
        //elfDebugEnzyme.getAll(wrapper, true);
        elfDebugEnzyme.getLast(wrapper, 'MenuItem', true);
        const code = <MenuItem primaryText='/home/charlie/Git/CloudNotes/Isit320/'/>;
        expect(wrapper.containsMatchingElement(code)).toBe(true);
    });

    it('renders button click message for last pre tag', () => {
        const wrapper = shallow(<MakeHtmlDropDowns />);
        wrapper.find('#generate').simulate('click');
        elfDebugEnzyme.getLast(wrapper, 'pre', true);
        const paragraphData = wrapper.find('pre').last().debug();
        expect(paragraphData).toContain('/home/charlie/Git/CloudNotes/tips');
    });

});
```

In particular, the PRE tag, though empty when the test starts, should be modified during the test, and should contain the following:

```pre
<pre id="configSummary">
      [
          &quot;/home/charlie/Git/CloudNotes/tips/Summary.html&quot;,
          &quot;/home/charlie/Git/CloudNotes/tips/master-list.html&quot;
      ]
</pre>
```

Add a fourth test that proves that the page has a an element that matches this tag:

```pre
<pre id="configSummary" />
```

The body of the test should contains four lines, the last two of which would look like this:

```javascript
elfDebugEnzyme.getLast(wrapper, 'pre', true);
expect(wrapper.containsMatchingElement(code)).toBe(true);
```

The test should not include a button click. In other words, we are proving the tag exists before the button is clicked.

Also, the following programs should the specified number of tests passing.

## Firebase

Your Firebase app should:

- Run on the Firebase cloud. We also have Firebase running on EC2, but this should have firebaseapp.com in the URL.
- I should be able to query for, and add new, Presidents.
  - The presidents can show up only in the console.
  - For extra credit, display them on the main page in a UL element.

Part of the security mechanism for Firebase is to make sure that the app can only be run from authorized locations. When you move to EC2, you might get an error like this one: **uncaught exception: Error: This domain (34.333.134.3) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.**

![Firebase EC2 Error][fbe]

When adding the domain, use the long name from EC2. It looks something like this:

    ec2-34-233-323-3.us-west-2.compute.amazonaws.com

You can find it on the AWS EC2 **instances** page.

## EC2 Ports and Security Groups

View your EC2 instances **inbound rules** and make sure 30025, 30026 and 30027 are listed as open:

- [Details are here][ecsg]

## All projects Should Build on EC2

This is not the same thing as saying that they work. It just means I can go into any directory in your repository and type **npm install** and it will complete without errors. I should also be able to type **npm start** and go to the browser and see that the application loads without error. It need not run correctly, but it should not throw errors when it loads. No red text!

## The .gitignore File

Must contain the following:

- .idea
- node_modules
- bower_components
- bundle.js
- bundle.js.map


And should contain:

- .c9

## Turn it in

This video shows one possible interpretation of what to do with the final:

- [Charlie's Final Final](https://youtu.be/joSQBo8swZU)

Here is a preliminary list of what I'm looking for:

- Webcrafts should work
  - Markdown to HTML
  - Images to HTML
- On EC2 and kept running with **systemd**
  - WebCrafts running on port 30025
  - Firebase React on 30026
  - Firebase Express (the HTML version) on 30027
  - Send me the link to the long name for your app:
    - ec2-xxx-us.west-2-compute-amazonaws.com:3002X.
  - Install Apache and after I run WebCrafts I should be able to see pages there.
- Repositories:
  - Webcrafts
    - Webcrafts
    - isit-code
    - isit-site-tools
  - Main Repository:
    - ...
- Firebase
  - Load code that allows me to log in
  - The URL of your application running on the Firebase servers. Not a local copy, a copy running in the Firebase cloud. (We also have Firebase code running on EC2, but that is a different part of the assignment.)
- Tests
  - Read the tests section above and make sure you meet the requirements

For all the code I need to see:

- repository
- directory
- branch

I'm expecting to find your _final_ code in **master**, but it would not be a serious mistake to have it elsewhere so long as you say where. If you don't say where, I will look only in master. But I want to see that you have been working in various branches with checkin dates distributed throughout the quarter.

The command **npm outdated** should show that you have the most recent versions of your **isit-code** and **isit-site-tools** in your **package.json**. This is not just a minor point. Make sure you have this right! Your code probably won't work if it is not right.

Projects should build on EC2. See the list of projects that need to build on EC2 in the appropriate section above.

Delete dead code and code that has been commented out. This is your final, and it should look as nice as possible.

## Extra Credit

For Presidents in the FirebaseExpress and FirebaseReact apps, display the Presidents on the appropriate page.

In the testing section of this exam, you saw several examples of how to use the data from MockData file. Add three more tests that involve the MakeImages rather than the MakeHtml page. These tests could be similar to those in **make-html-drop-downs**, but they should involve the images page. You will need to add mock data to the **__mocks__/MockData.js** file.

The Presidents are not part of WebCrafts. But in the pure HTML solution, and FirebaseExpress mixins and Pug solution, you should be able to enter a new president and display a list of existing presidents in the console. The buttons are already there and should call the right methods: pushPresidents and getPresidents. They only work when you are logged in.


## Extra Credit Login

It would be nice if the user were first presented with the login page, and only after logging in could see the rest of the app. This is the way the app worked before we commented out the code for the old login system in **routes/index.js**.

For extra credit, you could try to get that working again, but this time with the Firebase login system. I don't care if the solution you come up with is actually secure, just so that it appears to be secure.

In particular, in the old system, if the user went to the home page, all they could see was the login screen until they were logged in. There was middleware that ensured (at least in theory) that no other request worked until the user was logged in. That's a high bar, but any progress you want to make down that road would be great to see.

## Long Link to EC2

This is reminder to send me the long link to your EC2 instance. It might look a bit like this:

- ec2-xxx-us.west-2-compute-amazonaws.com.

## Attitude

Complete as much of the exam as you can. It is better to get it in, and get it in more or less on time, than to spin trying to complete something you don't understand.

I'm mostly interested in seeing that you:

- Show clear evidence that you learned something
- Did the homework more or less on time
- Came to class

Students start in different places. I'm looking for evidence that a student worked hard and learned something new rather than being overly concerned with whether they can complete each assignment perfectly.

When I was growing up, A's were not fetishized. People could and very frequently did get into Ivy League colleges with a B average. Today, in the technical world, what matters is the interview, not your grades. As a result, I try to keep things simple and give students the grade they deserve.

## Server Ports

Make sure programs that run on a server port such as 30026 are set up like this in **www/bin**:

```javascript
var port = normalizePort(process.env.SERVER_PORT || '30026');
```

Note that we are using **SERVER_PORT** rather than **PORT**.

## Gratuitous Hint

Fancier Bash hints on current repo. Near top of **.bashrc**:

```bash
COLOR_RED="\033[0;31m"
COLOR_YELLOW="\033[0;33m"
COLOR_GREEN="\033[0;32m"
COLOR_OCHRE="\033[38;5;95m"
COLOR_BLUE="\033[0;34m"
COLOR_WHITE="\033[0;37m"
COLOR_RESET="\033[0m"

function git_color {
  local git_status="$(git status 2> /dev/null)"

  if [[ ! $git_status =~ "working directory clean" ]]; then
    echo -e $COLOR_RED
  elif [[ $git_status =~ "Your branch is ahead of" ]]; then
    echo -e $COLOR_YELLOW
  elif [[ $git_status =~ "nothing to commit" ]]; then
    echo -e $COLOR_GREEN
  else
    echo -e $COLOR_OCHRE
  fi
}

function git_branch {
  local git_status="$(git status 2> /dev/null)"
  local on_branch="On branch ([^${IFS}]*)"
  local on_commit="HEAD detached at ([^${IFS}]*)"

  if [[ $git_status =~ $on_branch ]]; then
    local branch=${BASH_REMATCH[1]}
    echo "($branch)"
  elif [[ $git_status =~ $on_commit ]]; then
    local commit=${BASH_REMATCH[1]}
    echo "($commit)"
  fi
}
```

Below the PS1 statements and right before **unset color prompt** :

```bash
PS1+="\[\$(git_color)\]"
PS1+="\$(git_branch)"                       # prints current branch
PS1+="\[$COLOR_BLUE\]\n\$\[$COLOR_RESET\] "   # '#' for root, else '$'
```

## I get $ is not defined

If you get a **$ is not defined** it probably means you have not run **bower install**.

## The ES6 Spread Operator

Use of the the [spread operator][soo] still requires STAGE-0:

    npm install --save babel-preset-stage-0

Here is the kind of error you get if you don't have ES6 STAGE-0 installed:

```nohighlighting
ERROR in ./source/reducer.js
Module build failed: SyntaxError: Unexpected token (12:16)

  10 |         case 'SWITCH_COMPONENT':
  11 |             return {
> 12 |                 ...state,
     |                 ^
  13 |                 configured: true,
  14 |                 component: action.component,
  15 |                 userName: action.userName
```

- [Spread Operator Overview][soo]
- [Stage 0][szero]

## Close Down EC2 Instances

You can keep, delete, mangle, change in whatever way you want your EC2 instances after December 11, 2017. See the Canvas announcement on this subject for more information.

[ecsg]:http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2GetStarted.html#step-04-b-security-groups
[wu]: http://www.ccalvert.net/books/CloudNotes/Assignments/WebCrafts/WebCraftsUpToDate.html
[am]: https://s3.amazonaws.com/bucket01.elvenware.com/images/up-to-date-merge-atom.png
[fbe]:https://s3.amazonaws.com/bucket01.elvenware.com/images/firebase-not-auth.png
[fpr]:https://s3.amazonaws.com/bucket01.elvenware.com/images/is320-final-2017-producer.png
[soo]:(http://es6-features.org/#SpreadOperator)
[szero]: (https://babeljs.io/docs/plugins/preset-stage-0/)
