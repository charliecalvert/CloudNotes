## Overview

[Puppeteer][ppt] is a tool for end-to-end testing. Most of the testing I have done
in my classes previously has been unit testing, which is about testing a single
object. End-to-end testing is about testing an entire application, or some
large portion of a project.

Puppeteer was created by the "The Chrome DevTools team", which I assume is
part of Google. At any rate, it runs your app inside a custom copy of Chromium.

**NOTE**: _It is possible to use your copy of Chromium rather than the custom
download version, but however that really works [it is not obvious][pcn]._

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

In preparation for the code we will write in that file open up **main/source/YouRang.js**
and add a **you-rang-action** ID to your button and **you-rang-result** ID to
the appropriate **td**:

```html
<td id="you-rang-result" className="left">{youRang.result}</td>
<button id="you-rang-action" onClick={queryYouRang}>You Rang</button>
```

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

  await page.click('button[id="you-rang-action"]');

  await page.waitForSelector('[id=you-rang-result]');

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

The next step is to create new [page][page] and to use it to load our
application.

```javascript
const page = await browser.newPage();
```

Perhaps this is an oversimplification, but I picture this as
being the equivalent of creating a new tab in the Chromium browser. See the
link provided above for more details.

The next step is to use our new tab to host our application:

```javascript
await page.goto('http://localhost:30025');
```

Needless to say, we won't be able to navigate to our application unless
it is in fact running. Most of us have our app running in the background
all the time in our docker containers, so this should be a no-op.

So far this is fun, but perhaps not particularly interesting. The next step,
however, is to click our link to the **You Rang** page and visit it in the
browser tab.

```javascript
await page.click('a[href="/you-rang"]');
```

This code says that we should click the HTML anchor that has an href attribute
set to **/you-rang**. See in particular, this code from **main/source/App.js**:

```html
<li><Link to="/you-rang">You Rang</Link></li>
```

If you look at the HTML that JSX generates from this code you will see that at
runtime it is an HTML anchor.


## The Button Click

Now comes that most (only?) confusing code in this small app.

```javascript
await page.click('button[id="you-rang-action"]');
await page.waitForSelector('[id=you-rang-result]');
```

First we click the button with an ID set to **you-rang-action**. We also
wait for the selector **you-rang-result** to return true. Frankly, I'm
not confident this will work on slower machines, but it does work on my
machine. If it fails on your maching, try adding this line after the two
shown above:

```javascript
await page.waitFor(1000);
```

This is not a good solution for a host of reasons, but let's keep things
simple in this example and I will show you something better in the next section.

Finally, we twice evaluate our page to see if things are working as we expect:

```javascript
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

## Testing with Jest

Install both Jest and [Jest Puppeteer](https://jestjs.io/docs/en/puppeteer):

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
describe('Google', () => {
    beforeAll(async () => {
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

    it('should go to you rang', async () => {
        await page.click('a[href="/you-rang"]');
        const h2 = await page.evaluate(() => [...document.getElementsByTagName('h2')].map((h2) => h2.innerText));
        console.log(h2);
        expect(h2).toContain('You Rang');
        expect(h2).toContain('Midterm from Calvert');
    });

    it('should', async () => {
        const result = await page.evaluate(() => document.getElementById('you-rang-result').textContent);
        console.log(result);
        expect(result.trim()).toEqual('system-environment you rang');
    })
});
```

<!--       -->
<!-- links -->
<!--       -->

[pcn]: https://www.elvenware.com/unit-tests-guide/Puppeteer.html
[ppt]: https://github.com/puppeteer/puppeteer
[page]: https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#class-page
