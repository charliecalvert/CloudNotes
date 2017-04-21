## Overview

Clean up the Address Program

## Rename

Change the name of the folder in which the program is stored. Perhaps something like:

  git mv week02-rest-basics/ GitExplorer

## Create CSS and Image Directories

Inside the **src** directory create directories called **css** and **images**. Move your CSS and SVG files into these directories. Check your tests and run your program and make sure you are not getting errors or warnings.

- Start your program: npm start
- In Chrome, open the Developer Tools: F12 or CTRL-SHIFT-I or **Settings | More Tools | Dev Tools**
- Check for warnings or errors

![Uh-oh! A warning][dtw]

**IMAGE**: _Uh-oh! To fix this, I would follow the hints in the warning to my **src/index.js** file._

![Same warning from command line][warncmd]

**IMAGE**: _The same warning as seen from the command line. Sometimes you might see problems at the command line that you don't see in the developer tools and vice versa. As you result, you should check both places._

When you turn in your code, you should always strive to ensure that your program is completely free of warnings and errors.

[dtw]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-refine-warn.png

[warncmd]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-refine-cmdw.png

## Add Display for Api User

By this time you should have refactored your code so that there is nothing about headers, SmallNumbers, or retrieving information from **/api/foo** in **App.js**. We want to re-purpose **App.js** so that it can be used to handler our request for **/api/users**.

The first step would be to rename **components/App.js** to **components/GetUserInfo.js**. That might look something like this on your system, where you may need to change or skip the first line:

```bash
$ cd GitExplorer/client/src/
$ git mv components/App.js components/GetUserInfo.js
```

Open up the source for **GetUserInfo.js**, and rename the component class from **App** to **GetUserInfo**. This will take two changes:

```javascript
// CODE OMITTED HERE
class GetUserInfo extends Component {
// CODE OMITTED HERE  
}

export default GetUserInfo;
```

Create a **getUser method** that looks a little like this:

```javascript
getUser = () => {

    const that = this;
    fetch('/api/user')
        .then(function (response) {
            // YOU WRITE IT
        }).then(function (json) {
            // DISPLAY WITH LOGGER AS NEEDED
            // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
            var body = JSON.parse(json.body);
            that.setState({userLogin: body.login});
        }).catch(function (ex) {
            // DISPLAY WITH LOGGER
        });
};
```

Add a paragraph and button in the render method to display your input.

Make any necessary changes in App.js.

![View the login name][vln]

[vln]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-props-refine-get-user.png

## Turn it in

Commit, push. When you turn in the assignment, designate the directory in your repo where you did your work.
