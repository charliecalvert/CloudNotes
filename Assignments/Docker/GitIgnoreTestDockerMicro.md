## Overview

Create a Git Ignore Test Docker Micro service that confirms:

- .gitignore valid in all branches
- no stray files in any branches

Do your work for this assignment in a **week05** branch.

## Child Process

Built into node is a module called [**child_process**][cp]:

```javascript
const foo = require('child_process');
```

**NOTE**: _There is no **npm install** step to use **child_process** because it is built in to Node._

There are several methods in child_process including **exec**, **execFile**, and **spawn**. You can use these methods to start a program.

For instance, here is code to run the Linux **ls** process from a JavaScript node program:

```javascript
const exec = require('child_process').exec;

exec('ls -la', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
```

Save this code into **week05-simple-exec/exec-ls.js**. Run it so you can see what it does.

Sometimes we also want to run a command in a particular directory, Do it like this:

```javascript
const exec = require('child_process').exec;

exec('ls -la', {
	cwd: process.env.GIT_HOME + '/isit320-lastname-2019/'
}, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
```

Be sure to change **lastname** to your last name.

Save this code into **week05-simple-exec/exec-ls-repo.js**. Run it so you can see what it does.

## async and exec

All of this is good and well, but as you perhaps know, we are engaged in a process that has several steps and that makes multiple system level calls. In other words, we need to exec a process, get feedback from it, and then exec another process based on that feedback. As you also know, we don't want to do that inside the kinds of callbacks shown in the above examples.

Fortunately, we don't have to create our own promises, Node does it for us:

```javascript
const util = require('util');
const exec = util.promisify(require('child_process').exec);
```

Then you can use [**async** and **await**][aa] to call your promise:

```javascript
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function execList(repoName) {
	const {stdout, stderr} = await exec('ls -la', {
		cwd: process.env.GIT_HOME + '/' + repoName + '/'
	});

	console.log(`stdout: ${stdout}`);
	console.error(`stderr: ${stderr}`);
}

execList('isit320-calvert-2019');
```

We create an **async** function by starting it's declaration with the word **async**. Inside the function call a promise and proceed it with the keyword **await**. Read the docs, linked above, for more information.

## Enter Git

Now that you know that basics, you can perhaps fairly easily see how to apply it our task:

```javascript
async function checkoutBranch(response, branch) {
    const {stdout, stderr} = await exec('git checkout ' + branch, {
        cwd: workingDir
    });
    const output = stdout;
    console.log('stdout:', output);
    console.error('stderr:', stderr);
    if (response) {
        response.send({result: 'success', response: output.trim()});
    } else {
        return output.trim();
    }
}
```

Working with your **system-environment** project, put the above in a file called **routes/exec-git.js**. **export** the function can link it into **index.js**:

    module.exports.checkoutBranch = checkoutBranch;
    const {checkoutBranch} = require('./exec-git');

Create a route (endpoint) in **index.js** and see if you can call your code:

```javascript
router.get('/checkoutBranch', function(request, response) {
    const info = checkoutBranch(response, 'week05');
});
```  

## Looping

Behold the beauty of **async/await**:

```javascript
async function checkGitIgnore(response) {
    const allBranches = ['week01', 'week02', etc];
    console.log('ALL BRANCHES', allBranches);

    let branchInfo = '';

    console.log('ABOUT to start CHECKOUTBRANCH');

    // see here: https://stackoverflow.com/a/11488129/253576
    for (let i = 1; i < allBranches.length - 1; i++) {
        branchInfo += await checkoutBranch(null, allBranches[i]);
    }
    response.send({result: 'success', branchInfo: branchInfo});
}
```

## Turn it in

Import checkGitIgnore from **exec-git.js**. Create a route for it in **index.js**.

Create a react component with two buttons on it. Call both routes via the buttons and display the results on your react component.

[aa]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
[cp]: https://nodejs.org/api/child_process.html
