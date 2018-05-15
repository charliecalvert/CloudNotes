## Overview

Our goal is to recreate our best current version of **GitExplorer** in React Native. By now you might be calling it **GitMenu** or **GitMaterial**. Whatever our best React Web App code might be, we want to recreate it in React Native.

## Get Started

Create an empty React Native project called **GitNative**:

```bash
create-react-native-app GitNative
```

## Recreate GitExplorer

Begin by copying over the core files from your best version of **GitExplorer**:

```
cp ../GitExplorer/client/src/components/GitUser.js .
cp ../GitExplorer/client/src/components/GitUser.ui.js .
cp ../GitExplorer/client/src/components/Micros.js .
cp ../GitExplorer/client/src/components/ElfHeader.js .
cp ../GitExplorer/client/src/components/elf-styles.js .
cp ../GitExplorer/client/src/GitHub-list.js .
```

If your file names or architecture differs in small ways from mine, just make the appropriate changes to the above. Hopefully no one has drifted too far afield, as we want to stay more or less on the same page.

## StyleSheet

Over time we can develop a good styleSheet for our program. Start by deleting the existing content in **elf-styles** and replacing it with this:

```
import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        marginTop: 25,
        padding: 10,
    },
    gitContainer: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        fontSize: 20,
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    subNavItem: {
        padding: 5,
    },
    topic: {
        textAlign: 'center',
        fontSize: 15,
    },
    buttonView: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#68a0cf',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        width: "75%"
    }
});

```

## Start Porting Our Code

It is time to start porting our code from React to React Native. Some things are easy. For instance, a **DIV** usually becomes a **VIEW**, and a **P** element usually becomes a **TEXT** element. I'll leave details like that up to you and instead focus on possible sources of confusion.

Open up **App.js** and try to link in **Micros.js**:

```javascript
import Micros from './Micros';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.getContainer}>
          <Micros />
      </View>
    );
  }
}
```

Don't do anything else at this time, instead, just run your project (npm start). You will likely get errors about the code in **Micros.js**. The problem, of course, is that the the code in a React Web Application is not entirely compatible with the code in a React Native. Our goal is to fix those errors.

You might, for instance, get an error like this:

```bash
Unable to resolve ../App.css from ./Micros.js
```

This one is fairly simple to fix because we know that CSS stylesheets do not have a role in a React Native application. So you should delete this reference to **App.css** from **Micros.js**.

## Buttons

The next error you hit might look like this:

```javascript
Unable to resolve material-ui/RaisedButton from ./Micros.js
```

There are no **RaisedButtons** in standard React Native, so remove the **import** for it and for **AndroidIcon**. Replace them with these basics of the React Native interface:

```javascript
import  { Text, View, Button } from 'react-native';
```

Recall that a button declaration in React Native looks a bit like this:

```javascript
<View style={styles.buttonView}>
    <Button
        onPress={this.getFile}
        title="Get Data"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
    />
</View>
```

Note that I have wrapped the button in a style.

At this point, your program should look a bit like this on an emulator:

![Native GitHub and Git File][nagf]


## Link in GitUser Component


Now that we have created the **GitUser** component, all you need to do is link it in. I suggest that you leave GitUser.ui out of the mix for now, as it is the most time consuming component to fix up.

```javascript
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';


export default class GitHub extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Expo Calvert!
                </Text>

                {/* Eventually we will link in GitHubShow here, but not yet. */}
                {/* For now, just comment it out, using the syntax I have used here. */}
            </View>
        );
    }
}

```

Don't forget to comment out the import for **GitHubShow** from **GitHub**. For now, we don't want GitHubShow in the mix at all.

An explanation of how to create comments in JSX is found [here][cjsx].

## React Router Menu

Let's start by linking in the version of React Router that works with React Native:

```
npm install --save react-router-native
```

Let's start with the changes we need to make to **ElfHeader**. The code is much the same as in our GitHub Material assignment, but there are differences. Rather than try to detail them, I'll just ask you to set its content to the following:

```javascript
import React, {Component} from 'react';
import {Link} from 'react-router-native';
import {Text, View} from 'react-native';
import styles from "./elf-styles";

class ElfHeader extends Component {

    render() {
        return (
            <View style={styles.nav}>
                <Link
                    to="/"
                    underlayColor='#f0f4f7'
                    style={styles.navItem}>
                    <Text>GitHub</Text>
                </Link>
                // You create a /get-file link here.
                // Hint: Just **to** and the **Text** change.
            </View>
        );
    }
}

export default ElfHeader;
```

Go back and look at the code for the **ElfHeader** in the GitHubMenu program:


```javascript
import { Link } from 'react-router-dom';
<div>
  <div className="App">
      <ul>
          <li><Link to="/">GitHub</Link></li>
          <li><Link to="/get-file">Get File</Link></li>          
      </ul>
  </div>                
</div>
```

The code in React Native follows the same pattern, but instead of **LI** elements, we use **Link** elements.

## Routes in App.js

In **App.js** import these items from React Router Menu.

```javascript
import { NativeRouter, Route } from 'react-router-native';
```

Now look at the **App.js** file from GitHub Material. Much remains essentially the same, but instead of a **BrowserRouter**, we use a **NativeRouter** and instead of a **DIV**, we use a **View**.

At this stage we have a primitive menu at the top. When we click on GitHub, we see the **GitHub** component, when we click on **GetFile** we see this:

![Native GitHub with menu and view of Get File][nasm]

## Clean Up GitHubShow

Now you need to go through GitHubShow, converting **DIV** elements to **View** elements, and **P** elements to **Text** elements. There are other changes to make, but I will leave all that up to you.

## Turn it in

Commit and push your work. Test it again after pushing to make sure what you committed actually works. (We are having a rash of incidents where bits of stray code are inserted into a file, breaking an otherwise clean assignment.)

When you are done, tag it with something like this:

```
git tag -a v7.0.0 -m "GitHub Native assignment complete"
```

If you are using branches, specify which you used.

[cjsx]: https://wesbos.com/react-jsx-comments/

[nasm]: https://s3.amazonaws.com/bucket01.elvenware.com/images/native-address-simple-menu.png

[nagf]: https://s3.amazonaws.com/bucket01.elvenware.com/images/git-native-micros.png
