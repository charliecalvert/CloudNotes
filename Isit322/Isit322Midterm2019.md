## Overview

The goal will be to add one page to our app (usually called week03-rest-basics) that allows the user to view private, public or all repositories from the developers account.

Put your work in a branch called Midterm. As you begin tag it "Starting Midterm".

For now I think all our components, except **Test Routes**, and **ShowResultServer** should be React Class Components. **Test Routes** and **ShowResultServer** should be function components. React Function Components (nee Stateless Components) and hooks are great, but they are tested differently that class components and I don't want to make the change right now. **GetUser**, **GetRepos** and **GetGists** should all use **ShowResultServer** to show the results from pressing **You Rang**.

**NOTE**: _You may not change any code in the Sanity tests. If you think I have something wrong, please let me know and I will update the tests if necessary and you can reinstall them._

**NOTE**: _At some point over the next few days, I'm likely to update the sanity tests or other parts of this midterm. I assume that you would like to get started as soon as possible, so I've pushed this out now._

## Screenshots

Something like this, but you are free to design it as you wish:

![React Git User Fields](https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-get-user.png)

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

## Project Sanity Tests

Create a directory called **project-sanity-tests** in the root of your project. Navigate into and run **get-tests**. Choose **Isit322 Midterm Project Sanity Tests**. Ensure all the tests pass by the time you turn in the midterm.

Add this line to the scripts section of the **package.json** file in the root of the project: **"test": "echo 'The project tests are not here. Navigate into project-sanity-tests and run npm test'"**.

## Client Tests

In the **client/src** directory create a folder called **sanity-tests**. Navigate into it and run **get-tests**. Choose **Isit322 Midterm Client Tests**. Ensure all the tests pass by the time you turn in the midterm.

Make it easy to run the client sanity tests by adding this to **client/package.json**: **"sanity-tests": "react-scripts test sanity-tests/Sanity*"**.

## Your Tests and Utilities {#your-tests}

I'm expecting to see:

- Tests in **client**, **server** and each of the micros. Some of them can be very minimal, but typing **npm test** should run at least one local Jest test everywhere but in the root of the project. For instance, typing **npm test** in **micros/qux** should run a test that is defined inside of **Qux**.
- At least 12 tests that you wrote
  - At least three should test the methods you call from the second **then** function in a call to **fetch**  
  - At least three should detect that a heading (defined with Typography) exists in a React component such as **GetGist**, **GetUser** or **GetRepos**. Just check for the **Typograph** element and its heading text, don't worry about the attributes (**containsMatchingElement**).
  - At lest two should detect that a button was clicked using mocks (**jest.fn()**). Just detect the click you don't need to see results.
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
