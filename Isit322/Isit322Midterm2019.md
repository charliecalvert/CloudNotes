## Overview

The goal will be to add one page to our app (usually called week03-rest-basics) that allows the user to view private, public or all repositories from the developers account.

Put your work in a branch called Midterm. As you begin tag it "Starting Midterm".

## API Links

The call to GitHub should be in **micros/get-user/routes/index.js**. It should use:

- the [Octokit rest][octk] library to make the call, not **github-api**.
  - You can use both libraries in one file, so you don't need to undo previous work.
- the [octokit.repos.list][orl] API call to make the call to GitHub.
- this url: **/get-user-repos'** in your microservice
- this url: **/git-user-get-user-repos** in the client and in the Main Server.

Since we want to get private repositories, you will need to log in with your token. An approach similar to [this one][stoct] worked for me.

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

Create a directory called **project-sanity-tests** in the root of your project. Navigate into and run **get-tests**. Choose **Isit322 Midterm Project Sanity Tests**.

Ensure all the tests pass by the time you turn in the midterm.

**NOTE**: _At some point over the next few days, I'm likely to update the tests. I won't update them later than 24 hours before the due date._



## Turn it in

Merge your work into master and tag it "Finished Midterm".

<!--       -->
<!-- links -->
<!--       -->

[grp]: https://s3.amazonaws.com/bucket01.elvenware.com/images/git-explorer-2019-get-repos.png
[octk]: https://github.com/octokit/rest.js
[orl]: https://octokit.github.io/rest.js/#octokit-routes-repos
[stoct]: https://stackoverflow.com/a/52254321/253576
