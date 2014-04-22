Week03 Prog282 Overview
===============

Primary Goals:

- [Agile Development](http://bit.ly/1qf6V4t)
- [Callbacks in JsObjects][JsObjectCallbacks]
- [Callbacks on Elvenware][ElvenwareCallbacks]
- [Patterns: Factory in JsOjbects][Factory]
- [Data Structures: Queues in JsObjects][Queue]
- [Use Strict on MDN][UseStrict]
- [Jasmine Unit Tests][Jasmine]
- [Jasmine-node](https://github.com/mhevery/jasmine-node)
- [Learn about Markdown]()

#Jasmine

To install jasmine-node:

    sudo npm install -g jasmine-node
    
In Designt Factory and Queue Run:

    grunt check
    RunJasmineTests.sh
    node TestRunner.js
    grunt pretty
    
Node and Express
----------------

We will be using node.js, and particularly a node library called Express, as
our primary server side tools. Node is a JavaScript based server-side
technology. NPM is the Node Package Manager. We use NPM to configure the
JavaScript libraries that we use in our node scripts. Express is one of the
most important JavaScript libraries. 

- [Install node](http://nodejs.org/)
- [Node on Elvenware](http://elvenware.com/charlie/development/web/JavaScript/NodeJs.html)
- [NPM Home Page](https://npmjs.org/)
- [Express Home Page](http://expressjs.com/)


Working with Express in Node:

- [Express and Node](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#using-express)

Using a directory:

- [Include Subdirectories in a node Project](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#using-a-directory-with-app.use)

Debugging Node in Eclipse:

- [Debug Node in Eclipse](http://elvenware.com/charlie/development/web/JavaScript/NodeJs.html#debug-node-in-eclipse)

Open ID Resources
-----------------

OpenID is a service that we can use to handle user log in to our application.
The actual authentication is handled by OpenID, and we use a node library to
confirm that the user is actually who we think they are. If we can confirm 
their identity then we provide them with access to our game. Furthermore, we 
now have a user name for them, so we can track their progress, keeping it 
separate from the progress of other users.

Here are some OpenID resources. There are various OpenID Providers who can 
verify a user's identity. I have been using MyOpenID. Why don't we all 
standardize on their site for now, and move only if we find good reason to do 
so.

Here are some OpenID Links:

- [My Open ID](https://www.myopenid.com)
- [Node Open ID Interface](https://github.com/havard/node-openid)
- [Open ID Home Page](http://openid.net/)
- [Difference between Open ID and O Auth](http://stackoverflow.com/questions/1087031/whats-the-difference-between-openid-and-oauth)

[JsObjectCallbacks]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Functions/README.md
[ElvenwareCallbacks]: http://elvenware.com/charlie/development/web/JavaScript/JavaScriptFunctions.html#callbacks-passing-functions-as-parameters
[UseStrict]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
[Queue]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/SimpleQueue
[Factory]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/FactorySimple01
[Jasmine]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/UnitTests
