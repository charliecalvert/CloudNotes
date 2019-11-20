## Overview

Our goal is to clone two or more repositories and to be able to switch back and forth between them. When you switch to a new repo, then most of the other components such as **GetBranches**, **BadFileTests** and **CheckGitIgnore** will query the newly selected repository.

There are three major parts of this assignment:

1. Create a new React component
2. Establish two new, two-way routes between the **main** client and **system-environment**
3. Write code to change the **exec-git.js** variable called **workingDir**

None of these steps should be difficult for you, but the third is extremely simple.

## Nodemon Configuration

Although this whole topic is something of an aside, it is a detail that we need to get right. So before talking about the program in general, let's get this detail out of the way.

If we don't properly tell Nodemon to ignore certain directories, then our program appears to go a bit berzerk when we switch branches. Seeing what appear to be multiple changes in our code, Nodemon restarts our app over and over. When this happens, it is hard to miss. We typically see screen after screen of green and brown Nodemon messages. None of these messages are telling us anything important it is just Nodemon going crazy because it is trying to work inside a directory that it should ignore.

To avoid this, be sure to change your **nodemon.json** to exclude (ignore) the repos you
want to explore in methods like **gitIgnoreTests**. This cannot be done via hot reloading because
we are ignoring all files in the root of **system-environment** in
our **docker-compose.yml** file. We ignore those files
because we want to be able to clone our repos and they live
in the root of **system-environment**.

Something like this might work:

```json
{
  "verbose": true,
  "ignore": ["**/bower_components/**", "**/isit32*/**", "**/git-ignore-tests/**"]
}
```

**NOTE**: _This is a weak point in our app. Right now the glob statement that contains **isit32** will meet our purposes. However, this program could be used to check many repos with arbitrary names. We could probably solve this problem by putting our repos in a **Git** folder or a folder with some similar name. However, I'm reluctant to introduce that change just now, so I'll put off a decision on this issue until later._

## Pull Two Repos

In **system-environment/Dockerfile** pull two repos, perhaps something like this:

```
RUN ssh-agent bash -c 'ssh-add midterm-key; git clone git@github.com:charliecalvert/git-ignore-tests.git'
RUN ssh-agent bash -c 'ssh-add midterm-key; git clone git@github.com:charliecalvert/isit322-calvert-2019.git'
```

## The Two New Routes

We cannot yet call our routes from the **main** client because we have not yet created the component that will call the routes. However, it will be convenient to establish the URLs for the routes at this time:

- /system-environment/getRepoNames
- /system-environment/setWorkingDir

Perhaps you can see that we will have to pass the name of the new **workingDir** as a parameter to the secondk of these two routes. However, we need not do that at this time. Instead, I recommend at least sketching in the route by adding the appropriate code to:

- main/routes/index.js
- system-environment/routes/index.js
- exec-git.js

In **exec-git.js** block out two new methods called **getRepoNames** and **setWorkingDir**. For now, you can have both methods return a very simple JSON object such as:

```json
{"result": "success"}
```

Our strategy will be to first confirm that we can call the two methods from the client. Once we have confirmed that the plumbing is working properly, then we can concentrate on implementing the two methods and handling the values they send back to the client.

## New React Component.

Before we can test our routes, we need to create a React component with two buttons, one for each route.

**NOTE** _We could have the first route called automatically when the component loads, but perhaps it would be simplest to start by simply calling it on a button click so we have more control during testing._

Your new React Function Component should be called **SelectRepo**. You can build it from scratch, or else base it on another component such as **YouRang**.

In this screenshot you can perhaps see that I based my component on **YouRang** and kept a few of the fields. I also show the current **workingDir** and the names of the two repos I have created. We will discover these repos dynamically rather than hard-code them into the program. Our goal, of course, is to make the program as flexible as possible without forcing ourselves to change our code each time we change the repos in our program.

![Select Repos](https://s3.amazonaws.com/bucket01.elvenware.com/images/select-repos-ui.png)

Note that I also fill in a **select** component (drop-down list) so that the user can pick the repository for use in the other dialogs of the program such as **getBranches**.

When the user selects the **Get Repos** button, I call the first of the two routes:

- /getRepoNames

## Implementing Server Side getRepoNames

For me, the trickiest part of the server side code to get the repository names was to compose a bash statement to return the names of the repostories found in **system-environment**. I finally came up with this:

```javascript
const plan = 'find . -maxdepth 2 -iname ".git" -type d -prune';
```

This code finds all the instances of a directory called **.git** in a newline separater string with this format:

    ./prog109-calvert-2019/.git
    ./isit320-calvert-2018/.git

To create an array from this information I would use the string **split** method, passing in a newline character as a parameter.

Now you've got an array that looks a bit like this:

```javascript
["./prog109-calvert-2019/.git", "./isit320-calvert-2018/.git"]
```

You could then use the array **map** method to pull the repository name from this string. Inside the body of the call, I used the **path.dirname** function to pull out the repository name. You could them use the string **replace** method to remove the "./" portion of the path. The result would be an array like this:

```javascript
["prog109-calvert-2019", "isit320-calvert-2018"]
```

This data structure can be returned to the client where it will be displayed to the user.

## Displaying Data in a select

You perhaps recall that a **select** component has a structure a bit like this:

```javascript
<select id="workingDirSelect">
    <option value="0">unknown</option>
</select>
```

I would use the **array.map** method to create the options. **map** should return an array of JSX code, where each item in the array is an HTML **option** element. Do this somewhere north of the return statement and make the the value return by map is global to our function object.Then just plug the options returned from map them into a **select**:

```html
<div><select id="workingDirSelect">{options}</select></div>
```

## Passing Parameters

It's time now to figure out how to send the item selected by the user to the server so that **workingDir** can be changed.

This code might help you get the selected item from the **select** element:

```javascript
const workingDirSelect = document.getElementById("workingDirSelect");
const newWorkingDir = workingDirSelect.options[workingDirSelect.selectedIndex].text;
```

So how do we pass that to our server? Well, clearly it needs to go as a parameter. Let's remember our helper function:

```javascript
// Pass in a key:value comma delimited standard JavaScript object where
// each property is the parameter and its value that you want to pass
// to your server
function makeParams(params) {
    var esc = encodeURIComponent;
    return '?' + Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
}
```

This method expects a JavaScript object. To create a parameter called **foo** that has the value **bar**, do this:

```javascript
const params = makeParams({foo: 'bar'});
```

Just add more properties to add in more parameters.

```javascript
const url = '/system-environment/setWorkingDir' + makeParams({newWorkingDir: newWorkingDir});
```

Just pass the URL into our **fetch** call.

On the server side, I'll leave it up to you to handle the query param and pass it one to **system-environment**. Remember, the setWorkingDir method in exec-git is simple one liner. Don't complicate it.
