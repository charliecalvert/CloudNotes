## Overview

The goal will be to add one page to our app (usually called week03-rest-basics) that allows the user to view private, public or all repositories from the developers account.

Put your work in a branch called Midterm. As you begin tag it "Starting Midterm".

For now I think all our components, except **Test Routes**, and **ShowResultServer** should be React Class Components. **Test Routes** and **ShowResultServer** should be function components. React Function Components (nee Stateless Components) and hooks are great, but they are tested differently that class components and I don't want to make the change right now. **GetUser**, **GetRepos** and **GetGists** should all use **ShowResultServer** to show the results from pressing **You Rang**.

**NOTE**: _You may not change any code in the Sanity tests. If you think I have something wrong, please let me know and I will update the tests if necessary and you can reinstall them._

**NOTE**: _At some point over the next few days, I'm likely to update the sanity tests or other parts of this midterm. I assume that you would like to get started as soon as possible, so I've pushed this out now._

## Goals

Each major React component such as GetUser, GitGist, GetRepos, Qux, TestRoutes must use

- **withStyles**
- PropTypes
- define or import a styles function
- use the **styles** type to create a variable called classes that is global to the **render** method or its equivalent if you are using a React Function.

Just to be clear, here is a minimal **styles** function:

```javascript
const styles = theme => ({
    root: {
        flexGrow: 1
    }
});
```


## Screenshots

The **components/GetUser** page might look something like this, but you are free to design it as you wish:


<img class="sizer" alt="React Git User Fields" src="https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-get-user.png" />

**IMAGE**: _The Get User Page_

<img class="sizer" alt="React Git Gist Fields" src="https://s3.amazonaws.com/bucket01.elvenware.com/images/isit322-midterm-get-gist.png" />

**IMAGE**: _The Get Gist Page_

<img class="sizer" alt="React Git Gist Fields" src="https://s3.amazonaws.com/bucket01.elvenware.com/images/isit322-midterm-get-repos.png" />

**IMAGE**: _The Get Repos Page_

## ShowResultServer

Thank you for asking these questions and I'm sorry if the subject caused confusion.

**ShowResultServer** is designed to handle the display of the **/YouRang** requests. The typical YouRang request returns a value that looks like this:

<pre>response.<span>send</span>({<span>result</span>: <span>'You rang?'</span>, <span>server</span>: <span>'git-user'</span>});</pre>

As you can see, it returns an object literal with two properties:

*   result
*   server

The eponymously named **ShowResultServer** component is designed to show these two fields. It exist in order to keep our code DRY. Each of our components is expected to show these fields, so rather than repeating the same code over and over in each component, we write a sub-component called **ShowResultServer** designed to display these fields.  All of our display display components that call **/YouRang** should use this component.

This also helps illustrate how to embed one component inside another. This is something that is done all the time:

```html
<React.Fragment>
    <div className={classes.layout}>
        <Grid container spacing={24}>
            // CODE OMITTED HERE
            <Grid item xs={12}>
                <Paper className={classes.paperLion}>
                    <ShowResultServer
                      // YOU ARE GOING TO NEED TO PASS SOME PROPS
                    />
                        {buttons}
                </Paper>
            </Grid>
            // CODE OMITTED HERE
        </Grid>
    </div>
</React.Fragment>
```

The bit about the buttons is just a declaration for some JSX that defines some buttons appropriate to any one particular component such as **GetGist** or **GetRepos**:

```html
const buttons = (
     <Grid item xs={12}>        
        // DEFINE ONE OR MORE BUTTONS HERE
     </Grid>
 );
```

## API Links

The call to GitHub should be in **micros/get-user/routes/index.js**. It should use:

- the [Octokit rest][octk] library to make the call, not **github-api**.
  - You can use both libraries in one file, so you don't need to undo previous work.
- the [octokit.repos.list][orl] API call to make the call to GitHub.
- this url: **/get-user-repos'** in your microservice
- this url: **/git-user-get-user-repos** in the client and in the Main Server.

Since we want to get private repositories, you will need to log in with your token. An approach similar to [this one][stoct] worked for me.

**NOTE**: _I messed a bit with the permissions I set on the GitHub web site for my token before I could see private repositories. Perhaps it was unnecessary, but consider giving yourself the right to do anything by delete a repository at least until you get it to work one time. Recall that this is found in the Settings (developer) for your GitHub account._

## Client Get Repos

Create a new page for the client called **src/components/GetRepos.js**. This page must use the resources from material-ui called **withStyles**, **Paper**. **Typography** and **Button**.

On the client side you should allow the user to iterate through a minimum of three public and three private repositories while displaying at least these five fields from the data returned from GitHub:

- name
- full_name
- html_url
- owner.login
- owner.url

<!-- ![Get Repos Page][grp] -->

<img class="sizer" src="https://s3.amazonaws.com/bucket01.elvenware.com/images/git-explorer-2019-get-repos.png" alt="get repos" />

## Styles

Here are the styles I want you to use. Save it as **client/src/components/elf-styles.js**:

```javascript
import Image from '../images/grass.png';

export const styles = theme => ({
    root: {
        flexGrow: 1
    },
    rooter: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    backDiv: {
        //backgroundRepeat: 'no-repeat',
        height: '100%',
    },
    backDiv2: {
        //backgroundRepeat: 'no-repeat',
        height: '1000px',
        backgroundImage: `url(${Image})`,
        backgroundRepeat: 'repeat'
    },
    backDiv3: {
        backgroundColor: '#ddf3ff'
    },
    paperLion: {
        flexGrow: 1,
        padding: theme.spacing.unit,
        textAlign: 'center',
        color: theme.palette.primary.dark
    },
    paperLion2: {
        height: '56%',
        width: '100%',
        maxWidth: '500px',
        padding: '1%',

        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.grey
    },
    paper: {
        padding: theme.spacing.unit * 5,
        textAlign: 'center',
        color: theme.palette.primary.dark
    },
    paperHome: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    elfTypography: {
        fontSize: theme.spacing.unit * 2
    },
    containerDiv: {
        flexGrow: 1
    },
});
```

## Project Sanity Tests

I may change this, but for now, install jest globally

    npm -g i jest

Also, in the root of your project, make sure you have done this:

      npm i @babel/plugin-proposal-class-properties @babel/preset-react @babel/preset-env @babel/core

Create a directory called **project-sanity-tests** in the root of your project. Navigate into and run **get-tests**. Choose **Isit322 Midterm Project Sanity Tests**. Ensure all the tests pass by the time you turn in the midterm.

Add this line to the scripts section of the **package.json** file in the root of the project: **"test": "echo 'The project tests are not here. Navigate into project-sanity-tests and run npm test'"**.

| File Name | Purpose     |
| :------------- | :------------- |
| Sanity.Infrastructure.js  | Check that **client** and **server** are in the right place with some of the right files. Check for other key files.  |
| Sanity.MicroStructure.js  | Check that the Micros are in the right place with some of the right files  |

## Client Tests

In the **client/src** directory create a folder called **sanity-tests**. Navigate into it and run **get-tests**. Choose **Isit322 Midterm Client Tests**. Ensure all the tests pass by the time you turn in the midterm.

Make it easy to run the client sanity tests by adding this to **client/package.json**: **"sanity-tests": "react-scripts test sanity-tests/Sanity*"**.

| File Name                          | Purpose                                                                               |
|:-----------------------------------|:--------------------------------------------------------------------------------------|
| Sanity.App.test.js                 | Does App component contain expected features                                          |
| Sanity.ClientFileStructure.test.js | Check if key files exist                                                              |
| Sanity.GetGist.FieldChecks.test.js | Does GetGist have MUI components for displaying key fields retrieved from server.     |
| Sanity.GetGist.test.js             | Checks for presence and location certain DIVs, Grids                                  |
| Sanity.GetRepos.test.js            | Checks for presence and location certain DIVs, Grids                                  |
| Sanity.Layout.test.js              | Under development                                                                     |
| Sanity.User.FieldChecks.test.js    | Does **GetUser** have MUI components for displaying key fields retrieved from server. |

You can **xdescribe** a test to skip it. You can use **p** at runtime to filter which tests are run.

## Your Tests and Utilities {#your-tests}

I'm expecting to see:

- Tests in **client**, **server** and each of the micros. Some of them can be very minimal, but typing **npm test** should run at least one local Jest test everywhere but in the root of the project. For instance, typing **npm test** in **micros/qux** should run a test that is defined inside of **Qux**.
- At least 12 tests that you wrote
  - At least three should test the methods you call from the second **then** function in a call to **fetch**. See the [JestExpressAddressSimple][jeas] assignment.  
  - At least three should detect that a heading (defined with Typography) exists in a React component such as **GetGist**, **GetUser** or **GetRepos**. Just check for the **Typograph** element and its heading text, don't worry about the attributes (**containsMatchingElement**). See the testing section of the [JestCreateReactApp][jcra] assignment.
  - At lest two should detect that a button was clicked using mocks (**jest.fn()**). Just detect the click you don't need to see results. See the [React Props assignment][rpjfn].
- **prettier** run recently enough that my running it will not change any files.
- **eslint** return without errors from inside root, client, server, and micros.

Running **npm test** in my client directory:

```nohighlighting
PASS  src/tests/TestRoutes.test.js
PASS  src/tests/Qux.test.js
PASS  src/tests/GetUser.test.js
PASS  src/tests/GetGist.test.js
PASS  src/tests/App.test.js
PASS  src/tests/ElfHeader.test.js
PASS  src/sanity-tests/Sanity.GetGist.test.js
PASS  src/sanity-tests/Sanity.App.test.js

Test Suites: 8 passed, 8 total
Tests:       33 passed, 33 total
Snapshots:   0 total
Time:        2.161s
Ran all test suites.

Watch Usage: Press w to show more.
```

## Menu

The user should be able to select the following options from the Menu:

- Get Gists
- Get User Info
- Get User Repos
- Qux
- Test Routes

## Turn it in

Merge your work into master and tag it "Finished Midterm".

Don't forget to run all the tests, **prettier**, and **eslint** last thing before you push.

<!--       -->
<!-- links -->
<!--       -->

[grp]: https://s3.amazonaws.com/bucket01.elvenware.com/images/git-explorer-2019-get-repos.png
[octk]: https://github.com/octokit/rest.js
[orl]: https://octokit.github.io/rest.js/#octokit-routes-repos
[stoct]: https://stackoverflow.com/a/52254321/253576
[jeas]: https://www.elvenware.com/teach/assignments/react/JestExpressAddressSimple.html#define-getnine  
[rpjfn]: https://www.elvenware.com/teach/assignments/react/ReactProps.html#simple-component-test
[jcra]: https://www.elvenware.com/teach/assignments/react/JestCreateReactApp.html#testing
