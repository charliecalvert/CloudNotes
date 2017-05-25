# React Micro Services

We have a principle that we talk about quite a bit:

- [Single Responsibility Principle][srp]

There is another of the [SOLID principles][solid] that we don't talk about as much:

- [Interface Segragation Principle][isp]

This principle states that we prefer small interfaces over fat interfaces. "Instead of one fat interface, many small interfaces are preferred".

To help us abide by the spirit of this principle, we will divide our server code into multiple "microservices". Instead of one fat server, we will create several small servers. They will talk to one another over HTTP.

[solid]: https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)
[srp]: https://en.wikipedia.org/wiki/Single_responsibility_principle
[isp]: https://en.wikipedia.org/wiki/Interface_segregation_principle

## Build and Deploy

Before going any further, let's understand what our application will look like when it is deployed.

Right now, we are using a trick that allows us to proxy request from the browser to our server. Specifically, we are adding this line to our client side **package.json** file:

```javascript
"proxy": "http://localhost:30026",
```

This is meant for us only during development. When we ship, we do two things.

1. At the command line we run this command to build our production code:
  a. npm run build
  b. This produces a folder called **build** in the root of our project
1. We then copy the contents of this folder into the public directory of our server, or into another express server that we created for this purposes.
  a. Finally, we point our home page route in **routes/index.js** to the **index.html** file created by the npm **build** step.

Now we can just run our server, browse to the page it creates, and begin playing with our app.

## Micro Services

What this means, then, is that the server part of our GitExplorer project is going to be the server for our main programmer. It will be the thing that launches our client side GitExplorer code.

This means that we want to give it some base functions, and then allow it to delegate responsibility for major tasks to little micro services. In particular, I would like you to have it depend on five micro servers:

- The Qux Server: **/qux**
  - Any messages sent to the Qux server are mirrored back to the client
  - For instance it would respond to the following:
    - /qux
    - /qux/foo
    - /qux/bar
    - /qux/you-rang
- The Git User Server: **/git-user**
- The Git Gist Server: **/gist/
  - Create Gist
  - List Gists
  - Delete Gist
- The Markdown Server: **/markdown**
  - Insert the contents of a gist in a markdown document and return it
- The Git Explorer socket server: **/git-socket**
  - Send socket IO messages to any registered client whenever your app creates, lists or deletes gists.

## You Rang?

All the server should respond to a **/you-rang** query by responding with:

  - result: success
  - message: i am up and running
  - You can include any additional information about the server you think might be of interest

For instance, you should get responses to these messages from the appropriate server:

- /qux/you-rang
- /git-user/you-rang
- /gist/you-rang
- /markdown/you-rang
- /git-socket/you-rang

This feature should be available for all five servers when you turn in this assignment.

## Router IDs

You've seen this before, but as a reminder. Respond to ping of a route by echoing back a portion of the url with request.params.id:

```javascript
router.get('/:id', function(request, response) {
    response.send({
        'result': 'success from 30026',
        'path': request.params.id
    });
});
```

Assuming this is in **index.js** for the **qux** server then it would return **path: foo** if you ran this query: **/qux/foo**.

## Forwarding Request

Do it like this:

```javascript
const requester = require('request');

router.get('/bar', function(request, response, next) {
    requester('http://localhost:30026/bar').pipe(response);
});
```

All requests except for **get-foo** should be handled by the micro services.
