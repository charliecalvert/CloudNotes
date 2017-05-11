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

## GitHub API

- [GitHub API Docs](http://github-tools.github.io/github/)
- [Get a GitHub API oauth token][git-token]
- [OctoNode alternative API](https://github.com/pksunkara/octonode)

npm install --save github-api

var GitHub = require('github-api');



[git-token]: https://github.com/settings/tokens

## Sign in

```javascript
let getGitHub = function() {
    let gh;
    if (true) {
        gh = new GitHub({
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
```

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
