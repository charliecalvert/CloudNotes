## Overview

Learn More about the [AWS JavaScript SDK][jsdk]

Learn about the [AWS Developer Tools][adt]

## Clone

In your ~/Git directory clone the AWS Provision repo

    git clone git@github.com:charliecalvert/aws-provision.git


## Copy Repo and Remove .git Folder

Copy the repo to your repo:

    cp -rv ~/Git/aws-provision/ ~/Git/isit320-calvert-2018/.

Navigate to your repo:

    cd ~/Git/isit320-calvert-2018/aws-provision

Remove the .git file from aws-provision so you do not have nested repositories:

    rm -rf .git

## Create Web Application

This is very similar to the [Rest Basics][rb] assignment. In your repository, inside your new **aws-provision** folder:

- Run **CreateExpressProject** to create a server running on port (SERVER_PORT) 30026
- Use **create-react-app** to create a client runnning on 30025 with a proxy to 30026 in **package.json**.

## Move Files to server

Create a new directory called **server/routes/aws**.

Move the JavaScript files from ~aws-provision into your new **aws** directory.

When you are done, here is the contents of **aws**:

```bash
ls -1 server/routes/aws/
AssociateElasticIp.js
AwsPromise.js
GetAwsInstanceParams.js
Menu.js
```

## Start Server and Client

Start both the client and the server.

For now, skip the **routes/api.js** endpoints and put your test endpoint in **routes/index.js** below the place where the home page endpoint is defined, but before **module.exports**:

```javascript
/* Set up a route called foo. */
router.get('/foo', function(request, response) {
    var message = { 'result': 'success', 'status': 'bar', 'file': 'api.js' };
    console.log('Foo called:\n' + JSON.stringify(message, null, 4));
    response.send(message);
});
```

[Rewrite the client][rwc] as described in React Basics, but adjust the path, the route, to the **/api/foo** endpoint to fit our modified code. **Hint**: I'm talking about the modified code in the **routes** folder.

Test your work and ensure that clicks on the button retrieve data from the server.

[adt]: https://aws.amazon.com/tools/
[jsdk]: https://aws.amazon.com/sdk-for-node-js/
[rb]: https://www.elvenware.com/teach/assignments/React/RestBasics.html#link-client-and-server
[rwc]: https://www.elvenware.com/teach/assignments/React/RestBasics.html#rewrite-the-client
