## Overview

Learning more about testing.

## Professional Development Cycles

Let's think about testing cycle in a professional shop. The following is not a definitive guide, but it is meant to give at least some sense of what happens in a well designed environment.

1. A dev writes one or more unit tests
1. Devs change code to make unit tests pass
  1. Repeat step 2 until tests pass
1. Commit changes
1. The commit automatically triggers a build
  1. Usually a VM is spun up and the build is deployed on it.
  2. If the build fails, go back to step 2
  3. If the build is successful, move on
1. The unit tests are run
  2. If the tests fail, go back to step 2
  3. Else move on
1. Run functional, integration and acceptance tests
  1. This could be done on a new VM with a new build
  1. If they fail, go back to step 1. (We go to step 1 because we need to write tests that capture the problem uncovered by the functional, integrataion and acceptance tests.)
  2. Else move on
3. Release a pre-alpha, alpha or beta and let users and/or testers pound on it.
  1. If there are issues, go back to step 1 and write tests that capture the problems found by users.
  2. If you want more features, go back to step 1
  2. If the users are happy, and the bug count is low enough, then release the product

There are several key benefits derived from steps 1-5

- Do our tests pass
- Does our code integrate with others devs code and still allow a clean build?
- Do our tests pass when integrated with other users code?

Clearly, this system would not work if there were no unit tests. They are the foundation on which software development at scale works.

Obviously, there are other kinds of tests beside unit tests. But in this class, we tend to focus on unit tests. I'll try to find time to learn more about other kinds of tests. But generally, by the time we Selenium up and running, its time to do something else. No one is really happy because we don't dig into the subject deeply enough. So we will probably stick with Unit testing.

The other thing to note here is how often this cycle occurs.
Some Build Numbers:

  - Current WebStorm build: **WS-172.4343.25** built October 19, 2017
  - For FireFox, go to [about:buildconfig](about:buildconfig) and click link.
  - Current Chrome: Version 61.0.3163.79 (Official Build) (64-bit)
  - Current Chromium: Version 62.0.3202.62 (Official Build)
    - Built on Ubuntu, running on Ubuntu 17.10 (64-bit)

These numbers imply that there are not just weekly builds, but perhaps multiple daily builds. Probably most of these builds end up on Step 4, because the build fails. Another huge set of builds fail because not all the tests pass.

This system is designed in part to automate the system so completely that a failure is not a big deal. Nevertheless, you still don't want to be the dev who breaks a build. To avoid this, you need to be able to two things:

- Ask questions and get answers, usually online.
- Write unit tests.

If you get the right answer and write the right unit tests, then you have a good chance of committing code that works. When the reports come back from the latest build, the odds are that the failures don't come from your desk.

Often shops go in two week sprints. This means that on the Friday at the end of a sprint, the team wants to produce a good build. If its 10 o'clock at night on Friday, and a bunch of devs are sitting around waiting for you to check in code that passes, you won't be happy. To avoid this:

- Start early so you can find where the problems are in your code
- Ask questions online or by email to help you find answers
  - Most people think email is a pain, online is better
- Write good tests

This is what I ask you to do:

- Start early
- Ask questions
- Write tests

Hopefully you can see why I ask you to do it.

## Bower Components

I've changed this in my scripts (cat $ELF_TEMPLATES/.bowerrc). But this was forked from an older program, and I had never made the change.

- Open **.bowerrc** and change **components** to **bower_components**.
- Do the same in **views/layout.jade** and in **public/javascripts/main.js**

For instance:

**Original**: jquery: 'components/jquery/dist/jquery',
**New**: jquery: 'bower_components/jquery/dist/jquery',
**Original**: link(rel='stylesheet', href='/components/bootswatch/cerulean/bootstrap.css')
**New**: link(rel='stylesheet', href='/bower_components/bootswatch/cerulean/bootstrap.css')

## Switch to Pug

First, we need to uninstall the Jade and install Pug:

```nohighlighting
npm uninstall --save jade
npm install --save pug
```

In **app.js**, change the view engine to pug (about line 19):

- Old: app.set('view engine', 'jade');
- New: app.set('view engine', 'pug');

Now we need to rename all **jade** files to **pug**. Save this file as **views/renameJadeToPug**. Make it executable. Run it.

```javascript
var filesystem = require("fs");
var path = require("path");

function rename(from, to) {
    filesystem.rename(from, to, function(err) {
        if (err) {
            throw(err);
        }
    });
}

function testMain(file, oldPattern, newPattern) {
    var base = path.basename(file, '.' + oldPattern);
    var ext = path.extname(file);
    var destination = base + '.' + newPattern;
    console.log('mv ' + file + ' ' + destination );
    rename(file, destination);
}

var getAllFilesFromFolder = function(dir, oldPattern, newPattern) {

    var results = [];

    var mainName;

    filesystem.readdirSync(dir).forEach(function(file) {
        var test = new RegExp(oldPattern).test(file)
        if (test) {
            testMain(file, oldPattern, newPattern);
        }

        results.push(file);
    });

    return results;

};

var oldPattern = "jade";
var newPattern = "pug";
var results = getAllFilesFromFolder('.', oldPattern, newPattern);
```

The directory before we ran the script:

```nohighlighting
$ ll
total 64
drwxrwxr-x  2 charlie charlie 4096 Oct 25 10:09 ./
drwxrwxr-x 15 charlie charlie 4096 Oct 25 09:59 ../
-rw-rw-r--  1 charlie charlie   84 Oct 14 12:56 error.jade
-rw-rw-r--  1 charlie charlie  811 Oct 14 12:56 index.html
-rw-r--r--  1 charlie charlie  262 Oct 18 10:43 index.jade
-rw-r--r--  1 charlie charlie  698 Oct 25 09:50 layout.jade
-rw-rw-r--  1 charlie charlie  950 Oct 14 12:56 login.jade
-rw-rw-r--  1 charlie charlie  316 Oct 14 12:56 logout.jade
-rw-rw-r--  1 charlie charlie 1195 Oct 14 12:56 make-html.html
-rw-rw-r--  1 charlie charlie 1515 Oct 14 12:56 make-html.jade
-rw-rw-r--  1 charlie charlie  233 Oct 14 12:56 pix-picker.html
-rw-rw-r--  1 charlie charlie  302 Oct 14 12:56 pix-picker.jade
-rw-rw-r--  1 charlie charlie  926 Oct 14 12:56 register.jade
-rwxr-xr-x  1 charlie charlie  935 Oct 25 10:09 renameJadeToPug.js*
-rw-rw-r--  1 charlie charlie   80 Oct 14 12:56 temp.html
-rw-rw-r--  1 charlie charlie  116 Oct 14 12:56 temp.jade
```

After running it:

```
$ ll
total 64
drwxrwxr-x  2 charlie charlie 4096 Oct 25 10:31 ./
drwxrwxr-x 15 charlie charlie 4096 Oct 25 09:59 ../
-rw-rw-r--  1 charlie charlie   84 Oct 14 12:56 error.pug
-rw-rw-r--  1 charlie charlie  811 Oct 14 12:56 index.html
-rw-r--r--  1 charlie charlie  262 Oct 18 10:43 index.pug
-rw-r--r--  1 charlie charlie  698 Oct 25 09:50 layout.pug
-rw-rw-r--  1 charlie charlie  950 Oct 14 12:56 login.pug
-rw-rw-r--  1 charlie charlie  316 Oct 14 12:56 logout.pug
-rw-rw-r--  1 charlie charlie 1195 Oct 14 12:56 make-html.html
-rw-rw-r--  1 charlie charlie 1515 Oct 14 12:56 make-html.pug
-rw-rw-r--  1 charlie charlie  233 Oct 14 12:56 pix-picker.html
-rw-rw-r--  1 charlie charlie  302 Oct 14 12:56 pix-picker.pug
-rw-rw-r--  1 charlie charlie  926 Oct 14 12:56 register.pug
-rwxr-xr-x  1 charlie charlie  955 Oct 25 10:30 renameJadeToPug.js*
-rw-rw-r--  1 charlie charlie   80 Oct 14 12:56 temp.html
-rw-rw-r--  1 charlie charlie  116 Oct 14 12:56 temp.pug
```

## Using jQuery in Tests

Right now I'm using a jest option called setupFiles that we can put in **package.json**:

```javascript
"jest": {
        "setupFiles": ["./source/setup-jest.js"]
 },
```

In **source/setup-jest.js**

```javascript
import $ from 'jquery';
global.$ = global.jQuery = $;
```

## Suppress RequestAnimationFrame Warning

In **source/temp-poly-fills.js**:

```javascript
const requestAnimationFrame = global.requestAnimationFrame = (cb) => {
    setTimeout(cb, 0)
};

export { requestAnimationFrame }
```

In **source/setup-jest**:

```javascript
import { requestAnimationFrame } from "./temp-poly-fills";
```

## Refactor Tests

We want to better organize our tests. For now, were are going to have three files in **__tests__** directory:

- sanity.js
- home-buttons.js
- react-home.js

**sanity** should contain three tests:

- Describe: WebCrafts Sanity Test (Example [here][rh].)
- Test 1: it expects true to be true (Example [here][rh].)
- Test 2: it renders ReactHome without crashing. (Example [here][rh].)
- Test 3: it renders HomeButtons without crashing

**react-home** should contain:

- Describe: React Home Tests
- **Test 1**:  it expects true to be true (Example [here][rh].)
- **Test 2**: renders default value of H1 tag

**home-buttons** should contain:

- **import**: '../../public/javascripts/tools/tiny-pub-sub.js';
- **describe**: WebCrafts Home Buttons Test
- **Test 1**:  it expects true to be true (Example [here][rh].)
- **Test 2**: renders state of XXX after button click

## Ignore Files in Coverage {#coverage-ignore}

By adding a **coveragePathIgnorePatterns** property to our **jest** object in **package.json**, we can clean up the appearance of our coverage reports.

```javascript
"jest": {
    "verbose": true,
    "coveragePathIgnorePatterns": [
        "/node_modules/",
        "ElfDebugEnzyme.js",
        "tiny-pub-sub.js",
        "temp-poly-fills.js"
    ],
    "setupFiles": [
        "./source/setup-jest.js"
    ]
},
```    

Here is a video showing the results of the **coveragePathIgnorePatterns** flag.

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/8tDc1q5FMUw?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## Button Clicks

Our next goal is to test what happens when the user clicks on the **MakeHtml** button.

If you look at the button, you can see that it is has an **ID** set to **MakeHtml**:

```xml
<RaisedButton
    id="makeHtml"
    style={buttonStyle}
    primary={true}
    onClick={this.makeHtml}>
      {this.state.makeHtml}
</RaisedButton>
```

You can see also that it calls a method of the **HomeButtons** object like this:

```
onClick={this.makeHtml}>
```

The method looks like this:

```javascript
makeHtml() {
    $.publish('clientMakeHtml', {
        message : "The user wants to makeHtml."
    });
}
```

In our unit test, the **enzyme** library allows us to search for our **RaisedButton** by **ID** and simulate a **click event** on that **Button**:

```javascript
wrapper.find('#makeHtml').simulate('click');
```

To test that the event actually occurs, and that the button behaves as expected, we can subscribe to the event it generates:

```javascript
$.subscribe('clientMakeHtml', (event, target) => {
    console.log(JSON.stringify(event, null, 4));
    console.log(target);
    expect(event.type).toBe('clientMakeHtml');
    expect(target.message).toBe('The user wants to makeHtml.');
});
```

The callback for the event has at least two parameters:

- event
- target

The **event** object is not terribly important to us, but we display its contents with **console.log** in case you are interested:

```javascript
{
    "type": "clientMakeHtml",
    "timeStamp": 1509145167069,
    "jQuery32102834246722752214": true,
    "isTrigger": 3,
    "namespace": "",
    "rnamespace": null,
    "target": {},
    "delegateTarget": {},
    "currentTarget": {},
    "handleObj": {
        "type": "clientMakeHtml",
        "origType": "clientMakeHtml",
        "guid": 1,
        "namespace": ""
    }
}
```

You can more or less ignore this object for now. Just glance at it so that you understand what it looks like.

Here is the target object:

```javascript
{ message: 'The user wants to makeHtml.' }
```

This should look familiar as we created it when we published our event:

```javascript
$.publish('clientMakeHtml', {
    message : "The user wants to makeHtml."
});
```

It should be clear to you that you can use this object to pass all kinds of information with multiple properties. On this occasion, however, we are passing an object with only one property called message.

Given the above, we can write two tests in our callback:

```javascript
expect(event.type).toBe('clientMakeHtml');
expect(target.message).toBe('The user wants to makeHtml.');
```

Putting it altogether, we get a test that looks like this:

```javascript
it('publishes clientMakeHtml event after button click', () => {
    const wrapper = shallow(<HomeButtons/>);
    $.subscribe('clientMakeHtml', (event, target) => {
        console.log(JSON.stringify(event, null, 4));
        console.log(target);
        expect(event.type).toBe('clientMakeHtml');
        expect(target.message).toBe('The user wants to makeHtml.');
    });
    wrapper.find('#makeHtml').simulate('click');
});
```

Looking at the code, note that we subscribe to the **event** the **button** generates before we click the **button**. If you understand what is happening, you can see that it could not be otherwise.

You should now write a similar test showing what happens when the **makeImage** button is clicked.

Here is another way of describing the above:

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/Z7bU9vlO6yY?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## A Gotcha {#surprise}

When writing my second test, I accidentally misnamed the event I was subscribing to. This meant that the **$.subscribe** method was never called, and my **expect** tests never run. Since there were no failed tests, my code appeared to succeed. (This is perhaps one of the reasons we should always start with failing code. You don't want to start with a test that passes even when the conditions don't meet the requirements.)

At any rate, I added another test that ensured that the **$.subscribe** method was called. You should add this code to your tests.

```javascript
it('publishes clientMakeHtml event after button click', () => {
    const wrapper = shallow(<HomeButtons/>);
    let subscriptionCalled = false;
    $.subscribe('clientMakeHtml', (event, target) => {
        console.log(JSON.stringify(event, null, 4));
        console.log(target);
        expect(event.type).toBe('clientMakeHtml');
        expect(target.message).toBe('The user wants to makeHtml.');
        subscriptionCalled = true;
    });
    wrapper.find('#makeHtml').simulate('click');
    expect(subscriptionCalled).toBeTruthy();
});
```

I've added a variable called **subscriptionCalled** that is initialized to false:

```javascript
let subscriptionCalled = false;
```

I set it to true at the end of the **$.subscribe** method:

```javascript
subscriptionCalled = true;
```

And here is the test to check that it was set to true, thus proving that the **$.subscribe** method was called.

```javascript
expect(subscriptionCalled).toBeTruthy();
```

An alternative would have been to use a method called **done** which is used to asynchronous code to tell **Jest** that a callback has been received. Since there are no callbacks in this code, it is not really an appropriate place to use it. However, it does allow us to write less verbose code. In that spirit, in this version, I have tried to remove the methods that are not needed.

```javascript
it('publishes clientMakeHtml event after button click with done', (done) => {
    const wrapper = shallow(<HomeButtons/>);
    $.subscribe('clientMakeHtml', (event, target) => {
        expect(target.message).toBe('The user wants to makeHtml.');
        done();
    });
    wrapper.find('#makeHtml').simulate('click');    
});
```

Though I continually violate this rule, it is generally considered better to write shorter code so that the reader of the code can understand it more readily.

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/TL7_Yg8b_sw?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## Turn it in

Push your work. Give me:

- repo
- branch (I'm expecting either master or Week06)
- folder

You might get a 5 (redo) if you don't tell me where to find your code.

[rh]: http://www.ccalvert.net/books/CloudNotes/Assignments/WebCrafts/WebCraftsJestStarter.html#sanity
