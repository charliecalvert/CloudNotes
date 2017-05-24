# Gist Lister Refine

This assignment is about the GistLister component that displays. This component is designed to display the results of a call to the Git Hub Api called **listGists**.

- [GitHub Js](https://github.com/github-tools/github)
- [GitHub Js Home Docs Home Page](http://github-tools.github.io/github/)
- [GitHub Js listGists Doc](http://github-tools.github.io/github/docs/3.1.0/User.html#listGists)
- [GitHub list a users fists Doc](https://developer.github.com/v3/gists/#list-a-users-gists)

## Normalize Names

When we use **map** to create the array that we want to send back to our app we should normalize the names. Before, we were sending back properties with names like **html_url**. This does not follow the proper JavaScript naming conventions for properties. We should call it **htmlUrl** rather than **html_url**. (This is also an argument for **htmlURL**, but that is not my convention.) Here is the way our code ought to look with the key (property name) in the left and the value from our API call on the right:

```javascript
'htmlUrl': item.html_url,
```

Go into **routes/gitapi/gists.js** and make the appropriate changes for any applicable property. For instance, another property name that needs to be changed is **git_pull_url**. This will probably break code in both our tests and in program.

## Retrieve Additional Properties

While you have **gists.js** open, why don't add two new properties from the owner object that we get back from GitHub. I was thinking that the **login** name and **avatar_url** might be useful:

```javascript
"owner": {
     "login": "octocat",
     "id": 1,
     "avatar_url": "https://github.com/images/error/octocat_happy.gif",
     ...
 }
```

I'll leave it up to you to determine how to retrieve these properties.

## Set State

Our rule is that we only set state in DataMaven. However, it is arguable okay to set state in display component such as GistLister if we

- [Read the Official State Docs][state-docs]

[state-docs]: https://facebook.github.io/react/docs/react-component.html#setstate

We need to track the index of the list of gists so that we can iterate through them with prev and next buttons.

## Button Disabled

Consider this button:

```html
<button
  id='gistLister'
  onClick={this.props.fetchGistList}
  disabled={this.props.gistCanIterate}>Get Gists
</button>
```

It is enabled or disabled depending on one of the **props** that is passed to it. Suppose you have three buttons:

- Get Gists
- Next Gist
- Prev Gist

Until the we first retrieve the gists, **Get Gists** should be enabled and the other two disabled. After we retrieve the gists, the situation is reversed. This means that **fetchGistList** has to set the value of **gistCanIterate** after it loads gist, and the buttons have to respond accordingly. In other words, some buttons are enabled if **gistCanIterate** is **true**, and others are disabled in that case.

## Conditional Rendering

We can decide to render poritions of a component only after certain conditions are met. For instance, we might not want to render the list of gists until the list is larger than zero, or larger than one or until gistCanIterate is true. The following syntax can help us in such cases:

```javascript
{this.props.gistLister.length > 1 &&
    <ul>
        <li className='gistLister'>Current Index: {this.state.index + 1}
            / {this.props.gistLister.length}</li>
        <li className='gistLister'>{this.props.gistLister[this.state.index].description}</li>
        <li className='gistLister'><a href={gl[this.state.index].htmlUrl}
                                      target='_blank'> {gl[0].htmlUrl}</a></li>
        <li className='gistLister'>{this.props.gistLister[this.state.index].gitPullUrl}</li>
        <li className='gistLister'>{this.props.gistLister[this.state.index].id}</li>
        <li className='gistLister'>{this.props.gistLister[this.state.index].login}</li>
    </ul>
}
```

The code shown here will render only if the length of **gistLister** is larger than one.

Read the official docs on [Conditional Rendering](https://facebook.github.io/react/docs/conditional-rendering.html)

## List Styles {#list-styles}

Our current menu is being changed. Nevertheless, there is an issue related to it that we need to attend to.

Most of you have styled your menu items. Be sure that you limit these styles so that they do not touch all the UL and LI items in your program:

```css
ul.menu {
    background-color: #8a6d3b;
    list-style-type: none;
    margin: 0;
    overflow: hidden;
    padding: 0;
}

li.menu {
    float: left;
}

li.menu a {
    color: white;
    display: block;
    padding: 5px 15px;
    text-align: center;
    text-decoration: none;
}

li.menu  a:hover {
    background-color: #985f0d;
}
```

And then in **ElfHeader**:

```javascript
<ul className='menu'>
    <li className='menu'><Link to='/'>Home</Link></li>
    // ETC....
</ul>
```

## Turn it in

Add, commit, push, branch, tag. Use the words **react-bootstrap** in your messages.

I will grade this assignment in tandem with [ReactBootstrap][elf-rb]. You should create a single commit that has the solution to both assignments. You can turn the assignments in one at a time, but when you have completed both assignments, add a note saying that you are done.

[elf-rb]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactBootstrap.html
