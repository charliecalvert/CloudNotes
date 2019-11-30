## Overview

Puppeteer is a tool for end-to-end testing. Most of the testing I have done
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

When we test our code, especially when writing unit tests, we helping to
assure ourselves that it is both:

- Easy to maintain
- Loosely coupled
- Follows the single responsibility principle.

Often code cannot be tested because it lacks the attributes listed above.
By testing our code, we force ourselves to write loosely coupled, easy to
maintain code.

Changing code to support end-to-end testing is not quite as easy to defend,
but I believe that most of the changes I propose make unit-testing easier.
Perhaps more importantly, making our code testable gives us peace of mind. If
we can't easily prove to ourselves that our code works, then we can never
quite be sure that we can safely deploy our code to production servers.

Even if we only want to deploy our code to a test server, what good is testing
our code on our test server if our only reliable technique is to start clicking
buttons to see if they work? It is better by far if we can automate the
end to end tests to prove to ourselves that they work.

## Get Started

Create a directory called **week11-puppeteer**.

Inside the directory run **npm init** and use your common sense to fill in the fields, except for the main file should be index.js, which you should create.

Now install **puppeteer**:

    npm i puppeteer

It should install very quickly if you have succeeded in omitting the Chromium
download, which I could not do. But the custom Chromium build was not that
long a download on my system.

In **index.js** add a **you-rang-action** to your button and **you-rang-result** to the appropriate **td**:

```html
 <td id="you-rang-result" className="left"> {youRang.result}</td>
<button id="you-rang-action" onClick={queryYouRang}>You Rang</button>
```

[pcn]: https://www.elvenware.com/unit-tests-guide/Puppeteer.html
