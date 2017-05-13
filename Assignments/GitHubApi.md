# Git Hub API

Learn how to call the [GitHub API](https://github.com/github-tools/github).

## Node Support for ES6 {#node-green}

Note that let and const are fully supported.

- [Node Green](http://node.green/)

Get your version of node:

```
$ node --version
v7.9.0
```

- [ElfDebugEnzyme](https://gist.github.com/charliecalvert/51daef341699943b07c9570c3ad2cbab)

## GitHub API

- [JavaScript GitHub API Docs](http://github-tools.github.io/github/)
- [JavaScript GitHub API Repo](https://github.com/github-tools/github)
- [Generic (not JavaScript Specific, GitHub API Intro](https://developer.github.com/v3/)
- [Generic GitHub API Guides](https://developer.github.com/guides/)

Get the GitHub API token:

- [Get a GitHub API oauth token][git-token]

Install the JavaScript GitHub API:

```
npm install --save github-api
```

Link in the JavaScript GitHub API:

```javascript
var GitHub = require('github-api');
```

Here is an FYI

- [OctoNode alternative API](https://github.com/pksunkara/octonode)

[git-token]: https://github.com/settings/tokens

## Sign in

```javascript
let getGitHub = function() {
    let gh;
    if (true) {
    https://gist.github.com/charliecalvert/51daef341699943b07c9570c3ad2cbab    gh = new GitHub({
            token: token
        });
    } else {
        gh = new GitHub({
            username: 'charliecalvert',
            password: ''
        });
    }
    return gh;
};
```

## Display Gist Data

Create a new components based on GetUserInfo and  call it **DataMaven**.

In DataMaven block copy fetchUser and paste it, renaming it to fetchGist. Now you have both fetchUser and fetchGist. In fetchGist, the URL should be '/api/gist-test'.

Your render method for DataMaven should have the routes that were in ElfHeader:

```javascript
render() {
    return (

        <Router>
            <div>
                <ElfHeader/>
                <Route exact path='/' component={GetUserInfo}/>
                <Route path='/get-foo' component={GetFoo}/>
                <Route path='/get-numbers'
                       render={(props) => (
                           <SmallNumbers {...props}
                                         numbers={numbersInit}/>
                       )}
                />
            </div>

        </Router>
    );
}
```    

In **index.js** just load **DataMaven**:

```javascript
ReactDOM.render(
    <div>
        <DataMaven/>
    </div>,
    document.getElementById('root')
);
```https://gist.github.com/charliecalvert/51daef341699943b07c9570c3ad2cbab

## Testing Notes

The tests in **Header.test.js** break after the refactoring explained above. After the refactoring, I was getting this error:

- _Failed context type: The context `router` is marked as required in `Link`, but its value is `undefined`._

This is because the **ElfHeader** could not find the **Router** tag is was expected. The fix is as follows:

```javascript
import { BrowserRouter as Router } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><ElfHeader /></Router>, div);
});
```
https://gist.github.com/charliecalvert/51daef341699943b07c9570c3ad2cbab
**Question**: After making this change, we might want to test to see if **ElfHeader** properly renders an **H2** element. For that test to work, should we now use **shallow** or **mount**?

## Running One Test File or Suite {#one-test}

We have learned how to use **fit** and **.only**. Also, note the menu:

```
Watch Usage
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

Select **p** and enter part of the name of the test file you want to test. For instance, **Header**. Then only **Header.test.js** will run.

## GetGist Component

You'll need to create a new component called **ShowNewGist** that extends **React.Component**. Its job will be to display the information you get back when you create a gist. This component will take a certain number of props including:

- The method to call to create the Gist: **fetchGist**.
- The data retrieved from GitHub after you create the Gist: **gitGist**.

You do not need to display all the fields, at least at first. Two or three would be enough while testing. For the midterm, up this to at least five or six. Be sure to include **Description** and **URL** among the fields you display. If possible, making **URL** clickable so we can see the Gist that you create.

Add a new item to the menu called **Insert New Gist** or something similar. In **DataMaven**, you will also need to a new **Route** in the **render** method. It should display a component called ShowNewGist At some point the new route will need to pass two pieces of information to the component it calls.

The new component will have one button that will call the **fetchGist** method from **DataMaven**.

**fetchGist** should retrieve the entirity of the JSON data returned from GitHub. On the client side you should add the data to **DataMaven**'s state. This should cause a call to the **DataMaven** and **ShowNewGist** render methods.

## Thinking about State

I've been trying to get us to the point where we put all our data in a library called Redux. Redux can be helpful when state starts to get complicated, which it appears to be in our case. So Redux should help us eliminate some of this business and keep things clean. I hope.

Reading more on this subject, I'm beginning to see that maybe I should add this: "We should put all the data that we want to preserve between sessions in Redux." In other words, there is some state that a component might need to preserve at runtime, but that does not need to be preserved between sessions. This type of data can be preserved as state in the component because we don't care if we lose it if the user closes the page. But data that we want to preserve should go to our "data store" which right now is DataMaven, but which I think will eventually be Redux.

If there is a theme to this course it would be: Finding the right design, the right architecture, is not easy. It takes time and requires multiple iterations. This may be a case where we have to search for the right solution. We'll see.

The key reference is probably this one:

- <http://redux.js.org/docs/faq/OrganizingState.html#organizing-state-only-redux-state>

I found this discussion really helpful:

- <https://discuss.reactjs.org/t/redux-and-global-state-vs-local-state/4187/11>

Read the section called Details, Details here:

- <https://daveceddia.com/visual-guide-to-state-in-react/>


## Examples

curl https://api.github.com/zen
 2009  curl https://api.github.com/users/charliecalvert

 2011  curl -i https://api.github.com/repos/twbs/bootstrap
 2012  curl -i https://api.github.com/repos/charliecalvert/JsObjects
 2013  curl -i https://api.github.com/repos/charliecalvert/repos
 2014  curl -i https://api.github.com/repos/charliecalvert
 2015  curl -i https://api.github.com/users/charliecalvert/repos

## Time till Renew

 curl https://api.github.com/users/charliecalvert

And see this line:

```javascript
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 58
X-RateLimit-Reset: 1492098563
```

Convert the reset time:

```javascript
var f = new Date(1492098563 * 1000);
console.log(f); => "Thu Apr 13 2017 08:49:23 GMT-0700 (PDT)"
```
