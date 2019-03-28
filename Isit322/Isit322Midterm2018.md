## Overview

There are two parts to the Midterm. Your work should be done in a branch called Midterm.

## Part One

- Copy your version of the **React Props Material-UI** assignment to a folder called **GitHubExplorer** if you have not done so already.
- Polish it. No errors, no warnings, all tests pass.
- Make sure it gets User information from your Git Home page.
- Add a page that gets a list of your Gists.
- Put at least two buttons on the page. Label them **next** and **previous** or the equivalent. When the user clicks the **next** button, show the next Gist, when they click the **previous** button, show the previous record. Check for the beginning and end of the array and don't go beyond it.
- Run the **GitHubExplorer** on EC2 on Port 30031.

![Files in the IDE][fide]

## Part Two

- Polish your version of **ReactPropsNative**.
- Rename it to **GitHubNative** if you have not done so already.
- Add your GitHub Gists page to it
- Put forward and backward buttons as in Part One.
- Get all the data for **GitHubNative** from services running on EC2.

## Turn it in

When you turn in the Midterm, say specifically which server or servers I should run when I run your client. Say specifically which server you client depends on. Reference the server by Folder name.

Make sure all your tests pass and that ESLint comes back clean. I will not grade any assignments that do not include **node_modules** in your **.gitignore** or that have a **node_modules** directory in your midterm directories.

This is a bare minimum in terms of tests.

![Midterm Tests 6 suites 18 tests][mtt]

Designate, branch, folder and tag:

- Branch: Midterm
- Folder: GitHubNative
- Folder: GitHubExplorer
- Tag: v7.X.X

For instance:

```
git tag -a v7.0.2 -m "Midterm on Midterm branch in GitHubNative & GitHubExplorer."
```

Check it to make sure it looks right:

```
git tag -n
```

And push it:

```
git push origin v7.0.2
```

## Testing React Native

Details are [here][trn].

## Button Events

If you need to know which button was clicked in a button event handler, try this:

```JavaScript
<RaisedButton
    style={buttonStyle}
    id="prevGist"
    onClick={(e) => this.gistIterator('prevGist', e)}
    disabled={!this.props.gistCanIterate}
    secondary={true}
>
```

Note the onClick event and how we pass the parameter 'prevGist' to it.

Now in the handler:

```JavaScript
gistIterator(id) {
    console.log(id);
    ETC...
}
```

**id** will be set to 'prevGist'.

The reference is here, at the bottom of the page:

- <https://reactjs.org/docs/handling-events.html>

[trn]: /javascript-guide/JavaScriptReactNative.html

[fide]: https://s3.amazonaws.com/bucket01.elvenware.com/images/isit322-midterm-2018-files.png

[mtt]: https://s3.amazonaws.com/bucket01.elvenware.com/images/isit322-midterm-2018-min-test.png
