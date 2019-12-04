## Overview

[Puppeteer][ppt] is a tool for end-to-end testing. Most of the testing I have done
in my classes previously has been unit testing, which is about testing a single
object. End-to-end testing is about testing an entire application, or some
large portion of a project.

Puppeteer was created by the "The Chrome DevTools team", which I assume is
part of Google. At any rate, it runs your app inside a custom copy of Chromium.

**NOTE**: _It is possible to use your copy of Chromium rather than the custom
download version, but however that really works [it is not obvious][pcn]._

In the code I've been testing, the button clicks in our application have nearly
all been removed and the values sent from the server are displayed immediately
with the help of **useEffect**. I've asked you to convert from button clicks
to **useEffect**, so that is the route I take here.

In all cases, when working with Puppeteer, I want you to default to the
**git-ignore-test** repo. Your big final program should be able to work with
multiple repositories, but it is simplest if the Puppeteer tests work with
a single repository whose structure I know. Of course, if you want to write
a test that shows you can switch repos, that is a different matter, but by
default, go with our **git-ignore-test** repository.

## A Note on Customizing Code

In what follows, several times I'm going to ask you to modify your source
code simply to make it easier to test. This is a subject that causes controversy
in the developer community but I firmly believe that all could should be:

- Well formatted
- Easy to read
- Easy to maintain
- Loosely coupled
- Embraces the single responsibility principle
- Embraces the open/closed principle
- Testable

When we test our code, especially when writing unit tests, we can more readily
assure ourselves that it is both:

- Easy to maintain
- Loosely coupled
- Follows the single responsibility principle.

Often code cannot be tested because it lacks the attributes listed above.
By testing our code, we force ourselves to write loosely coupled, easy to
maintain, well focused, code.

Changing code to support end-to-end testing is not quite as easy to defend,
but I believe that many of the same principles apply. Perhaps more importantly,
making our code testable with a tool like Puppeteer gives us peace of mind.
If we can't easily prove to ourselves that our code works, then we can
never quite be sure that we can safely deploy our code to production servers.

Even if we only want to deploy our code to a test server, what good is testing
our code on our test server if our only reliable technique is to start clicking
buttons to see if they work? It is better by far if we can automate the
end to end tests to prove to ourselves that they work.

We should be able to test our code even after making small changes to be sure
we did not break anything. Furthermore, I think most of the changes I propose
can be used both by Puppeteer and by our traditional Jest with Enzyme tests.

## Get Started

Create a directory called **week11-puppeteer**.

Inside the directory run **npm init** and use your common sense to fill in
the fields. It's not essential but perhaps useful to set the main file
to **index.js**. Though we are using Puppeteer, our main testing engine will
still be Jest.

Now install **puppeteer**:

    npm i puppeteer

It should install very quickly if you have succeeded in omitting the Chromium
download, which I could not do. But the custom Chromium build was not that
long a download on my system.

## Testing without Jest

To help you get started with Puppeteer, let's use it once without Jest, and
then we will move on to write more traditional tests using a library
that helps us integrate Puppeteer into our Jest tests.

Create an empty file called **index.js** in the root of your directory.

We will also add a **you-rang-action** ID to your button and **you-rang-result** ID to
the appropriate **td**:

```html
<td id="you-rang-result" className="left">{youRang.serverData.result}</td>
<button id="you-rang-action" onClick={queryYouRang}>You Rang</button>
```

Notice that we now have to include **serverData** when we want to access the
data sent from the server.

We have added a new state variable and three HTML attributes. This is quite
a bit of machinery, but they are all lightweight, and they great simplify our
our tests.

## Testing You Rang

I'm going to give you all the code for automating our tests of YouRang without
using Jest.

```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('http://localhost:30025');
  await page.click('a[href="/you-rang"]');

  const h2 = await page.evaluate(() => [...document.getElementsByTagName('h2')].map((h2) => h2.innerText));
  console.log(h2);

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
      result: document.getElementById('you-rang-result').textContent
    };
  });

  console.log('Dimensions:', dimensions);

  await browser.close();
})();
```

Run it by typing **node index.js**.

Let's go through the code. We start by linking in Puppeteer. The next step is
to launch it:

```javascript
const browser = await puppeteer.launch({headless: false});
```

By setting headless to false, we are asking Puppeteer to open up their custom
version of Chromium on the desktop so we can see it in action. Normally we
run with **headless** set to true so that it runs invisibly in the background.

To see this more clearly, launch puppeteer with **slowMo** set to 350
milliseconds:

```javascript
const browser = await puppeteer.launch({headless: false, slowMo: 350});
```

The next step is to create a new [page][page] and to use it to load our
application.

```javascript
const page = await browser.newPage();
```

Perhaps this is an oversimplification, but I picture this as
being the equivalent of creating a new tab in the Chromium browser. See the
link provided above for more details.

We use our new tab to host our application:

```javascript
await page.goto('http://localhost:30025');
```

Needless to say, we won't be able to navigate to our application unless
it is in fact running. Most of us have our app running in the background
all the time in our docker containers, so this should be a no-op.

We now click our link to the **You Rang** page and visit it in the
browser tab.

```javascript
await page.click('a[href="/you-rang"]');
```

This code says that Puppeteer should click the HTML anchor that has an href
attribute set to **/you-rang**. See in particular, this code from
**main/source/App.js**:

```html
<li><Link to="/you-rang">You Rang</Link></li>
```

If you look at the HTML that JSX generates from this code you will see that at
runtime it is an HTML anchor.

Finally, we twice evaluate our page to see if things are working as we expect:

First we check that the H2 element contains the value we associate with the
the **YouRang** page:

```javascript
const h2 = await page.evaluate(() => [...document.getElementsByTagName('h2')].map((h2) => h2.innerText));
console.log(h2);
```

Now let's see if our call to the server works. In the last line of this code
we check to see that that the element with the ID **you-rang-result** contains
not 'unknown', but data sent from the server:

```javascript
 // Get the "viewport" of the page, as reported by the page.
 const dimensions = await page.evaluate(() => {
   return {
     width: document.documentElement.clientWidth,
     height: document.documentElement.clientHeight,
     deviceScaleFactor: window.devicePixelRatio,
     result: document.getElementById('you-rang-result').textContent
   };
 });

 console.log('Dimensions:', dimensions);

 await browser.close();
 ```

 This should generate output at the command line that looks like this:

 ```javascript
 [ 'Midterm from Calvert', 'You Rang' ]
Dimensions: {
  width: 785,
  height: 600,
  deviceScaleFactor: 1,
  result: ' system-environment you rang'
}
```

I'm including the **width**, **height**, and **deviceScaleFactor** because
they are included in ever getting started demo. We care the **result**
property.

In the last line we close the browser:

```javascript
await browser.close();
```

## Testing with Jest

The makers of Jest have two recommendations on how to test Puppeteer with
jest. One is to set everything up manually, which is not quite as complicated
as it seems as first blush. However, they also recommend a library that
greatly simplifies our code, so I suggest we use it.

Install both Jest and the recommended library which is called
[Jest Puppeteer](https://jestjs.io/docs/en/puppeteer):

```
npm i jest jest-puppeteer
```

Add this to the bottom of your **package.json** file:

```json
"jest": {
    "preset": "jest-puppeteer"
}
```

Add this code to the **scripts** section of **package.json**:

```json
"scripts": {
    "test": "jest"
},
```

Also create a file called **jest-puppeteer.config.js** that looks like this:

```javascript
module.exports = {
    launch: {
        headless: true,
        slowMo: 0
    }
};
```

Now create a file called **git-ignore-you-rang.test.js**

```javascript
describe('Test You Rang', () => {
    /*beforeAll(async () => {
        await page.goto('http://localhost:30025');
    });*/

    beforeEach(async () => {
        //jest.setTimeout('20000');
        await jestPuppeteer.resetBrowser();
        await page.goto('http://localhost:30025');
    });

    it('should be titled "Main Calvert"', async () => {
        await expect(page.title()).resolves.toMatch('Main Calvert');
    });

    it('should contain Midterm from Calvert', async () => {
        const h2 = await page.evaluate(() => [...document.getElementsByTagName('h2')].map((h2) => h2.innerText));
        console.log(h2);
        expect(h2).toContain('Midterm from Calvert');
    });

    it('should go to you rang and get h2', async () => {
        await page.click('a[href="/you-rang"]');
        const h2 = await page.evaluate(() => [...document.getElementsByTagName('h2')].map((h2) => h2.innerText));
        console.log(h2);
        expect(h2).toContain('You Rang');
        expect(h2).toContain('Midterm from Calvert');
    });

    it('should get you-rang-result', async () => {
        await page.click('a[href="/you-rang"]');
        await page.waitForResponse(response => response.ok());
        const result = await page.evaluate(() => document.getElementById('you-rang-result').textContent);
        console.log(result);
        expect(result.trim()).toEqual('system-environment you rang');
    })
});
```

Scan through the tests and make the changes necessary to work with your code.
For instance, your H2 code probably does not contain **Midterm from Calvert**.
Now type npm test, and it should work.

Note that I show how to use both **beforeAll** and **beforeEach**. The latter
option is best since we don't want one test relying on the state of the
previous test. I needed to call **resetBrowser** or else the tests would
stall on hardware constrained machines like the ones at school.

## Turn it in

Please tell me:

- branch
- Directory for your main project
- Directory for your Puppeteer project.

Get similar tests running for at least two other React Components you have
created. You do not need to test the code that switches repos, but if you
test that component, I want to see that it properly loads the default
data from the server.

**NOTE**: <i>The thing I most want to see are the Jest tests, the one's that
begin with **describe** and that use **it**. They have file names that end with **.test.js**. 
Having more tests like the one **index.js** would be all to the good, but they are not
the key thing I'm after.</i>

I will be very flexible in terms of what tests you create. Do something similar
to what is done in the You Rang tests shown above. For instance, put an
ID on one or two items you display, evaluate those items with Puppeteer and
show that they contain data sent from the server.

Creating a test that switches repos would be extra credit.

Everything beyond this point in the document is FYI. Frankly, I didn't see
how to keep things simple at first and wasted time working out unnecessary
solutions at least in terms of this assignment. I include it anyway so that
I don't lose the information I learned going down the wrong path. Also, it
might be useful to one of you.


## The Manual Check

This is not necessary in our tests, and is perghaps not necessary in any test.
Nevertheless, here is a scheme to use **waitForSelector** to wait until
a certain condition is met.

In preparation for our test we will open up **main/source/YouRang.js** and
modify it. First we will add new state called **ready**:

```javascript
const youRangInit = {
    file: 'unknown',
    result: 'unknown',
    program: 'unknown',
    server: 'unknown',
    directory: 'unknown',
    home: 'unknown',
    hostname: 'unknown',
};

const [youRang, setYouRang] = useState({serverData: youRangInit, ready: false});
```

Now let's add an attribute to our **table** element to hold our new state:

```HTML
<table data-ready={youRang.ready}>
```

When you call **setYouRang** in **queryYouRang**, set **ready** to **true**:

```javascript
setYouRang({serverData: result, ready: true});
```

Now you can write a test that looks like this:

```javascript
it('should get you-rang-result', async () => {
    await page.click('a[href="/you-rang"]');
    await page.waitForSelector('[data-ready=true]');
    const result = await page.evaluate(() => document.getElementById('you-rang-result').textContent);
    console.log(result);
    expect(result.trim()).toEqual('system-environment you rang');
});
```

Here we don't do anything until our condition is met in **page.waitForSelector**.

When might this be necessary? Suppose we had a situation where we kept getting
back 'unknown' instead of the values sent from the server. This short video
shows what I mean.

Video: [See the moment when unknown is displayed](https://youtu.be/P6hEBaskmj0).

To be sure this can't happen, our code waits for the **serverData** to be set
from the server and rendered before Puppeteer looks for the value of
**serverData.result**.

In this video, I have **sloMo** set to 350 milliseconds.

## Wait Awhile

Another way to wait for an event to happen is to call page.waitFor. To use
this feature try adding this line after the two shown above:

```javascript
await page.waitFor(1000);
```

This is not a good solution for multiple reasons:

- We want our tests to run quickly and this slows them down
- 1 second (1000 milliseconds) might work on one machine, but another might need only 100 milliseconds or perhaps 10,000 milliseconds.

## The Button Click

Our code no longer uses button clicks. We rely on **useEffect** instead. However
if we did want to handle a button click, we could do it like this. In this code
I use the **page.waitForSelector** trick shown above:


```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('http://localhost:30025');
  await page.click('a[href="/you-rang"]');

  await page.click('button[id="you-rang-action"]');

  await page.waitForSelector('table[data-ready=true]');

  const h2 = await page.evaluate(() => [...document.getElementsByTagName('h2')].map((h2) => h2.innerText));
  console.log(h2);

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
      result: document.getElementById('you-rang-result').textContent
    };
  });

  console.log('Dimensions:', dimensions);


  await browser.close();
})();
```


Now comes that most (only?) confusing code in this small app.

```javascript
await page.click('button[id="you-rang-action"]');
await page.waitForSelector('table[data-ready=true]');
```

First we click the button with an ID set to **you-rang-action**. We also
wait for the **table** attribute **data-ready** to be set to true.

In a normal run, our render method will be called twice:

1. The first time with everything set to the default value **'unknown'**.
2. The second time with the data sent from the server

In this particular case, everything happens so quickly that Puppeteer, on my
system, always gets the data sent from the server. But in some cases, and
perhaps more frequently on slower machines, puppeteer will display the default
**'unknown'** data.

<!--       -->
<!-- links -->
<!--       -->

[pcn]: https://www.elvenware.com/unit-tests-guide/Puppeteer.html
[ppt]: https://github.com/puppeteer/puppeteer
[page]: https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#class-page
