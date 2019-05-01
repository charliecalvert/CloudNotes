# Git Hub API

Our goal in this assignment is learn how to call the [GitHub API](https://github.com/github-tools/github). We will continue to do our work in week03-rest-basics, but you should tag your work as start and finish the assignment, and do you work in a **week05** branch.

So far we have only made a simple call to learn public facts about a GitHub user. The next step is to login to GitHub and get more detailed information, or private information. In particular, we will log and get a list of the available Gists supported by a user. At first we will just write the info to the console so we can prove to ourselves that we could make call on the server and the information back to the client. The final step will be to properly display the information in a custom React component.

## Node Support for ES6 {#node-green}

Now that **let** and **const** are fully supported you might be interested in seeing a more detailed look at which advanced features are supported by NodeJs:

- [Node Green](http://node.green/)

Get your version of node:

```
$ node --version
v12.0.1
```

The latest version of **JsObjects/Utilities/NodeInstall/NodeInstall.sh** will get you the latest Node runtime if you don't have it already. Don't forget to first run **git pull**.

Get **ElfDebugEnzyme** by running **get-gist** or by going here:

- [ElfDebugEnzyme](https://gist.github.com/charliecalvert/51daef341699943b07c9570c3ad2cbab)

Get **ElfLogger** by going [here](/javascript-guide/ElvenUtilities.html#elf-logger).

## GitHub API

- [JavaScript GitHub API Docs](http://github-tools.github.io/github/)
- [JavaScript GitHub API Repo](https://github.com/github-tools/github)
- [Generic (not JavaScript Specific, GitHub API Intro](https://developer.github.com/v3/)
- [Generic GitHub API Guides](https://developer.github.com/guides/)

We need to be authorized to make many requests to the GitHub API. That involves sending a token before you make your call, or sending it along with your call. We'll describe the process later in this document. For now, get started by acquiring a GitHub API token:

- [Get a GitHub API oauth token][git-token]

You will need to get your own token from [GitHub](https://github.com). It's in:

- **Settings | Developer Settings | Personal Acccess Tokens**

Here is a more direct link:

- [https://github.com/settings/tokens](https://github.com/settings/tokens)

You can give the user of the token various rights. For now, I believe we only need the right to create a **gist**, but you could throw in **repo** and **user** scopes if you want.

For now, just store the token as a raw number in **git-gist/routes/tokens.js**. Now format the **token.js** like this, where you can have a comma separated list of tokens with different rights:

```JavaScript
const tokens = [
    '3bd10af220924e317cd3f76601a29231b507d9a7'
];

module.exports = tokens[0];
```

The need to use a token that must be hidden from prying eyes helps explain why we are doing our work on the server rather than on the client. In most cases, we will just check these tokens into our repositories, which is safe as long as our repos are private. (You will also have to trust me, which hopefully is not difficult for you.) If you later decide to make the repo public, you should deactivate the tokens you check in.

**NOTE**: _A more secure alternative technique would be to put the token in an environment variable called **git-hub-token** and load it with code like this: **const token = process.env.git-hub-token**. That way you need never check the token into your repository. It will make my job easier, however, if you just check the token in to your repository so I can easily use it when grading your work._

After getting a token, the next step would be to install the [JavaScript GitHub API NPM package](https://www.npmjs.com/package/github-api) as part of your project. We will make our first calls from **git-gist**, so install it into that microservice:

```
npm install --save github-api
```

In the **git-gist** microservice, in **routes/index.js** link in the JavaScript GitHub API:

```javascript
var GitHub = require('github-api');
```

Here is an FYI

- [OctoNode alternative API](https://github.com/pksunkara/octonode)

[git-token]: https://github.com/settings/tokens

## Sign in

So far we have taken three steps:

- Obtained a token
- Installed the NPM GitHub API package
- Imported the GitHub object into our code with **require**

Lets Continue our work, all of which is taking place in the **git-gist** microservice.  Since we are going to being modifying data, we should start by authorizing ourselves to GitHub using our token.

```javascript
const token = require('./tokens');

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

It is best to log in with our token since we are able to precisely define the scope of the abilities associated with the token.

## Get Gist Data

We will contiue to work in **git-gist/routes/index.js**. Here is the code to first authorize our application and to then get a list of gists:

```JavaScript
router.get('/get-basic-list', function(request, response) {
    logger.log('GET BASIC LIST CALLED');
    let gh = getGitHub();
    const me = gh.getUser();
    logger.log('ME', me);
    me
        .listGists()
        .then(function({ data }) {
            logger.log('FILES PROMISE', Object.keys(data[0].files));
            const results = data.map(item => ({
                htmlUrl: item.html_url,
                id: item.id,
                gitPullUrl: item.git_pull_url,
                description: item.description,
                ownerLogin: item.owner.login,
                avatarUrl: item.owner.avatar_url,
                files: Object.keys(item.files)
            }));
            response.status(200).send({
                count: results.length,
                result: results
            });
        })
        .catch(function(err) {
            logger.log('USER Promise Rejected', err);
            response.status(500).send({ result: err });
        });
});
```

listGists returns a fairly complex set of information. The following line of code says that we only want the data property from the bit object that is sent to us:

```JavaScript
.then(function({ data }) { ... })
```

In other words, we explicitly pull the data object from the data returned to us by GitHub: { data }.

## Display Gist Data

In **App.js** make a copy of the **fetch** code you used to call the **/user** route. For now, use it in **App.js** and call your new method **fetchGistList**. In **fetchGistList**, the URL should be **/git-gist-get-gist-list**.

Let's break that down:

- git-gist: The microservice we will use on the server side.
- get-gist-list: The route inside the microservice

**NOTE** _I'm sure you can see that in the long run it will be simpler to break out the code in our main server so we can use a URL like this: **/git-gist/get-gist-list**. That will be simpler in several ways, but we aren't quite ready to refactor our code to fit that model._

## GetGist Component

For now, let's use the **GetGist** to display the data. Its job will be to display the information you get back when you create a gist. This component will take a certain number of props including:

- The method to call to create the Gist: **fetchGist**.
- The data retrieved from GitHub after you create the Gist: **gitGist**.

To the setState with the data you get back from the server, do this:

```javascript
that.setState(foo => {
    return {gistList: json.result[0]}
});
```

This will work with a new property we add to our appData:

```javascript
export const appInit = {
    file: 'unknown',
    result: 'unknown',
    status: 'unknown',
    server: 'unknown',
    body: {login: 'unknown', id: 'unknown'},
    gistList: {id: 'unknown'}
};
```

This is a minimal implementation of **appInit**, it will have to grow as we show more fields from the **gistList**.

You do not need to display all the fields, at least at first. Two or three would be enough while testing. For the midterm, up this to at least five or six. Be sure to include **Description** and **URL** among the fields you display. If possible, making **URL** clickable so we can see the Gist that you create.

The new component will have one button that will call the **fetchGist** method from App.js.

**fetchGist** should retrieve the entirety of the JSON data returned from GitHub and pass it to our new component in the **render** method.

**NOTE**: _I'm intentionally being vague here as you should be able to problem solve sufficiently to see how to properly implement all this._

## The Buttons

Create a button with an id of **prevGist** and onClick that points at your **fetchCall** and data-url of '/git-gist-get-gist'. Set up the code as expected in **server/routes/index.js**.

This is for **material-ui**, which we are not using right now.

```javascript
<RaisedButton
    style={buttonStyle}
    id="prevGist"
    onClick={(e) => this.gistIterator('prevGist', e)}
    disabled={!this.props.gistCanIterate}
    secondary={true}
>
    Back
</RaisedButton>
```

## Thinking about State

Ignore this section for now.

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

```bash
curl https://api.github.com/zen
curl https://api.github.com/users/charliecalvert
curl -i https://api.github.com/repos/twbs/bootstrap
curl -i https://api.github.com/repos/charliecalvert/JsObjects
curl -i https://api.github.com/repos/charliecalvert/repos
curl -i https://api.github.com/repos/charliecalvert
curl -i https://api.github.com/users/charliecalvert/repos
```

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

## Testing Notes

Ignore this section for now.

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
